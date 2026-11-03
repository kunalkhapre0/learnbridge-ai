import React from 'react';
import { MapPin, Sprout, CloudRain, Droplets, HelpCircle, Layers, Send, RefreshCw } from 'lucide-react';
import { FarmerProfile, LanguageCode } from '../types/agent';
import { QUICK_QUESTIONS } from '../data/demoScenarios';

interface FarmerProfileFormProps {
  profile: FarmerProfile;
  onChange: (updated: Partial<FarmerProfile>) => void;
  onSubmit: (customQuery?: string) => void;
  isLoading: boolean;
  language: LanguageCode;
}

export const FarmerProfileForm: React.FC<FarmerProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  isLoading,
  language,
}) => {
  const isHi = language === 'hi';

  const crops = [
    { label: 'Soybean (सोयाबीन)', value: 'Soybean' },
    { label: 'Cotton (कपास)', value: 'Cotton' },
    { label: 'Wheat (गेहूं)', value: 'Wheat' },
    { label: 'Paddy / Rice (धान)', value: 'Paddy / Rice' },
    { label: 'Mustard (सरसों)', value: 'Mustard' },
    { label: 'Chickpea / Gram (चना)', value: 'Gram' },
    { label: 'Tomato (टमाटर)', value: 'Tomato' },
    { label: 'Onion (प्याज)', value: 'Onion' },
  ];

  const growthStages = [
    { label: isHi ? 'बुआई / अंकुरण (Sowing / Germination)' : 'Sowing / Germination', value: 'Sowing' },
    { label: isHi ? 'बढ़वार / वानस्पतिक (Vegetative)' : 'Vegetative', value: 'Vegetative' },
    { label: isHi ? 'फूल / फली बनना (Flowering / Podding)' : 'Flowering', value: 'Flowering' },
    { label: isHi ? 'दाना भराव / परिपक्वता (Grain filling)' : 'Grain filling', value: 'Grain filling' },
    { label: isHi ? 'कटाई के लिए तैयार (Harvest ready)' : 'Harvest ready', value: 'Harvest ready' },
  ];

  const soilTypes = [
    { label: isHi ? 'काली मिट्टी (Black Cotton Soil)' : 'Black Cotton Soil', value: 'Black cotton soil' },
    { label: isHi ? 'बलुई दोमट (Sandy Loam)' : 'Sandy Loam', value: 'Sandy loam' },
    { label: isHi ? 'चिकनी मिट्टी (Clay Soil)' : 'Clay', value: 'Clay' },
    { label: isHi ? 'जलोढ़ मिट्टी (Alluvial Loam)' : 'Alluvial', value: 'Alluvial' },
    { label: isHi ? 'लाल / लेटेराइट मिट्टी (Red Laterite)' : 'Red laterite', value: 'Red laterite' },
  ];

  const irrigationOptions = [
    { label: isHi ? 'केवल वर्षा-आधारित (Rainfed only)' : 'Rainfed only', value: 'Rainfed only' },
    { label: isHi ? 'सीमित / बोरवेल (Limited / Borewell)' : 'Limited', value: 'Limited' },
    { label: isHi ? 'नहर / ड्रिप सुनिश्चित (Canal / Assured Drip)' : 'Assured', value: 'Assured' },
  ];

  const concerns = [
    { label: isHi ? 'भारी बारिश / जलभराव (Heavy rainfall / Waterlogging)' : 'Heavy rainfall', value: 'Heavy rainfall' },
    { label: isHi ? 'लू / अत्यधिक तापमान (Heat wave / Extreme temp)' : 'Heat wave', value: 'Heat wave' },
    { label: isHi ? 'सूखा / लंबे समय से बारिश न होना (Drought / Dry spell)' : 'Drought / Dry spell', value: 'Drought / Dry spell' },
    { label: isHi ? 'ओलावृष्टि / तेज आंधी (Hailstorm / Strong winds)' : 'Hailstorm / Winds', value: 'Hailstorm / Winds' },
    { label: isHi ? 'बारिश के बाद कीट/रोग प्रकोप (Pest outbreak)' : 'Pest outbreak', value: 'Pest outbreak' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Form Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-semibold text-slate-800">
            {isHi ? 'किसान प्रोफ़ाइल एवं खेत का विवरण' : 'Farmer & Field Profile'}
          </h2>
        </div>
        <span className="text-xs text-slate-500">
          {isHi ? 'Strands Agents इनपुट' : 'Strands Agents Input'}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Row 1: Location & Crop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'स्थान / ज़िला (Location)' : 'Location / District'}</span>
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder={isHi ? 'उदा: इंदौर, मध्य प्रदेश' : 'e.g., Indore, Madhya Pradesh'}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'फसल का नाम (Crop)' : 'Crop Name'}</span>
            </label>
            <select
              value={profile.crop}
              onChange={(e) => onChange({ crop: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              {crops.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Growth Stage & Soil Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'फसल की अवस्था (Growth Stage)' : 'Growth Stage'}</span>
            </label>
            <select
              value={profile.growthStage}
              onChange={(e) => onChange({ growthStage: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              {growthStages.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'मिट्टी का प्रकार (Soil Type)' : 'Soil Type (Optional)'}</span>
            </label>
            <select
              value={profile.soilType}
              onChange={(e) => onChange({ soilType: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              {soilTypes.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Irrigation & Main Concern */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'सिंचाई की उपलब्धता (Irrigation)' : 'Irrigation Availability'}</span>
            </label>
            <select
              value={profile.irrigation}
              onChange={(e) => onChange({ irrigation: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              {irrigationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-slate-400" />
              <span>{isHi ? 'मुख्य चिंता / मौसम का खतरा (Concern)' : 'Main Climate Concern'}</span>
            </label>
            <select
              value={profile.concern}
              onChange={(e) => onChange({ concern: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              {concerns.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Questions Row */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? 'त्वरित प्रश्न पूछें (Quick Questions):' : 'Quick Farmer Questions:'}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {QUICK_QUESTIONS.map((q) => {
              const text = isHi ? q.hi : q.en;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    onChange({ concern: q.concern });
                    onSubmit(text);
                  }}
                  className="text-left text-xs px-3 py-2 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-slate-700 group flex items-start justify-between gap-1"
                >
                  <span className="group-hover:text-emerald-900 font-medium">{text}</span>
                  <span className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onSubmit()}
            className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/70 text-white font-medium text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>
                  {isHi
                    ? 'Strands multi-agent विश्लेषण चल रहा है...'
                    : 'Running Strands Multi-Agent Orchestrator...'}
                </span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-white" />
                <span>
                  {isHi
                    ? 'जलवायु जोखिम जांचें और कार्य-योजना बनाएं'
                    : 'Evaluate Climate Risk & Generate Action Plan'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
