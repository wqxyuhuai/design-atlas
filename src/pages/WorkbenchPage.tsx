import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { Shell } from "../components/layout/Shell";
import { CodeTab } from "../components/workbench/CodeTab";
import { PreviewTab } from "../components/workbench/PreviewTab";
import { WorkbenchPageHeader } from "../components/workbench/WorkbenchPageHeader";
import { normalizeEffectCategory } from "../registry/categories";
import { firstEffectByCategory, getEffect } from "../registry/getEffect";
import type { ControlValue, EffectProps, WorkbenchTab } from "../types/effect";
import { defaultValuesForEffect, paramsForValues, tabFromSearchParams, valuesFromSearchParams } from "../utils/controlValues";
import { generateIntegrationPrompt } from "../utils/integrationPrompt";

export function WorkbenchPage() {
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = normalizeEffectCategory(params.category);
  const activeEffect = category && params.category === category ? getEffect(category, params.effect) : undefined;
  const [demoContent, setDemoContent] = useState(false);

  useEffect(() => {
    if (activeEffect) {
      setDemoContent(activeEffect.category === "backgrounds");
    }
  }, [activeEffect]);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  if (params.category !== category) {
    const query = searchParams.toString();
    return <Navigate to={`/workbench/${category}/${params.effect ?? ""}${query ? `?${query}` : ""}`} replace />;
  }

  if (!activeEffect) {
    const fallbackEffect = firstEffectByCategory(category);
    return fallbackEffect ? (
      <Navigate to={`/workbench/${category}/${fallbackEffect.slug}`} replace />
    ) : (
      <Navigate to={`/?category=${category}`} replace />
    );
  }

  const effect = activeEffect;
  const values = valuesFromSearchParams(effect, searchParams);
  const activeTab = tabFromSearchParams(searchParams);
  const integrationPrompt = generateIntegrationPrompt(effect, values);
  const shareUrl =
    typeof window === "undefined"
      ? `${location.pathname}${location.search}`
      : new URL(`${location.pathname}${location.search}`, window.location.origin).toString();

  function commitState(nextValues: EffectProps, nextTab: WorkbenchTab = activeTab) {
    setSearchParams(paramsForValues(effect, nextValues, nextTab), { replace: true });
  }

  function handleControlChange(key: string, value: ControlValue) {
    commitState({ ...values, [key]: value });
  }

  function handleReset() {
    commitState(defaultValuesForEffect(effect));
  }

  function handleTabChange(nextTab: WorkbenchTab) {
    commitState(values, nextTab);
  }

  return (
    <Shell activeCategory={effect.category} activeEffectSlug={effect.slug} mode="workbench">
      <div className="mx-auto max-w-[1320px] p-5 md:p-8">
        <WorkbenchPageHeader
          effect={effect}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onReset={handleReset}
          integrationPrompt={integrationPrompt}
          shareUrl={shareUrl}
        />

        <div className="mt-3">
          {activeTab === "preview" ? (
            <PreviewTab
              effect={effect}
              values={values}
              onChange={handleControlChange}
              demoContent={demoContent}
              onDemoContentChange={setDemoContent}
            />
          ) : (
            <CodeTab effect={effect} values={values} integrationPrompt={integrationPrompt} />
          )}
        </div>
      </div>
    </Shell>
  );
}
