export type WorkflowStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  color: string;
  className: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    id: '01',
    label: 'Input',
    title: 'Raw Thought',
    description: 'Voice note, whiteboard photo, or messy text dump.',
    color: 'blue-500',
    className: 'rounded-xl relative z-10 bg-gradient-to-br from-blue-500/40 to-black',
  },
  {
    id: '02',
    label: 'Process',
    title: 'Structure',
    description: 'Patty identifies entities, logic gaps, and requirements.',
    color: 'purple-500',
    className: 'rounded-xl relative z-10 bg-gradient-to-br from-purple-500/40 to-black',
  },
  {
    id: '03',
    label: 'Output',
    title: 'Action Plan',
    description: 'Formatted stories, sprint breakdown, and timelines.',
    color: 'red-500',
    className: 'rounded-xl relative z-10 bg-gradient-to-br from-red-500/40 to-black',
  },
];
