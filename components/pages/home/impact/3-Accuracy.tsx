import { Fragment } from "react";
import impact from "@/data/Pages/home/3-impact";

const Accuracy = () => {
    return (
        <Fragment>
            <div className="flex items-center gap-2 mb-4 text-neutral-400">
                {impact[2].icon}
                <span className="text-xs font-medium uppercase tracking-wider">{impact[2].title}</span>
            </div>
            <div className="h-32 flex items-center justify-center mb-4 relative">
                <div className="w-24 h-24 rounded-full border-4 border-neutral-800 relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent opacity-50 rotate-45"></div>
                </div>
            </div>
            <h4 className="text-3xl font-bold text-white mb-1">{impact[2].metric}</h4>
            <p className="text-base text-neutral-400">{impact[2].description}</p>
        </Fragment>
    )
}

export default Accuracy;