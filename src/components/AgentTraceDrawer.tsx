import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronRight, Cpu, Wrench, CheckCircle, Clock } from 'lucide-react';
import { AgentTraceStep, LanguageCode } from '../types/agent';

interface AgentTraceDrawerProps {
  traces: AgentTraceStep[];
  executionDurationMs: number;
  language: LanguageCode;
}

export const AgentTraceDrawer: React.FC<AgentTraceDrawerProps> = ({
  traces,
  executionDurationMs,
  language,
}) => {
  const isHi = language === 'hi';
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100/70 border-b border-slate-200/70 flex items-center justify-between text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-800">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {isHi ? 'Strands Agents निष्पादन ट्रेस' : 'Strands Multi-Agent Execution Trace'}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-medium">
                5 Agents Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isHi
                ? `कुल समय: ${executionDurationMs}ms · आर्केस्ट्रेटर और विशेषज्ञ एजेंटों का समन्वयन`
                : `Pipeline Latency: ${executionDurationMs}ms · Orchestrator & Specialist Coordination`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{isExpanded ? (isHi ? 'विवरण छिपाएं' : 'Collapse') : (isHi ? 'तर्क देखें' : 'Inspect Reasoning')}</span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>

      {/* Visual Multi-Agent Architecture Bar */}
      <div className="px-5 py-3 bg-slate-900 text-slate-200 text-xs flex flex-wrap items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-emerald-400 font-bold">Orchestrator</span>
          <span className="text-slate-500">→</span>
          <span className="text-sky-300">ClimateRisk</span>
          <span className="text-slate-500">→</span>
          <span className="text-amber-300">CropAdvisory</span>
          <span className="text-slate-500">→</span>
          <span className="text-purple-300">ActionPlan</span>
          <span className="text-slate-500">→</span>
          <span className="text-teal-300">LanguageAgent</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Total: {executionDurationMs}ms</span>
        </div>
      </div>

      {/* Expanded Step-by-Step Trace */}
      {isExpanded && (
        <div className="p-5 space-y-3 bg-slate-50/40">
          {traces.map((trace) => (
            <div
              key={trace.step}
              className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                    {trace.step}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {trace.agent}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase">
                    {trace.action}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {trace.duration_ms}ms
                </span>
              </div>

              {trace.tool_used && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50/70 px-2 py-1 rounded border border-indigo-100 font-mono">
                  <Wrench className="w-3 h-3" />
                  <span>Tool Invoked: {trace.tool_used}()</span>
                </div>
              )}

              {trace.details && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {trace.details}
                </p>
              )}

              {trace.output_summary && (
                <div className="flex items-start gap-1.5 text-xs text-emerald-800 bg-emerald-50/60 px-2.5 py-1.5 rounded border border-emerald-100/70">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{trace.output_summary}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
