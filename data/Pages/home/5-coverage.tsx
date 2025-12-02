import { User, Users, Video, GraduationCap } from "lucide-react";
import {ContentAndFreelance, Teams, PersonalLife, LearningAndSkillDevelopment} from "@/components/pages/home/coverage";

export type CoverageCardKey = 'learning' | 'personal' | 'teams' | 'content';

export type CoverageCardConfig = {
  id: CoverageCardKey;
  title: string;
  description: string;
  icon: React.ReactNode;
  className: string; // Tailwind col-span + layout classes
  component: React.ReactNode;
};

export const coverageCards: CoverageCardConfig[] = [
  {
    id: 'learning',
    title: 'Learning & Skill Development',
    description: 'Dynamic study plans that adapt when you miss a day.',
    icon: <GraduationCap className="text-white" size={24} />,
    className:
      'col-span-1 md:col-span-4 rounded-md bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between group',
    component: <LearningAndSkillDevelopment />,
  },
  {
    id: 'personal',
    title: 'Personal Life',
    description: 'Organize side projects and daily goals.',
    icon: <User className="text-white" size={24} />,
    className:
      'col-span-1 md:col-span-2 rounded-md bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between group',
    component: <PersonalLife />,
  },
  {
    id: 'teams',
    title: 'Teams',
    description: 'Alignment without the meetings.',
    icon: <Users className="text-white" size={24} />,
    className:
      'col-span-1 md:col-span-3 rounded-md bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group',
    component: <Teams />,
  },
  {
    id: 'content',
    title: 'Content & Freelance',
    description: 'Manage clients and content pipelines.',
    icon: <Video className="text-white" size={24} />,
    className:
      'col-span-1 md:col-span-3 rounded-md bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group',
    component: <ContentAndFreelance />,
  },
];
