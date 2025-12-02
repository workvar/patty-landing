import { LucideIcon } from "lucide-react";

export interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colSpan?: number;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
}

export interface UseCaseProps {
  role: string;
  benefit: string;
}