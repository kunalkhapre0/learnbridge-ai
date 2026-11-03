import React from 'react';
import { History, ArrowUpRight, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ConsultationResponse, LanguageCode } from '../types/agent';

interface RecentConsultationsProps {
  consultations: ConsultationResponse[];
  onSelect: (consultation: ConsultationResponse) => void;
  language: LanguageCode;
}

export const RecentConsultations: React.FC<RecentConsultationsProps> = ({
  consultations,
  onSelect,
  language,
}) => {
  const isHi = language === 'hi';

  if (!consultations.length) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            {isHi ? 'हाल के परामर्श (Recent Consultations)' : 'Recent Field Consultations'}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {consultations.length} {isHi ? 'सत्र रिकॉर्ड' : 'Sessions'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {consultations.slice(0, 6).map((item, index) => {
          const profile = item.farmer_profile;
          const risk = item.climate_risk;
          const isHigh = risk.risk_level === 'HIGH' || risk.risk_level === 'CRITICAL';

          return (
            <div
              key={index}
              onClick={() => onSelect(item)}
              className="p-3.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-slate-50/70 transition-all cursor-pointer group flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {profile.crop} ({profile.growthStage})
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {profile.location}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                    isHigh
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {risk.risk_level}
                </span>
              </div>

              <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.localized.immediate_action}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.execution_duration_ms}ms trace</span>
                </span>
                <span className="text-emerald-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center">
                  <span>{isHi ? 'पुनः देखें' : 'Review'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
