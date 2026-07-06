import type { ComponentType } from "react";

export type EffectCategory =
  | "backgrounds"
  | "text"
  | "navigation"
  | "media"
  | "components"
  | "layouts"
  | "interactions"
  | "tools";

export type EffectStatus = "reference" | "implemented" | "draft";

export type ControlType = "range" | "number" | "color" | "boolean" | "select" | "text";
export type ControlLevel = "primary" | "advanced" | "hidden";
export type WorkbenchTab = "preview" | "code";
export type EffectCodeLanguage = "tsx" | "css";
export type ReusableCodeType = "react" | "css" | "svg" | "canvas" | "motion";

export type ControlValue = string | number | boolean;

export interface EffectControl {
  key: string;
  label: string;
  type: ControlType;
  defaultValue: ControlValue;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{
    label: string;
    value: ControlValue;
  }>;
  description?: string;
  unit?: string;
  level?: ControlLevel;
}

export type EffectProps = Record<string, ControlValue>;

export interface EffectDependency {
  name: string;
  packageName?: string;
  url?: string;
}

export interface EffectPropDoc {
  property: string;
  type: string;
  defaultValue: ControlValue;
  description: string;
}

export interface EffectCodeFile {
  filename: string;
  language: EffectCodeLanguage;
  code: string;
}

export interface DesignEffect {
  id?: string;
  slug: string;
  title: string;
  type: string;
  componentName?: string;
  category: EffectCategory;
  status: EffectStatus;
  description: string;
  tags: string[];
  useCases: string[];
  sourceUrl?: string;
  githubUrl?: string;
  author?: string;
  licenseNote?: string;
  screenshot?: string;
  note?: string;
  visualStyle?: string;
  motionLogic?: string;
  caveats?: string[];
  reusable?: {
    componentName?: string;
    componentPath?: string;
    demoPath?: string;
    codeType?: ReusableCodeType;
  };
  previewComponent?: ComponentType<EffectProps>;
  defaultProps?: EffectProps;
  controls?: EffectControl[];
  parameters?: EffectControl[];
  propsDocs?: EffectPropDoc[];
  dependencies?: Array<string | EffectDependency>;
  code?: string;
  codeFiles?: EffectCodeFile[];
  prompt: string;
  notes?: string;
  source?: string;
  getUsageSnippet?: (values: EffectProps) => string;
  createdAt?: string;
  updatedAt?: string;
}
