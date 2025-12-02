import { Brain, Map, Zap, ListTodo } from "lucide-react";
import { DeepContextAwareness, AutoSprints, PerfectSpecs, LivingRoadmaps } from "@/components/pages/home/features";

interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    className: string;
}

const features: FeatureProps[] = [
    {
        title: "Deep Context Awareness",
        description: "Patty understands your project in-depth, from your goals to your team's capabilities.",
        icon: <Brain className="text-white" size={24} />,
        component: <DeepContextAwareness />,
        className: "col-span-1 md:col-span-3 lg:col-span-8 bg-gradient-to-br from-indigo-900/80 via-neutral-900 to-black border border-white/10 rounded-xl p-8 overflow-hidden"
    },
    {
        title: "Auto Sprints",
        description: "Patty automatically creates sprints based on your project's timeline and dependencies.",
        icon: <Zap className="text-white" size={24} />,
        component: <AutoSprints />,
        className: "col-span-1 md:col-span-1 lg:col-span-4 bg-gradient-to-br from-yellow-900/60 via-neutral-900 to-black border border-white/10 rounded-xl p-8 overflow-hidden"
    },
    {
        title: "Perfect Specs",
        description: "Patty creates perfect specs for your project, ready for development.",
        icon: <ListTodo className="text-white" size={24} />,
        component: <PerfectSpecs />,
        className: "col-span-1 md:col-span-1 lg:col-span-4 bg-gradient-to-br from-emerald-900/60 via-neutral-900 to-black border border-white/10 rounded-xl p-8 overflow-hidden"
    },
    {
        title: "Living Roadmaps",
        description: "Patty creates living roadmaps for your project, that can be updated in real-time.",
        icon: <Map className="text-white" size={24} />,
        component: <LivingRoadmaps />,
        className: "col-span-1 md:col-span-3 lg:col-span-8 bg-gradient-to-br from-purple-900/80 via-neutral-900 to-black border border-white/10 rounded-xl p-8 overflow-hidden flex flex-col md:flex-row gap-8 items-center"
    }
]

export default features;