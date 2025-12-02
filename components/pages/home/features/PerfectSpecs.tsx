import { Fragment } from "react";
import { ListTodo } from "lucide-react";
import features from "@/data/Pages/home/2-features";

const PerfectSpecs = () => {
    return (
        <Fragment>
            <div className="mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    {features[2].icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{features[2].title}</h3>
                <p className="text-neutral-300">{features[2].description}</p>
            </div>
            <div className="bg-[#111] p-4 rounded-xl border border-white/5 font-mono text-[10px] text-neutral-400 leading-relaxed" aria-hidden="true">
                <span className="text-purple-400">Feature:</span> Dark Mode<br />
                <span className="text-blue-400">Scenario:</span> User toggles switch<br />
                <span className="text-yellow-400">Given</span> user is on settings page<br />
                <span className="text-yellow-400">When</span> they click toggle<br />
                <span className="text-yellow-400">Then</span> theme updates locally<br />
                <span className="text-yellow-400">And</span> preference saves to DB
            </div>
        </Fragment>
    )
}

export default PerfectSpecs;