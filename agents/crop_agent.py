"""
KrishiSaathi AI - Crop Advisory Agent (Strands Agents SDK)
Specialist Agent responsible for crop physiological health and low-cost protection.
"""

from typing import Dict, Any, List
from agents.tools import get_crop_vulnerability

class CropAdvisoryAgent:
    """
    Strands Specialist Agent: Evaluates crop vulnerability at given growth stage
    and formulates agronomic countermeasures tailored for resource-constrained farmers.
    """
    
    NAME = "CropAdvisorySpecialist"
    DESCRIPTION = "Evaluates plant physiological vulnerabilities and formulates affordable agronomic protection."
    
    def __init__(self, model_name: str = "amazon.titan-text-express-v1"):
        self.model_name = model_name
        self.system_prompt = (
            "You are a dedicated agronomy advisory agent for small and marginal farmers. "
            "Never suggest expensive synthetic chemicals when affordable biological or "
            "cultural practices (mulching, drainage, neem spray, furrow irrigation) suffice. "
            "Clearly distinguish between probable outcomes and empirical certainties."
        )

    def formulate_advisory(
        self,
        crop: str,
        growth_stage: str,
        soil_type: str,
        irrigation: str,
        climate_risk: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Synthesizes agronomic guidance based on crop vulnerability tool and climate risk findings.
        """
        # Call tool for physiological stage vulnerabilities
        vuln_data = get_crop_vulnerability(crop, growth_stage)
        risk_level = climate_risk.get("risk_level", "MEDIUM")
        hazard = climate_risk.get("primary_hazard", "Weather stress")
        
        # Grounded recommendations based on soil & irrigation constraints
        soil_adjustment = ""
        if "black" in soil_type.lower():
            soil_adjustment = "Black cotton soils have high clay retention; prioritize peripheral furrows to prevent root rot."
        elif "sandy" in soil_type.lower():
            soil_adjustment = "Sandy loam drains quickly but loses moisture rapidly; apply organic mulch to retain root moisture."
        else:
            soil_adjustment = f"For {soil_type or 'mixed'} soil, maintain crumb structure and avoid soil compaction during wet spells."

        recommendations: List[str] = list(vuln_data.get("frugal_interventions", []))
        
        # Add risk-level specific protective measure
        if risk_level in ["HIGH", "CRITICAL"]:
            recommendations.insert(0, f"URGENT: Clear all drain outlets immediately to avoid waterlogging damage to {crop} at {growth_stage} stage.")
        
        return {
            "agent": self.NAME,
            "status": "COMPLETED",
            "crop": crop,
            "growth_stage": growth_stage,
            "critical_hazard": vuln_data.get("critical_hazard"),
            "stage_impact": vuln_data.get("impact"),
            "soil_consideration": soil_adjustment,
            "irrigation_strategy": f"Current status is '{irrigation}'. Avoid heavy irrigation prior to predicted rain.",
            "recommended_interventions": recommendations,
            "scientific_uncertainty_disclaimer": "Agricultural responses depend on micro-topography and seed variety. Test foliar sprays on small sample rows first."
        }
