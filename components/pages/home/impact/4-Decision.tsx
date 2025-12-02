import { Fragment } from "react";
import impact from "@/data/Pages/home/3-impact";
import { TrendingDown } from "lucide-react";

const Decision = () => {
    return (
        <Fragment>
            <div className="flex items-center gap-2 mb-4 text-neutral-400">
                {impact[3].icon}
                <span className="text-xs font-medium uppercase tracking-wider">{impact[3].title}</span>
            </div>
            <div className="h-32 flex items-end justify-center mb-4 relative p-2">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {/* <pa */}
                    <path
                        d="M0,10 Q25,10 35,50 T100,90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-orange-500"
                    />
                </svg>
            </div>
            <h4 className="text-2xl font-bold text-white mb-1">{impact[3].metric}</h4>
            <p className="text-base text-neutral-400">{impact[3].description}</p>
        </Fragment>
    )
}

export default Decision;