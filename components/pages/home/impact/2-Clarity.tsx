import { Fragment } from "react";
import impact from "@/data/Pages/home/3-impact";

const Clarity = () => {
    return (
        <Fragment>
            <div className="flex items-center gap-2 mb-4 text-neutral-400">
                {impact[1].icon}
                <span className="text-xs font-medium uppercase tracking-wider">{impact[1].title}</span>
            </div>
            <div className="h-32 flex items-center justify-center mb-4 relative">
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-neutral-700 to-green-400 w-[95%]" />
                </div>
                <div className="absolute top-8 w-full flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Vague</span>
                    <span>Actionable</span>
                </div>
            </div>
            <h4 className="text-3xl font-bold text-white mb-1">{impact[1].metric}</h4>
            <p className="text-base text-neutral-400">{impact[1].description}</p>
        </Fragment>
    )
}

export default Clarity;