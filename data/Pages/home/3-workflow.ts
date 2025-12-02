export type WorkflowStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    id: '01',
    label: 'Input',
    title: 'Raw Thought',
    description: 'Voice note, whiteboard photo, or messy text dump.',
    color: 'bg-blue-500',
  },
  {
    id: '02',
    label: 'Process',
    title: 'Structure',
    description: 'Patty identifies entities, logic gaps, and requirements.',
    color: 'bg-purple-500',
  },
  {
    id: '03',
    label: 'Output',
    title: 'Action Plan',
    description: 'Formatted stories, sprint breakdown, and timelines.',
    color: 'bg-green-500',
  },
];
