import React from 'react';
import { AlertTriangle, ShieldCheck, Thermometer, CloudRain, Droplets, Compass } from 'lucide-react';
import { ClimateRiskResult, LanguageCode, RiskLevel } from '../types/agent';

interface RiskMeterProps {
  climateRisk: ClimateRiskResult;
  language: LanguageCode;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ climateRisk, language }) => {
  const isHi = language === 'hi';
  const { risk_level, primary_hazard, weather_metrics, risk_summary, requires_urgent_escalation } =
    climateRisk;

  // Visual configuration for the 4 states
  const riskConfig: Record<
    RiskLevel,
    {
      label: string;
      labelHi: string;
      color: string;
      bgColor: string;
      borderColor: string;
      textColor: string;
      percentage: number;
    }
  > = {
    LOW: {
      label: 'LOW RISK',
      labelHi: 'कम जोखिम (सुरक्षित)',
      color: '#16a34a',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      percentage: 20,
    },
    MEDIUM: {
      label: 'MEDIUM RISK',
      labelHi: 'मध्यम जोखिम (सतर्क रहें)',
      color: '#d97706',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
      percentage: 50,
    },
    HIGH: {
      label: 'HIGH RISK',
      labelHi: 'उच्च जोखिम (तत्काल सावधानी)',
      color: '#ea580c',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-950',
      percentage: 80,
    },
    CRITICAL: {
      label: 'CRITICAL RISK',
      labelHi: 'गंभीर जोखिम (आपातकालीन तैयारी)',
      color: '#dc2626',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      textColor: 'text-red-950',
      percentage: 100,
    },
  };

  const current = riskConfig[risk_level] || riskConfig.MEDIUM;

  return (
    <div className={`rounded-xl border ${current.borderColor} ${current.bgColor} p-5 shadow-xs`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              {isHi ? 'जलवायु जोखिम सूचकांक' : 'Climate Risk Assessment'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">Agent: ClimateRiskSpecialist</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-lg font-bold text-slate-900">
              {primary_hazard}
            </h3>
          </div>
        </div>

        {/* State Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-2xs"
            style={{ backgroundColor: current.color }}
          >
            {requires_urgent_escalation ? (
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            )}
            <span>{isHi ? current.labelHi : current.label}</span>
          </div>
        </div>
      </div>

      {/* Meter Bar */}
      <div className="py-4">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
          <span className={risk_level === 'LOW' ? 'font-bold text-emerald-700' : ''}>LOW (कम)</span>
          <span className={risk_level === 'MEDIUM' ? 'font-bold text-amber-700' : ''}>MEDIUM (मध्यम)</span>
          <span className={risk_level === 'HIGH' ? 'font-bold text-orange-700' : ''}>HIGH (उच्च)</span>
          <span className={risk_level === 'CRITICAL' ? 'font-bold text-red-700' : ''}>CRITICAL (गंभीर)</span>
        </div>
        <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-500 ${
              risk_level === 'LOW'
                ? 'bg-emerald-600'
                : risk_level === 'MEDIUM'
                ? 'bg-amber-500'
                : risk_level === 'HIGH'
                ? 'bg-orange-500'
                : 'bg-red-600'
            }`}
            style={{ width: `${current.percentage}%` }}
          />
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <div className="bg-white/80 rounded-lg p-2.5 border border-black/5">
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
            <Thermometer className="w-3 h-3 text-red-500" />
            <span>{isHi ? 'अधिकतम तापमान' : 'Peak Temp'}</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {weather_metrics.temp_max_c}°C
          </div>
          <div className="text-[11px] text-slate-500">Min: {weather_metrics.temp_min_c}°C</div>
        </div>

        <div className="bg-white/80 rounded-lg p-2.5 border border-black/5">
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
            <CloudRain className="w-3 h-3 text-blue-500" />
            <span>{isHi ? 'अनुमानित वर्षा' : 'Rainfall'}</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {weather_metrics.expected_rainfall_mm} mm
          </div>
          <div className="text-[11px] text-slate-500">
            {isHi ? `संभावना: ${weather_metrics.rain_prob_pct}%` : `Probability: ${weather_metrics.rain_prob_pct}%`}
          </div>
        </div>

        <div className="bg-white/80 rounded-lg p-2.5 border border-black/5">
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
            <Droplets className="w-3 h-3 text-cyan-600" />
            <span>{isHi ? 'मिट्टी की नमी' : 'Soil Moisture'}</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 truncate" title={weather_metrics.soil_moisture_index}>
            {weather_metrics.soil_moisture_index}
          </div>
          <div className="text-[11px] text-slate-500">{isHi ? 'जल धारण स्थिति' : 'Field retention'}</div>
        </div>

        <div className="bg-white/80 rounded-lg p-2.5 border border-black/5">
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
            <Compass className="w-3 h-3 text-emerald-600" />
            <span>{isHi ? 'कृषि क्षेत्र' : 'Agro-Zone'}</span>
          </div>
          <div className="text-xs font-semibold text-slate-900 truncate" title={weather_metrics.region}>
            {weather_metrics.region}
          </div>
          <div className="text-[11px] text-slate-500">{isHi ? 'क्षेत्रीय वर्गीकरण' : 'Calibrated benchmark'}</div>
        </div>
      </div>

      {/* Summary Explanation */}
      <div className="mt-3 text-xs text-slate-700 leading-relaxed bg-white/60 p-2.5 rounded-lg border border-black/5">
        <strong className="text-slate-900">{isHi ? 'विशेषज्ञ विश्लेषण: ' : 'Specialist Explanation: '}</strong>
        {risk_summary}
      </div>
    </div>
  );
};
