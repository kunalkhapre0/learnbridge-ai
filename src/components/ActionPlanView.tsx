import React, { useState } from 'react';
import { Clock, Calendar, CheckSquare, Square, Zap, DollarSign, Leaf } from 'lucide-react';
import { ActionPlanResult, LanguageCode } from '../types/agent';

interface ActionPlanViewProps {
  actionPlan: ActionPlanResult;
  language: LanguageCode;
  immediateAction: string;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  actionPlan,
  language,
  immediateAction,
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'today' | 'next_3_days' | 'this_week'>('today');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const tabs = [
    {
      id: 'today' as const,
      labelEn: 'TODAY (Immediate Action)',
      labelHi: 'आज (तुरंत जरूरी कदम)',
      count: actionPlan.today.length,
      icon: Zap,
      accent: 'border-emerald-600 text-emerald-800 bg-emerald-50',
    },
    {
      id: 'next_3_days' as const,
      labelEn: 'NEXT 3 DAYS (Preventative)',
      labelHi: 'अगले 3 दिन (बचाव कार्य)',
      count: actionPlan.next_3_days.length,
      icon: Clock,
      accent: 'border-blue-600 text-blue-800 bg-blue-50',
    },
    {
      id: 'this_week' as const,
      labelEn: 'THIS WEEK (Recovery & Monitor)',
      labelHi: 'इस सप्ताह (निगरानी एवं बीमा)',
      count: actionPlan.this_week.length,
      icon: Calendar,
      accent: 'border-slate-600 text-slate-800 bg-slate-50',
    },
  ];

  const currentTasks =
    activeTab === 'today'
      ? actionPlan.today
      : activeTab === 'next_3_days'
      ? actionPlan.next_3_days
      : actionPlan.this_week;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Immediate Hero Banner */}
      <div className="p-4 bg-emerald-900 text-white border-b border-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-800/80 rounded-lg text-emerald-200 shrink-0 mt-0.5">
            <Zap className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300 font-mono">
                {isHi ? 'आज का सबसे जरूरी कदम' : 'Recommended Immediate Action'}
              </span>
              <span className="text-emerald-400/50">·</span>
              <span className="text-[11px] text-emerald-200 font-mono">Zero-Cost Priority</span>
            </div>
            <p className="text-sm font-semibold text-white mt-0.5 leading-snug">
              {immediateAction}
            </p>
          </div>
        </div>

        {/* Frugal Tier Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-xs shrink-0 text-emerald-100">
          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          <span>{actionPlan.estimated_cost_tier}</span>
        </div>
      </div>

      {/* Tabs for 3 Horizons */}
      <div className="flex border-b border-slate-200 bg-slate-50/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'border-emerald-700 text-emerald-950 bg-white font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>{isHi ? tab.labelHi : tab.labelEn}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist Content */}
      <div className="p-5">
        <div className="space-y-3">
          {currentTasks.map((task, index) => {
            const taskKey = `${activeTab}-${index}`;
            const isDone = !!completedTasks[taskKey];

            return (
              <div
                key={taskKey}
                onClick={() => toggleTask(taskKey)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200/90 hover:border-emerald-500 hover:shadow-2xs text-slate-800'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-emerald-700 shrink-0 focus:outline-none"
                  aria-label="Toggle task completion"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 hover:text-emerald-600" />
                  )}
                </button>
                <div className="flex-1">
                  <p
                    className={`text-xs leading-relaxed ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                    }`}
                  >
                    {task}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smallholder Frugality Footnote */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{actionPlan.frugal_principle}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Agent: ActionPlanSpecialist</span>
        </div>
      </div>
    </div>
  );
};
