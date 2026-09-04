import type { LucideIcon } from "lucide-react";

export interface RadioOptionConfig {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

export interface SectionConfig {
  label: string;
  description?: string;
  icon?: LucideIcon;
}

export interface FormHeaderConfig {
  icon: LucideIcon;
  description: string;
}

export interface FieldConfig {
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options?: RadioOptionConfig[];
}
