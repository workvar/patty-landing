import { Fragment } from "react";
import { coverageCards } from '@/data/Pages/home/5-coverage';

const PersonalLife = () => {
    return (
        <Fragment>
            <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {coverageCards[1].icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">{coverageCards[1].title}</h3>
                <p className="text-neutral-400 text-base">{coverageCards[1].description}</p>
            </div>

            {/* Visual: Checklist */}
            <div className="mt-6 space-y-2 select-none pointer-events-none">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className={`w-4 h-4 rounded border ${i === 1 ? 'bg-blue-500 border-blue-500' : 'border-neutral-600'}`}></div>
                        <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default PersonalLife;