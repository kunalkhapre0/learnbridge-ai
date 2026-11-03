import React from 'react';
import { X, TrendingDown, Clock, ShieldCheck, DollarSign, Users, Award, BookOpen } from 'lucide-react';
import { LanguageCode } from '../types/agent';

interface ImpactDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const isHi = language === 'hi';

  const metrics = [
    {
      labelEn: 'Estimated Crop Loss Reduction',
      labelHi: 'अनुमानित फसल नुकसान में कमी',
      value: '-38%',
      subtitleEn: 'During heavy rain & waterlogging events through 48h advance trenching',
      subtitleHi: '48 घंटे पूर्व जल निकासी नाली बनाने से सोयाबीन एवं कपास में नुकसान में कमी',
      icon: TrendingDown,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      labelEn: 'Hazard Preparation Lead Time',
      labelHi: 'आपदा पूर्व तैयारी का समय',
      value: '48-72h',
      subtitleEn: 'Compared to 6-12 hours average for post-event reactive responses',
      subtitleHi: 'मौसम की मार पड़ने के बाद की बजाय 48-72 घंटे पहले सुरक्षात्मक तैयारी',
      icon: Clock,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      labelEn: 'Protected Farmer Input Capital',
      labelHi: 'बचत हुआ किसान का इनपुट खर्च',
      value: '₹4,200',
      subtitleEn: 'Per acre in wasted fertilizer leaching and unneeded pesticide sprays',
      subtitleHi: 'प्रति एकड़ बहने वाले यूरिया एवं अनावश्यक कीटनाशक की सीधी बचत',
      icon: DollarSign,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      labelEn: 'Information Comprehension Rate',
      labelHi: 'किसान समझ और अपनाने की दर',
      value: '89%',
      subtitleEn: 'In simple conversational Hindi vs. 24% for standard government PDF bulletins',
      subtitleHi: 'सरल ग्रामीण हिंदी में समझने की दर (सरकारी बुलेटिन की 24% की तुलना में)',
      icon: Users,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-800">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isHi ? 'मापने योग्य सामाजिक प्रभाव (Measurable Social Impact)' : 'Measurable Social Good Impact'}
              </h3>
              <p className="text-xs text-slate-500">
                {isHi
                  ? 'छोटे और सीमांत किसानों के लिए जलवायु लचीलापन मेट्रिक्स'
                  : 'Climate Resilience Benchmarks for Small & Marginal Farmers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice of simulated data */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200/70 text-xs text-amber-900 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>
              {isHi ? 'पारदर्शिता सूचना: ' : 'Methodology & Transparency: '}
            </strong>
            {isHi
              ? 'ये आंकड़े भारतीय कृषि अनुसंधान परिषद (ICAR) और CIMMYT के छोटे किसानों पर जलवायु अनुकूलन अध्ययनों पर आधारित सिमुलेटेड बेंचमार्क हैं।'
              : 'These metrics represent simulated demo benchmarks calibrated from ICAR & CIMMYT smallholder climate adaptation research.'}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className={`p-4 rounded-xl border ${m.color} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {isHi ? m.labelHi : m.labelEn}
                    </span>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">
                    {m.value}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHi ? m.subtitleHi : m.subtitleEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Social Good Story Narrative */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs space-y-3 leading-relaxed text-slate-700">
            <h4 className="font-bold text-sm text-slate-900">
              {isHi ? 'सच्चा सामाजिक प्रभाव: एक किसान की कहानी' : 'The Real Social Good Impact Story'}
            </h4>
            <p>
              {isHi
                ? 'भारत में 86% किसान 2 हेक्टेयर से कम भूमि वाले छोटे व सीमांत किसान हैं। अचानक आई बेमौसम बारिश या 42 डिग्री की लू उनकी 6 महीने की पूंजी और परिवार की आजीविका को एक झटके में तबाह कर देती है।'
                : 'In India, over 86% of farmers operate holdings under 2 hectares. Unseasonal deluges or sudden 43°C heatwaves threaten not just a crop, but family survival and debt cycles.'}
            </p>
            <p>
              {isHi
                ? 'KrishiSaathi AI महंगे रसायनों की सलाह देने के बजाय "जीरो-बजट प्राकृतिक सुरक्षा" सिखाता है—जैसे खेत की मेड़ काटना, सूखी घास से मल्चिंग करना, और समय पर यूरिया का छिड़काव रोकना। AWS Strands Agents SDK के बहु-एजेंट आर्किटेक्चर के कारण हर सलाह जांच-परख कर दी जाती है।'
                : 'Instead of recommending expensive synthetic chemicals that drive farmers into debt, KrishiSaathi AI prioritizes zero-cost farm-sourced cultural resilience: peripheral drainage trenches, biological biomass mulching, and halting urea applications before washouts. Multi-agent validation ensures grounded, risk-conscious advice.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>AWS Builder Center "Strands SDK: Workshop to Ship"</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-900 transition-colors"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
