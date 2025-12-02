import { Fragment } from "react";
import { coverageCards } from '@/data/Pages/home/5-coverage';
import { CheckCircle2 } from "lucide-react";

const LearningAndSkillDevelopment = () => {
    return (
        <Fragment>
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {coverageCards[0].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{coverageCards[0].title}</h3>
                <p className="text-neutral-400 max-w-sm text-base">{coverageCards[0].description}</p>
            </div>

            {/* Visual: Timeline */}
            <div className="mt-8 relative h-40 mask-linear-fade select-none pointer-events-none">
                <div className="absolute top-0 left-0 w-full space-y-3">
                    <div className="flex gap-4 items-center opacity-40">
                        <div className="w-16 text-right text-xs text-neutral-500 font-mono">Week 1</div>
                        <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle2 size={10} className="text-green-500" /></div>
                            <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-16 text-right text-xs text-white font-mono">Week 2</div>
                        <div className="flex-1 p-3 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center gap-3 shadow-lg transform translate-x-2">
                            <div className="w-4 h-4 rounded-full border border-white/20"></div>
                            <div>
                                <div className="text-xs text-white font-medium mb-1">Advanced React Patterns</div>
                                <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center opacity-60">
                        <div className="w-16 text-right text-xs text-neutral-500 font-mono">Week 3</div>
                        <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
        </Fragment>
    )
}

export default LearningAndSkillDevelopment;