"""
KrishiSaathi AI - Orchestrator Agent (Strands Agents SDK)
Main coordinator agent in the multi-agent hierarchy.
Dispatches queries, synthesizes specialist outputs, and enforces safety boundaries.
"""

import time
import json
from typing import Dict, Any, List

from agents.climate_agent import ClimateRiskAgent
from agents.crop_agent import CropAdvisoryAgent
from agents.action_plan_agent import ActionPlanAgent
from agents.language_agent import LanguageAgent

class OrchestratorAgent:
    """
    Core Strands Orchestrator:
    1. Interprets farmer profile and input concern.
    2. Identifies required specialist agents (Climate Risk, Crop Advisory, Action Plan, Language).
    3. Manages multi-agent execution pipeline with full trace logging.
    4. Aggregates and returns structured resilience payload.
    """
    
    NAME = "KrishiSaathiOrchestrator"
    
    def __init__(self, model_name: str = "amazon.titan-text-express-v1"):
        self.model_name = model_name
        self.climate_agent = ClimateRiskAgent(model_name=model_name)
        self.crop_agent = CropAdvisoryAgent(model_name=model_name)
        self.action_plan_agent = ActionPlanAgent(model_name=model_name)
        self.language_agent = LanguageAgent(model_name=model_name)

    def process_consultation(self, profile: Dict[str, Any], query: str = "") -> Dict[str, Any]:
        """
        Coordinates execution across all specialist agents, compiling trace metrics.
        """
        start_time = time.time()
        traces: List[Dict[str, Any]] = []
        
        location = profile.get("location", "Indore, Madhya Pradesh")
        crop = profile.get("crop", "Soybean")
        growth_stage = profile.get("growth_stage", "Flowering")
        soil_type = profile.get("soil_type", "Black cotton soil")
        irrigation = profile.get("irrigation", "Limited")
        concern = profile.get("concern", "Heavy rainfall")
        language = profile.get("language", "hi")
        farmer_name = profile.get("farmer_name", "Kisan")

        # Step 0: Orchestrator Intent Classification
        step0_start = time.time()
        intent_summary = f"Routing consultation for {crop} ({growth_stage}) in {location} regarding concern '{concern}'."
        traces.append({
            "step": 1,
            "agent": self.NAME,
            "action": "INTENT_ANALYSIS_AND_DISPATCH",
            "details": intent_summary,
            "timestamp_ms": int((time.time() - start_time) * 1000)
        })

        # Step 1: Climate Risk Agent
        c_start = time.time()
        climate_result = self.climate_agent.analyze(location, concern, query)
        traces.append({
            "step": 2,
            "agent": self.climate_agent.NAME,
            "action": "WEATHER_AND_HAZARD_EVALUATION",
            "tool_used": "get_climate_risk_data",
            "output_summary": f"Identified {climate_result.get('risk_level')} risk for {climate_result.get('primary_hazard')}.",
            "duration_ms": int((time.time() - c_start) * 1000)
        })

        # Step 2: Crop Advisory Agent
        crop_start = time.time()
        crop_result = self.crop_agent.formulate_advisory(
            crop=crop,
            growth_stage=growth_stage,
            soil_type=soil_type,
            irrigation=irrigation,
            climate_risk=climate_result
        )
        traces.append({
            "step": 3,
            "agent": self.crop_agent.NAME,
            "action": "PHYSIOLOGICAL_STAGE_VULNERABILITY_ASSESSMENT",
            "tool_used": "get_crop_vulnerability",
            "output_summary": f"Formulated {len(crop_result.get('recommended_interventions', []))} agronomic interventions for {crop}.",
            "duration_ms": int((time.time() - crop_start) * 1000)
        })

        # Step 3: Action Plan Agent
        plan_start = time.time()
        action_plan_result = self.action_plan_agent.generate_plan(
            crop=crop,
            growth_stage=growth_stage,
            climate_risk=climate_result,
            crop_advisory=crop_result
        )
        traces.append({
            "step": 4,
            "agent": self.action_plan_agent.NAME,
            "action": "TEMPORAL_TASK_SCHEDULING",
            "output_summary": "Generated TODAY, NEXT 3 DAYS, and THIS WEEK action matrices with frugal smallholder budget focus.",
            "duration_ms": int((time.time() - plan_start) * 1000)
        })

        # Step 4: Language Specialist Agent
        lang_start = time.time()
        localized_result = self.language_agent.format_response(
            language=language,
            farmer_name=farmer_name,
            crop=crop,
            growth_stage=growth_stage,
            climate_risk=climate_result,
            crop_advisory=crop_result,
            action_plan=action_plan_result
        )
        traces.append({
            "step": 5,
            "agent": self.language_agent.NAME,
            "action": "LOCALIZED_NATURAL_TRANSLATION",
            "output_summary": f"Localized output into {localized_result.get('language_name')}.",
            "duration_ms": int((time.time() - lang_start) * 1000)
        })

        total_duration = int((time.time() - start_time) * 1000)

        return {
            "orchestrator_version": "1.0.0-strands-aws",
            "status": "SUCCESS",
            "execution_duration_ms": total_duration,
            "farmer_profile": profile,
            "climate_risk": climate_result,
            "crop_advisory": crop_result,
            "action_plan": action_plan_result,
            "localized": localized_result,
            "traces": traces,
            "safety_boundary": {
                "is_educational_prototype": True,
                "disclaimer": localized_result.get("disclaimer"),
                "emergency_helpline_india": "Kisan Call Center (Toll-Free 1800-180-1551)"
            }
        }

if __name__ == "__main__":
    # Test CLI invocation for Hackathon Demo
    print("--- Running KrishiSaathi AI Strands Multi-Agent Orchestrator Demo ---")
    orchestrator = OrchestratorAgent()
    demo_profile = {
        "location": "Indore, Madhya Pradesh",
        "crop": "Soybean",
        "growth_stage": "Flowering",
        "soil_type": "Black cotton soil",
        "irrigation": "Limited",
        "concern": "Heavy rainfall",
        "language": "hi",
        "farmer_name": "Ramesh Kumar"
    }
    result = orchestrator.process_consultation(demo_profile, "Heavy rain se pehle kya preparation karu?")
    print(json.dumps(result, indent=2, ensure_ascii=False))
