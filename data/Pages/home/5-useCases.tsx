import { Rocket, Coffee, Users } from "lucide-react";

interface UseCaseProps {
  role: string;
  icon: React.ReactNode;
  color: string;
  benefit: string;
  className: string;
}

const cases: UseCaseProps[] = [
    {
      role: "Solo Founders",
      icon: <Rocket className="text-white" size={24} />,
      color: "bg-orange-500",
      benefit: "Get the clarity of a co-founder without giving up equity. Turn shower thoughts into roadmaps.",
      className: "p-8 rounded-md bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-[#111] transition-all group relative overflow-hidden",
    },
    {
      role: "Hobbyists",
      icon: <Coffee className="text-white" size={24} />,
      color: "bg-pink-500",
      benefit: "Bring structure to your passion projects. Move from 'cool idea' to 'shipped' on weekends.",
      className: "p-8 rounded-md bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-[#111] transition-all group relative overflow-hidden",
    },
    {
      role: "Teams",
      icon: <Users className="text-white" size={24} />,
      color: "bg-blue-500",
      benefit: "Stop bikeshedding. Align stakeholders on requirements instantly and export actionable specs.",
      className: "p-8 rounded-md bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-[#111] transition-all group relative overflow-hidden",
    }
  ];

export default cases;