import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import net from "node:net";

const DEFAULT_URL =
  "http://127.0.0.1:5173/workbench/media/infinite-canvas?tab=preview&renderer=infinite-canvas&tileCount=24&scale=1";
const DEFAULT_OUTPUT = "artifacts/effect-screenshots/infinite-canvas.png";
const DEFAULT_CLIP_SELECTOR = ".notion-rb-infinite-canvas-stage";

const KNOWN_CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function parseArgs(argv) {
  const options = {
    url: DEFAULT_URL,
    output: DEFAULT_OUTPUT,
    width: 1600,
    height: 1000,
    wait: 3000,
    selector: DEFAULT_CLIP_SELECTOR,
    clip: DEFAULT_CLIP_SELECTOR,
    deviceScaleFactor: 1,
  };
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--url" && next) {
      options.url = next;
      index += 1;
    } else if (arg === "--category" && next) {
      options.category = next;
      index += 1;
    } else if (arg === "--slug" && next) {
      options.slug = next;
      index += 1;
    } else if (arg === "--output" && next) {
      options.output = next;
      index += 1;
    } else if (arg === "--width" && next) {
      options.width = Number(next);
      index += 1;
    } else if (arg === "--height" && next) {
      options.height = Number(next);
      index += 1;
    } else if (arg === "--wait" && next) {
      options.wait = Number(next);
      index += 1;
    } else if (arg === "--selector" && next) {
      options.selector = next;
      index += 1;
    } else if (arg === "--clip" && next) {
      options.clip = next === "none" ? "" : next;
      index += 1;
    } else if (arg === "--device-scale-factor" && next) {
      options.deviceScaleFactor = Number(next);
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (!arg.startsWith("--")) {
      positionals.push(arg);
    }
  }

  if (positionals[0]) {
    options.output = positionals[0];
  }

  if (positionals[1] && Number.isFinite(Number(positionals[1]))) {
    options.wait = Number(positionals[1]);
  }

  if (options.category && options.slug) {
    options.url = `http://127.0.0.1:5173/workbench/${options.category}/${options.slug}?tab=preview&renderer=${options.slug}`;
    options.output = `artifacts/effect-screenshots/${options.slug}.png`;
    options.selector = ".notion-rb-media-stage, .notion-rb-preview";
    options.clip = ".notion-rb-media-stage";
  }

  return options;
}

function printHelp() {
  console.log(`Usage:
  npm run screenshot:effect -- [options]

Options:
  --url <url>                    Page URL to capture.
  --category <category>          Build a workbench URL with --slug.
  --slug <slug>                  Build a workbench URL with --category.
  --output <path>                PNG output path. Default: ${DEFAULT_OUTPUT}
  --width <px>                   Browser viewport width. Default: 1600
  --height <px>                  Browser viewport height. Default: 1000
  --wait <ms>                    Extra render wait after page load. Default: 3000
  --selector <css>               Selector that must exist before capture.
  --clip <css|none>              Capture this element instead of the full viewport.
  --device-scale-factor <n>      Device scale factor. Default: 1

Default target:
  ${DEFAULT_URL}
`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForProcessExit(childProcess, timeoutMs = 3000) {
  if (childProcess.exitCode !== null || childProcess.signalCode !== null) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      childProcess.off("exit", handleExit);
      resolve(false);
    }, timeoutMs);

    function handleExit() {
      clearTimeout(timeout);
      resolve(true);
    }

    childProcess.once("exit", handleExit);
  });
}

async function removeDirectoryWithRetry(directoryPath) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      await rm(directoryPath, { recursive: true, force: true });
      return;
    } catch (error) {
      if (!["EBUSY", "ENOTEMPTY", "EPERM"].includes(error.code)) {
        throw error;
      }
      await delay(250 + attempt * 150);
    }
  }

  await rm(directoryPath, { recursive: true, force: true });
}

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

async function waitForJson(url, timeoutMs = 12000) {
  const started = Date.now();
  let lastError;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await delay(150);
  }

  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? "no response"}`);
}

async function assertPageReachable(url) {
  try {
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      return;
    }
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    throw new Error(
      `Cannot reach ${url}. Start the dev server first, for example: npm run dev -- --host 127.0.0.1. ${error.message}`,
    );
  }
}

function findChromeExecutable() {
  const chromePath = KNOWN_CHROME_PATHS.find((candidate) => candidate && existsSync(candidate));
  if (!chromePath) {
    throw new Error(
      "Chrome or Edge executable was not found. Set CHROME_PATH to the browser executable and rerun the command.",
    );
  }
  return chromePath;
}

class CdpClient {
  constructor(webSocketUrl) {
    this.webSocketUrl = webSocketUrl;
    this.nextId = 1;
    this.pending = new Map();
    this.eventWaiters = [];
  }

  async connect() {
    this.ws = new WebSocket(this.webSocketUrl);
    this.ws.addEventListener("message", (event) => this.handleMessage(event.data));
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
  }

  handleMessage(rawData) {
    const message = JSON.parse(String(rawData));

    if (message.id && this.pending.has(message.id)) {
      const pending = this.pending.get(message.id);
      this.pending.delete(message.id);

      if (message.error) {
        pending.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }

    if (message.method) {
      const waiterIndex = this.eventWaiters.findIndex(
        (waiter) =>
          waiter.method === message.method &&
          (!waiter.sessionId || waiter.sessionId === message.sessionId),
      );

      if (waiterIndex >= 0) {
        const [waiter] = this.eventWaiters.splice(waiterIndex, 1);
        clearTimeout(waiter.timeout);
        waiter.resolve(message.params ?? {});
      }
    }
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId;
    this.nextId += 1;

    const payload = { id, method, params };
    if (sessionId) {
      payload.sessionId = sessionId;
    }

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  waitForEvent(method, sessionId, timeoutMs = 12000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const index = this.eventWaiters.findIndex(
          (waiter) => waiter.method === method && waiter.sessionId === sessionId,
        );
        if (index >= 0) {
          this.eventWaiters.splice(index, 1);
        }
        reject(new Error(`Timed out waiting for CDP event ${method}`));
      }, timeoutMs);

      this.eventWaiters.push({ method, sessionId, resolve, timeout });
    });
  }

  close() {
    this.ws?.close();
  }
}

async function waitForSelector(client, sessionId, selector, timeoutMs = 12000) {
  if (!selector) {
    return;
  }

  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const result = await client.send(
      "Runtime.evaluate",
      {
        expression: `Boolean(document.querySelector(${JSON.stringify(selector)}))`,
        returnByValue: true,
      },
      sessionId,
    );

    if (result.result?.value === true) {
      return;
    }
    await delay(150);
  }

  throw new Error(`Timed out waiting for selector: ${selector}`);
}

async function waitForFonts(client, sessionId) {
  await client.send(
    "Runtime.evaluate",
    {
      expression: "document.fonts ? document.fonts.ready.then(() => true) : true",
      awaitPromise: true,
      returnByValue: true,
    },
    sessionId,
  );
}

async function getClip(client, sessionId, selector) {
  if (!selector) {
    return undefined;
  }

  const result = await client.send(
    "Runtime.evaluate",
    {
      expression: `(() => {
        const element = document.querySelector(${JSON.stringify(selector)});
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: Math.max(0, rect.x),
          y: Math.max(0, rect.y),
          width: Math.max(1, Math.min(rect.width, window.innerWidth - Math.max(0, rect.x))),
          height: Math.max(1, Math.min(rect.height, window.innerHeight - Math.max(0, rect.y))),
          scale: 1
        };
      })()`,
      returnByValue: true,
    },
    sessionId,
  );

  const clip = result.result?.value;
  if (!clip) {
    throw new Error(`Cannot capture clip selector because it was not found: ${selector}`);
  }
  return clip;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  if (!Number.isFinite(options.width) || !Number.isFinite(options.height)) {
    throw new Error("Width and height must be numbers.");
  }

  await assertPageReachable(options.url);

  const chromePath = findChromeExecutable();
  const remotePort = await getFreePort();
  const userDataDir = path.join(tmpdir(), `design-atlas-cdp-${Date.now()}`);
  const outputPath = path.resolve(options.output);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--remote-allow-origins=*",
      `--remote-debugging-port=${remotePort}`,
      `--user-data-dir=${userDataDir}`,
      `--window-size=${options.width},${options.height}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  let stderr = "";
  chrome.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  let client;
  try {
    const version = await waitForJson(`http://127.0.0.1:${remotePort}/json/version`);
    client = new CdpClient(version.webSocketDebuggerUrl);
    await client.connect();

    const target = await client.send("Target.createTarget", {
      url: "about:blank",
    });
    const attached = await client.send("Target.attachToTarget", {
      targetId: target.targetId,
      flatten: true,
    });
    const sessionId = attached.sessionId;

    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);
    await client.send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: options.width,
        height: options.height,
        deviceScaleFactor: options.deviceScaleFactor,
        mobile: false,
      },
      sessionId,
    );

    const loadPromise = client.waitForEvent("Page.loadEventFired", sessionId);
    await client.send("Page.navigate", { url: options.url }, sessionId);
    await loadPromise;
    await waitForSelector(client, sessionId, options.selector);
    await waitForFonts(client, sessionId);
    await delay(options.wait);

    const clip = await getClip(client, sessionId, options.clip);
    const screenshot = await client.send(
      "Page.captureScreenshot",
      {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false,
        ...(clip ? { clip } : {}),
      },
      sessionId,
    );

    await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));

    console.log(`Captured ${options.url}`);
    console.log(`Viewport ${options.width}x${options.height}, wait ${options.wait}ms`);
    console.log(`Output ${outputPath}`);
  } finally {
    if (client) {
      try {
        await client.send("Browser.close");
      } catch {
        client.close();
      }
    }

    const exited = await waitForProcessExit(chrome);
    if (!exited) {
      chrome.kill();
      await waitForProcessExit(chrome, 1500);
    }

    await removeDirectoryWithRetry(userDataDir);
  }

  if (chrome.exitCode && chrome.exitCode !== 0 && stderr) {
    console.warn(stderr.trim());
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
