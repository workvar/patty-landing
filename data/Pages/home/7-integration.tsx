import { icons } from '@/assets';

const integrations = [
  {
    name: "Jira",
    icon: icons.JiraIcon,
    description: "Automatically sync user stories and epics to keep your engineering team aligned."
  },
  {
    name: "Slack",
    icon: icons.SlackIcon,
    description: "Generate daily stand-up summaries and receive real-time alerts."
  },
  {
    name: "Notion",
    icon: icons.NotionIcon,
    description: "Embed live, interactive roadmaps directly into your project documentation."
  },
  {
    name: "Google Calendar",
    icon: icons.GoogleCalendarIcon,
    description: "Auto-schedule sprint reviews and meetings based on team availability."
  },
  {
    name: "Excel",
    icon: icons.ExcelIcon,
    description: "Export detailed execution plans and resource data for offline analysis."
  },
  {
    name: "Airtable",
    icon: icons.AirtableIcon,
    description: "Sync project data to build custom dashboards and automated workflows."
  }
];

export default integrations;