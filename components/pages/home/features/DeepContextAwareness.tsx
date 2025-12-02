import { Fragment } from "react";
import features from "@/data/Pages/home/2-features"
import { Mic, Sparkles } from "lucide-react";

const DeepContextAwareness = () => {
    return (
        <Fragment>
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                  {features[0].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{features[0].title}</h3>
                <p className="text-neutral-300 max-w-sm">{features[0].description}</p>
              </div>
              
              {/* Visual */}
              <div className="w-full bg-[#111] border border-white/5 rounded-xl p-4 space-y-3" aria-hidden="true">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center"><Mic size={14} className="text-neutral-400"/></div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-xs text-neutral-300 w-3/4 border border-white/5">
                       "We need a way for users to invite team members, but only admins should control billing."
                    </div>
                 </div>
                 <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center"><Sparkles size={14} className="text-blue-400"/></div>
                    <div className="bg-blue-900/10 rounded-2xl rounded-tr-none p-3 text-xs text-blue-200 w-3/4 border border-blue-500/20">
                       <span className="font-semibold block mb-1">Requirement Added</span>
                       User Role Management: Admin-only billing access controls implemented via RBAC middleware.
                    </div>
                 </div>
              </div>
            </div>
        </Fragment>
    )
}

export default DeepContextAwareness;