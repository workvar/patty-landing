import { Fragment } from "react";
import { coverageCards } from '@/data/Pages/home/6-coverage';

const ContentAndFreelance = () => {
    return (
        <Fragment>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                        {coverageCards[3].icon}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2">{coverageCards[3].title}</h3>
                    <p className="text-neutral-400 text-base">{coverageCards[3].description}</p>
                </div>
            </div>

            {/* Visual: Calendar/List */}
            <div className="space-y-3 select-none pointer-events-none">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-xs font-mono text-neutral-400 flex-col">
                        <span>OCT</span><span className="text-white font-bold">12</span>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm text-white font-medium">Acme Corp - Deliverables</div>
                        <div className="text-xs text-neutral-500">Video Script & Assets</div>
                    </div>
                    <div className="px-2 py-1 rounded text-[10px] bg-green-500/10 text-green-500 border border-green-500/20">Due Today</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 opacity-60">
                    <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-xs font-mono text-neutral-400 flex-col">
                        <span>OCT</span><span className="text-white font-bold">14</span>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm text-white font-medium">Newsletter Draft</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ContentAndFreelance;