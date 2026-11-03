/**
 * KrishiSaathi AI - Type definitions for Strands Multi-Agent System
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type LanguageCode = 'en' | 'hi';

export interface FarmerProfile {
  farmerName: string;
  location: string;
  crop: string;
  growthStage: string;
  soilType: string;
  irrigation: string;
  concern: string;
  language: LanguageCode;
}

export interface WeatherMetrics {
  region: string;
  forecast_summary: string;
  temp_max_c: number;
  temp_min_c: number;
  rain_prob_pct: number;
  expected_rainfall_mm: number;
  soil_moisture_index: string;
  primary_hazard: string;
  risk_level: RiskLevel;
}

export interface ClimateRiskResult {
  agent: string;
  status: string;
  risk_level: RiskLevel;
  primary_hazard: string;
  weather_metrics: WeatherMetrics;
  risk_summary: string;
  requires_urgent_escalation: boolean;
  safety_note: string;
}

export interface CropAdvisoryResult {
  agent: string;
  status: string;
  crop: string;
  growth_stage: string;
  critical_hazard: string;
  stage_impact: string;
  soil_consideration: string;
  irrigation_strategy: string;
  recommended_interventions: string[];
  scientific_uncertainty_disclaimer: string;
}

export interface ActionPlanResult {
  agent: string;
  status: string;
  immediate_action: string;
  today: string[];
  next_3_days: string[];
  this_week: string[];
  estimated_cost_tier: string;
  frugal_principle: string;
}

export interface LocalizedResult {
  language: LanguageCode;
  language_name: string;
  risk_badge: string;
  summary: string;
  immediate_action: string;
  action_plan: {
    today: string[];
    next_3_days: string[];
    this_week: string[];
  };
  disclaimer: string;
}

export interface AgentTraceStep {
  step: number;
  agent: string;
  action: string;
  tool_used?: string;
  details?: string;
  output_summary?: string;
  duration_ms: number;
  timestamp_ms: number;
}

export interface ConsultationResponse {
  orchestrator_version: string;
  status: 'SUCCESS' | 'ERROR';
  execution_duration_ms: number;
  farmer_profile: FarmerProfile;
  climate_risk: ClimateRiskResult;
  crop_advisory: CropAdvisoryResult;
  action_plan: ActionPlanResult;
  localized: LocalizedResult;
  traces: AgentTraceStep[];
  safety_boundary: {
    is_educational_prototype: boolean;
    disclaimer: string;
    emergency_helpline_india: string;
  };
}

export interface DemoScenario {
  id: string;
  name: string;
  name_hi: string;
  badge: string;
  location: string;
  crop: string;
  growthStage: string;
  soilType: string;
  irrigation: string;
  concern: string;
  query_en: string;
  query_hi: string;
  expectedRisk: RiskLevel;
  contextDescription: string;
  contextDescription_hi: string;
}
