import { Fragment } from "react";
import { coverageCards } from '@/data/Pages/home/6-coverage';

const Teams = () => (
    <Fragment>
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {coverageCards[2].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{coverageCards[2].title}</h3>
                <p className="text-neutral-400 text-base">{coverageCards[2].description}</p>
            </div>
        </div>

        {/* Visual: Kanban Board */}
        <div className="flex gap-4 h-40 select-none pointer-events-none">
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">To Do</div>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm">
                    <div className="h-1.5 w-12 bg-blue-500/50 rounded-full mb-2"></div>
                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                </div>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm opacity-60">
                    <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">In Progress</div>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm border-l-2 border-l-yellow-500">
                    <div className="h-2 w-full bg-white/10 rounded-full mb-1"></div>
                    <div className="flex -space-x-1 mt-2">
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
)

export default Teams;