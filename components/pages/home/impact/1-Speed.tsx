import { Fragment } from "react";
import impact from "@/data/Pages/home/3-impact";

const Speed = () => {
    return (
        <Fragment>
            <div className="flex items-center gap-2 mb-4 text-neutral-400">
                {impact[0].icon}
                <span className="text-xs font-medium uppercase tracking-wider">{impact[0].title}</span>
            </div>
            <div className="h-32 flex items-end gap-4 mb-4 relative">
                <div className="w-full bg-pink-500 rounded-t-lg h-[80%] relative group-hover:bg-neutral-800/50 transition-colors">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-neutral-500">Human</span>
                </div>
                <div className="w-full bg-blue-500/20 border border-blue-500/50 rounded-t-lg h-[40%] relative">
                    <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg opacity-80 h-full" />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-blue-400 font-bold">Patty</span>
                </div>
            </div>
            <h4 className="text-3xl font-bold text-white mb-1">{impact[0].metric}</h4>
            <p className="text-base text-neutral-400">{impact[0].description}</p>
        </Fragment>
    )
}

export default Speed;