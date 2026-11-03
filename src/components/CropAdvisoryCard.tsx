import React from 'react';
import { Sprout, AlertCircle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CropAdvisoryResult, LanguageCode } from '../types/agent';

interface CropAdvisoryCardProps {
  cropAdvisory: CropAdvisoryResult;
  language: LanguageCode;
}

export const CropAdvisoryCard: React.FC<CropAdvisoryCardProps> = ({ cropAdvisory, language }) => {
  const isHi = language === 'hi';
  const {
    crop,
    growth_stage,
    critical_hazard,
    stage_impact,
    soil_consideration,
    irrigation_strategy,
    recommended_interventions,
    scientific_uncertainty_disclaimer,
  } = cropAdvisory;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            {isHi ? 'फसल सुरक्षा एवं कृषि विशेषज्ञ सलाह' : 'Crop Protection & Agronomic Advisory'}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>{crop}</span>
          <span>·</span>
          <span>{growth_stage}</span>
        </div>
      </div>

      {/* Physiological Impact Alert */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3.5 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-semibold text-amber-950 flex items-center gap-2">
            <span>{critical_hazard}</span>
          </div>
          <p className="text-amber-900/90 leading-relaxed">{stage_impact}</p>
        </div>
      </div>

      {/* Recommended Interventions List */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
          {isHi ? 'व्यावहारिक सुरक्षा उपाय (Low-Cost Interventions)' : 'Practical Protection Measures'}
        </h4>
        <div className="space-y-2">
          {recommended_interventions.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Soil & Irrigation Context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        <div className="bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-lg">
          <span className="font-semibold text-emerald-950 block mb-0.5">
            {isHi ? 'मिट्टी के अनुसार सावधानी:' : 'Soil Context:'}
          </span>
          <p className="text-emerald-900">{soil_consideration}</p>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 p-2.5 rounded-lg">
          <span className="font-semibold text-blue-950 block mb-0.5">
            {isHi ? 'सिंचाई रणनीति:' : 'Irrigation Strategy:'}
          </span>
          <p className="text-blue-900">{irrigation_strategy}</p>
        </div>
      </div>

      {/* Uncertainty Disclaimer */}
      <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50/60 p-2.5 rounded-lg">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-normal">
          <strong className="text-slate-700">{isHi ? 'वैज्ञानिक अनिश्चितता स्पष्टीकरण: ' : 'Agronomic Uncertainty Notice: '}</strong>
          {scientific_uncertainty_disclaimer}
        </p>
      </div>
    </div>
  );
};
