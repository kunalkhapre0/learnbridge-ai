"""
KrishiSaathi AI - Climate Risk Agent (Strands Agents SDK)
Specialist Agent responsible for evaluating atmospheric and soil hazards.
"""

from typing import Dict, Any
from agents.tools import get_climate_risk_data

class ClimateRiskAgent:
    """
    Strands Specialist Agent: Analyzes heatwave, heavy rain, drought, and flood threats.
    Categorizes threat severity into LOW, MEDIUM, HIGH, or CRITICAL.
    """
    
    NAME = "ClimateRiskSpecialist"
    DESCRIPTION = "Evaluates meteorological hazards, precipitation probabilities, and extreme temperature thresholds."
    
    def __init__(self, model_name: str = "amazon.titan-text-express-v1"):
        self.model_name = model_name
        self.system_prompt = (
            "You are an agro-meteorology specialist agent for smallholder farmers. "
            "Analyze weather hazards objectively. Always assign a definitive risk level: "
            "LOW, MEDIUM, HIGH, or CRITICAL. Never invent live satellite data; explicitly "
            "disclose data assumptions and advise checking local weather bulletins."
        )

    def analyze(self, location: str, concern: str, farmer_query: str = "") -> Dict[str, Any]:
        """
        Executes climate risk analysis using the registered weather risk tool.
        """
        # Call Strands Tool
        weather_data = get_climate_risk_data(location, concern)
        
        risk_level = weather_data.get("risk_level", "MEDIUM")
        temp_max = weather_data.get("temp_max_c", 32)
        rainfall_mm = weather_data.get("expected_rainfall_mm", 0)
        hazard = weather_data.get("primary_hazard", "Weather Fluctuation")
        
        # Build synthesis
        risk_summary = (
            f"Risk Level evaluated as {risk_level}. Anticipated hazard: {hazard}. "
            f"Forecast points to {temp_max}°C daytime peak and {rainfall_mm}mm estimated precipitation. "
            f"Soil moisture state: {weather_data.get('soil_moisture_index')}."
        )
        
        return {
            "agent": self.NAME,
            "status": "COMPLETED",
            "risk_level": risk_level,
            "primary_hazard": hazard,
            "weather_metrics": weather_data,
            "risk_summary": risk_summary,
            "requires_urgent_escalation": risk_level in ["HIGH", "CRITICAL"],
            "safety_note": "Calibrated agro-meteorological advisory. Consult IMD / local KVK for cyclone/flood emergency declarations."
        }
