import { Clock, Crosshair, Target, TrendingDown } from "lucide-react";
import { Speed, Clarity, Accuracy, Decision } from "@/components/pages/home/impact";

interface ImpactProps {
    title: string;
    metric: string;
    description: string;
    className: string;
    icon: React.ReactNode;
    component: React.ReactNode;
}

const impact: ImpactProps[] = [
    {
        title: "Speed",
        metric: "40%",
        description: "Reduction in time to spec.",
        className: "p-6 rounded-xl bg-gradient-to-b from-blue-900/40 to-black border border-white/10 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-1",
        icon: <Clock size={16} />,
        component: <Speed />
    },
    {
        title: "Clarity",
        metric: "0%",
        description: "Ambiguity in final tasks.",
        className: "p-6 rounded-xl bg-gradient-to-b from-green-900/40 to-black border border-white/10 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-1",
        icon: <Target size={16} />,
        component: <Clarity />
    },
    {
        title: "Sprint Accuracy",
        metric: "80%+",
        description: "Predictable delivery.",
        className: "p-6 rounded-xl bg-gradient-to-b from-purple-900/40 to-black border border-white/10 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-1",
        icon: <Crosshair size={16} />,
        component: <Accuracy />
    },
    {
        title: "Decision Friction",
        metric: "From weeks to hours",
        description: "Decision Latency.",
        className: "p-6 rounded-xl bg-gradient-to-b from-orange-900/40 to-black border border-white/10 relative overflow-hidden group transition-transform duration-300 hover:-translate-y-1",
        icon: <TrendingDown size={16} />,
        component: <Decision />
    },
]

export default impact;