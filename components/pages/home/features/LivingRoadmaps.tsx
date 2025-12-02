import { Fragment } from "react";
import { GitPullRequest } from "lucide-react";
import features from "@/data/Pages/home/2-features";

const LivingRoadmaps = () => {
    return (
        <Fragment>
            <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                    {features[3].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{features[3].title}</h3>
                <p className="text-neutral-300">{features[3].description}</p>
            </div>
            <div className="flex-1 w-full" aria-hidden="true">
                <div className="relative h-32 w-full">
                    {/* Gantt Chart Abstract */}
                    <div className="absolute top-0 left-0 w-3/4 h-8 bg-neutral-800 rounded-lg border border-white/5 flex items-center px-3 text-xs text-white mb-2">Core Infrastructure</div>
                    <div className="absolute top-10 left-[20%] w-1/2 h-8 bg-blue-900/30 border border-blue-500/30 rounded-lg flex items-center px-3 text-xs text-blue-200">API Gateway</div>
                    <div className="absolute top-20 left-[40%] w-1/2 h-8 bg-purple-900/30 border border-purple-500/30 rounded-lg flex items-center px-3 text-xs text-purple-200">Frontend Auth</div>

                    {/* Connection Line */}
                    <div className="absolute top-4 left-[75%] w-[5%] h-16 border-l border-b border-white/20 rounded-bl-xl"></div>
                </div>
            </div>
        </Fragment>
    )
}

export default LivingRoadmaps;