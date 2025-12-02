import { Fragment } from "react";
import { Zap } from "lucide-react";
import features from "@/data/Pages/home/2-features";

const AutoSprints = () => {
    return (
        <Fragment>
             <div className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                  {features[1].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{features[1].title}</h3>
                <p className="text-neutral-300 text-sm mb-8">{features[1].description}</p>
                
                <div className="mt-auto space-y-2" aria-hidden="true">
                   {['Sprint 24', 'Sprint 25', 'Sprint 26'].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className={`w-2 h-8 rounded-full ${i===0 ? 'bg-yellow-500' : 'bg-neutral-700'}`}></div>
                         <div className="flex-1">
                            <div className="text-sm font-medium text-white">{s}</div>
                            <div className="text-xs text-neutral-500">{i===0 ? 'In Progress' : 'Planned'}</div>
                         </div>
                         <div className="text-xs font-mono text-neutral-400">24pts</div>
                      </div>
                   ))}
                </div>
             </div>
        </Fragment>
    )
}

export default AutoSprints;