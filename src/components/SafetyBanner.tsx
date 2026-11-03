import React from 'react';
import { AlertCircle, PhoneCall, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../types/agent';

interface SafetyBannerProps {
  language: LanguageCode;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ language }) => {
  const isHi = language === 'hi';

  return (
    <footer className="mt-8 border-t border-slate-200 bg-slate-100/70 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="leading-relaxed">
                <strong className="text-slate-800">
                  {isHi ? 'महत्वपूर्ण सुरक्षा एवं उत्तरदायी एआई सूचना: ' : 'Safety & Responsible AI Notice: '}
                </strong>
                {isHi
                  ? 'कृषि साथी (KrishiSaathi AI) एक शैक्षणिक जलवायु-लचीलापन निर्णय-सहायता प्रोटोटाइप है, जो अधिकृत कृषि अधिकारियों या आपातकालीन बचाव सेवाओं का विकल्प नहीं है। गंभीर मौसम या प्राकृतिक आपदा में भारत मौसम विज्ञान विभाग (IMD) और राज्य आपदा प्रबंधन प्राधिकरण (SDMA) की आधिकारिक घोषणाओं का पालन करें।'
                  : 'KrishiSaathi AI is an educational climate-resilience advisory prototype and not a certified substitute for official agricultural extension officers or emergency disaster relief services. For severe weather emergencies, heed India Meteorological Department (IMD) and State Disaster Management warnings.'}
              </p>
            </div>
          </div>

          {/* Emergency Helpline Box */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shrink-0 text-slate-800 shadow-2xs">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                {isHi ? 'किसान कॉल सेंटर (टोल-फ्री)' : 'Kisan Call Center (Toll-Free)'}
              </div>
              <div className="font-mono font-bold text-xs text-emerald-800">
                1800-180-1551 (All India)
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
          <div>
            KrishiSaathi AI · AWS Builder Center Hackathon "Strands SDK: Workshop to Ship" · Educational Prototype
          </div>
          <div className="flex items-center gap-3">
            <span>Agro-climate data calibrated to ICAR agro-ecological zones</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
