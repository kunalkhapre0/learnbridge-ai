import React from 'react';
import { ShieldCheck, Volume2, VolumeX, Code2, BarChart3, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types/agent';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface HeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
  onToggleCodeModal: () => void;
  onToggleImpactModal: () => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeScenarioId,
  onSelectScenario,
  onToggleCodeModal,
  onToggleImpactModal,
  isSpeaking,
  onToggleSpeech,
}) => {
  const isHi = language === 'hi';

  return (
    <header className="border-b border-emerald-900/10 bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-3">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-700/20">
              <span className="font-bold text-lg font-serif">कृ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  KrishiSaathi AI <span className="font-hindi text-base text-emerald-800 font-semibold">(कृषि साथी)</span>
                </h1>
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono px-2 py-0.5 rounded">
                  AWS Strands SDK
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isHi
                  ? 'छोटे किसानों के लिए बहु-एजेंट जलवायु लचीलापन सहायक · AWS Builder Center Hackathon'
                  : 'Multi-Agent Climate Resilience Advisory for Smallholder Farmers · AWS Hackathon'}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            {/* Audio Speech Trigger */}
            <button
              onClick={onToggleSpeech}
              title={isSpeaking ? 'Stop Audio' : 'Listen to Advisory'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isSpeaking
                  ? 'bg-amber-50 text-amber-900 border-amber-300 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHi ? 'आवाज बंद करें' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isHi ? 'सलाह सुनें' : 'Listen'}</span>
                </>
              )}
            </button>

            {/* View Strands Python Code */}
            <button
              onClick={onToggleCodeModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isHi ? 'Strands कोड देखें' : 'Strands SDK Code'}</span>
            </button>

            {/* Impact Metric Dashboard Modal */}
            <button
              onClick={onToggleImpactModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isHi ? 'प्रभाव मेट्रिक्स' : 'Impact Metrics'}</span>
            </button>

            {/* Bilingual Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  language === 'hi'
                    ? 'bg-white text-emerald-900 shadow-xs font-hindi font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Demo Mode Presets Toolbar */}
        <div className="py-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mr-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>{isHi ? 'डेमो परिदृश्य (Demo Mode):' : 'Demo Presets:'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {DEMO_SCENARIOS.map((scenario) => {
              const isSelected = activeScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => onSelectScenario(scenario.id)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span>{isHi ? scenario.name_hi : scenario.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
