export type CaseStudy = {
  id: string;
  title: string;
  context: string;
  impact: string;
  description: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'indie-dev',
    title: 'Solo builder shipping an MVP alongside a full-time job',
    context:
      'Wants to turn a messy backlog of ideas, voice notes, and half-finished Notion pages into a realistic roadmap that fits limited weekly time.',
    impact:
      'Cut weekly planning time from 4 hours to 40 minutes while shipping a stable MVP in 8 weeks.',
    description:
      'Patty ingests raw thoughts (voice notes, braindumps, and screenshots) and converts them into structured user stories and sprints that respect real-life constraints like job hours and energy. Instead of rewriting plans every week, the user maintains a living plan that automatically adjusts scope and priorities as new ideas or blockers appear.',
  },
  {
    id: 'pm-startup',
    title: 'Early-stage product team trying to align across functions',
    context:
      'Needs to keep engineering, sales, and founders aligned on what is shipping next and why, without spending hours in recurring planning calls.',
    impact:
      'Created a shared, living roadmap that the whole team trusts and updates in real time.',
    description:
      'Patty connects scattered context from docs, call notes, and Slack into a single prioritized view of upcoming work. Planning sessions start with proposed sprints, trade-offs, and risks already laid out, so teams focus on making decisions instead of reconstructing context.',
  },
  {
    id: 'eng-manager',
    title: 'Distributed engineering team that needs reliable specs',
    context:
      'Wants specs, edge cases, and acceptance criteria to stay accurate across time zones without constant manual editing.',
    impact:
      'Replaced scattered docs with one AI‑maintained source of truth for specs and edge cases.',
    description:
      'Patty turns rough PRDs, Loom recordings, and comments into clean, versioned specs that adapt as decisions change. When new questions or edge cases appear, updating Patty once propagates changes into the spec, test cases, and acceptance criteria so the whole team shares the same, current source of truth.',
  },
  {
    id: 'freelancer',
    title: 'Consultant or agency managing multiple client roadmaps',
    context:
      'Handles several clients at once and needs to maintain clear scopes, timelines, and trade-offs per client without losing track.',
    impact:
      'Keeps 5+ client roadmaps, scopes, and timelines organized without dropping a single ball.',
    description:
      'Patty maintains a dedicated workspace per client that holds goals, constraints, and active initiatives. When a client asks for a new timeline or feature, Patty reconciles the request with current commitments and produces updated plans, risks, and options that can be shared back in plain language.',
  },
  {
    id: 'student-builder',
    title: 'Side-project builder trying not to abandon ideas halfway',
    context:
      'Has lots of half-started projects and wants a simple way to scope, sequence, and actually finish a few of them.',
    impact:
      'Turned scattered side ideas into 3 shipped projects with clear scopes and deadlines.',
    description:
      'Patty helps users define who a project is for, what outcome matters, and how much time is realistically available. It proposes a cut-down, shippable scope with milestones and suggests what to drop or postpone when life gets busy, so projects move from “cool idea” to “actually shipped.”',
  },
];
