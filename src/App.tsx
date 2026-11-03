/**
 * KrishiSaathi AI - Main Application Component
 * AWS Builder Center "Strands SDK: Workshop to Ship" Hackathon
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FarmerProfileForm } from './components/FarmerProfileForm';
import { RiskMeter } from './components/RiskMeter';
import { ActionPlanView } from './components/ActionPlanView';
import { CropAdvisoryCard } from './components/CropAdvisoryCard';
import { AgentTraceDrawer } from './components/AgentTraceDrawer';
import { CodeInspectorModal } from './components/CodeInspectorModal';
import { ImpactDashboard } from './components/ImpactDashboard';
import { RecentConsultations } from './components/RecentConsultations';
import { SafetyBanner } from './components/SafetyBanner';
import { FarmerProfile, ConsultationResponse, LanguageCode } from './types/agent';
import { DEMO_SCENARIOS } from './data/demoScenarios';
import { runStrandsMultiAgentConsultation } from './services/multiAgentEngine';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('hi');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('indore-soybean');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Active Farmer Profile state initialized with prompt's canonical example
  const [profile, setProfile] = useState<FarmerProfile>({
    farmerName: 'Ramesh Kumar',
    location: 'Indore, Madhya Pradesh',
    crop: 'Soybean',
    growthStage: 'Flowering',
    soilType: 'Black cotton soil',
    irrigation: 'Limited',
    concern: 'Heavy rainfall',
    language: 'hi',
  });

  const [currentConsultation, setCurrentConsultation] = useState<ConsultationResponse | null>(null);
  const [recentConsultations, setRecentConsultations] = useState<ConsultationResponse[]>([]);

  // Update profile fields
  const handleProfileChange = (updated: Partial<FarmerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Run the Strands multi-agent workflow
  const executeConsultation = async (customQuery?: string) => {
    setIsLoading(true);
    // Stop any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const activeProfile = {
        ...profile,
        language: language,
      };

      const result = await runStrandsMultiAgentConsultation(
        activeProfile,
        customQuery || (language === 'hi' ? 'मेरी फसल के लिए सलाह दें' : 'Advise on my crop')
      );

      setCurrentConsultation(result);
      setRecentConsultations((prev) => [result, ...prev.filter((c) => c !== result)].slice(0, 8));
    } catch (err) {
      console.error('Error running Strands multi-agent consultation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch demo preset scenario
  const handleSelectScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenarioId(scenarioId);
    const updatedProfile: FarmerProfile = {
      farmerName: profile.farmerName,
      location: scenario.location,
      crop: scenario.crop,
      growthStage: scenario.growthStage,
      soilType: scenario.soilType,
      irrigation: scenario.irrigation,
      concern: scenario.concern,
      language: language,
    };
    setProfile(updatedProfile);

    // Auto-run with the preset query
    setIsLoading(true);
    runStrandsMultiAgentConsultation(
      updatedProfile,
      language === 'hi' ? scenario.query_hi : scenario.query_en
    ).then((result) => {
      setCurrentConsultation(result);
      setRecentConsultations((prev) => [result, ...prev].slice(0, 8));
      setIsLoading(false);
    });
  };

  // Language switch: re-run current advisory in the target language
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    setProfile((prev) => ({ ...prev, language: newLang }));

    if (currentConsultation) {
      const updatedProfile = { ...profile, language: newLang };
      runStrandsMultiAgentConsultation(updatedProfile, '').then((result) => {
        setCurrentConsultation(result);
      });
    }
  };

  // Web Speech API for voice advisory (essential for rural literacy accessibility)
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(language === 'hi' ? 'आपके ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है।' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!currentConsultation) return;

    const textToSpeak = `${currentConsultation.localized.summary} ${currentConsultation.localized.immediate_action}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (language === 'hi') {
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
    } else {
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Initial execution on mount
  useEffect(() => {
    executeConsultation();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
        onToggleCodeModal={() => setIsCodeModalOpen(true)}
        onToggleImpactModal={() => setIsImpactModalOpen(true)}
        isSpeaking={isSpeaking}
        onToggleSpeech={toggleSpeech}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Scenario Context Banner */}
        {activeScenarioId && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-900 uppercase tracking-wider text-[11px] font-mono">
                  {language === 'hi' ? 'सक्रिय परिदृश्य संदर्भ' : 'Active Scenario Grounding'}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">
                  {DEMO_SCENARIOS.find((s) => s.id === activeScenarioId)?.badge}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {language === 'hi'
                  ? DEMO_SCENARIOS.find((s) => s.id === activeScenarioId)?.contextDescription_hi
                  : DEMO_SCENARIOS.find((s) => s.id === activeScenarioId)?.contextDescription}
              </p>
            </div>
            <div className="text-xs text-slate-500 shrink-0 font-mono">
              <span>{profile.location}</span> · <span>{profile.crop}</span>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Farmer Profile & Form (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <FarmerProfileForm
              profile={profile}
              onChange={handleProfileChange}
              onSubmit={executeConsultation}
              isLoading={isLoading}
              language={language}
            />

            {/* Quick Helper Box for Hackathon Reviewers */}
            <div className="bg-emerald-900 text-white rounded-xl p-4 text-xs space-y-2 border border-emerald-950">
              <div className="font-bold flex items-center gap-2 text-emerald-200">
                <span>AWS Strands Multi-Agent Core</span>
              </div>
              <p className="text-emerald-100/90 leading-relaxed">
                {language === 'hi'
                  ? 'यह प्रणाली सिंगल चैटबॉट नहीं है। Orchestrator एजेंट 4 विशेषज्ञ एजेंटों (Climate, Crop, Action Plan, Language) को समन्वित करता है।'
                  : 'Not a monolithic chatbot. Orchestrator coordinates 4 specialized agents across isolated domain prompts, deterministic tools, and frugal constraints.'}
              </p>
              <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-300">
                <span>Frugal Smallholder Focus</span>
                <button
                  onClick={() => setIsCodeModalOpen(true)}
                  className="underline hover:text-white"
                >
                  View Agent Code →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Agent Advisory Output (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {currentConsultation ? (
              <>
                {/* 1. Climate Risk Indicator */}
                <RiskMeter
                  climateRisk={currentConsultation.climate_risk}
                  language={language}
                />

                {/* 2. Action Plan View (Today, Next 3 Days, This Week) */}
                <ActionPlanView
                  actionPlan={currentConsultation.action_plan}
                  language={language}
                  immediateAction={currentConsultation.localized.immediate_action}
                />

                {/* 3. Crop Advisory Specialist Card */}
                <CropAdvisoryCard
                  cropAdvisory={currentConsultation.crop_advisory}
                  language={language}
                />

                {/* 4. Real-time Agent Reasoning & Tool Trace */}
                <AgentTraceDrawer
                  traces={currentConsultation.traces}
                  executionDurationMs={currentConsultation.execution_duration_ms}
                  language={language}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
                {language === 'hi'
                  ? 'परामर्श परिणाम लोड हो रहे हैं...'
                  : 'Loading multi-agent consultation...'}
              </div>
            )}
          </div>
        </div>

        {/* Recent Consultations Section */}
        {recentConsultations.length > 0 && (
          <RecentConsultations
            consultations={recentConsultations}
            onSelect={(selected) => setCurrentConsultation(selected)}
            language={language}
          />
        )}
      </main>

      {/* Code Inspector Modal for Python Strands SDK */}
      <CodeInspectorModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Impact Dashboard Modal */}
      <ImpactDashboard
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
        language={language}
      />

      {/* Safety & Responsible AI Footer */}
      <SafetyBanner language={language} />
    </div>
  );
}
