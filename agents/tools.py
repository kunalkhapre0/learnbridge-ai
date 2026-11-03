"""
KrishiSaathi AI - Tools Module for Strands Agents SDK
Climate resilience and agronomic tools for smallholder farmer advisory.
"""

from typing import Dict, Any, List
import json

def get_climate_risk_data(location: str, concern: str) -> Dict[str, Any]:
    """
    Mock/demo weather and climate hazard assessment tool.
    In production, connects to AWS Lambda fetching IMD / Open-Meteo / ECMWF APIs.
    NOTE: Transparently uses calibrated demo data for hackathon evaluation.
    """
    loc_lower = location.lower()
    
    # Regional baseline climates (India agro-climatic zones)
    weather_profiles = {
        "indore": {
            "region": "Malwa Plateau, Madhya Pradesh",
            "forecast_summary": "Intense convective rainfall cluster forecast in next 48 hours. 85-110mm expected.",
            "temp_max_c": 32.5,
            "temp_min_c": 22.0,
            "rain_prob_pct": 92,
            "expected_rainfall_mm": 95,
            "soil_moisture_index": "High (Saturation Risk)",
            "primary_hazard": "Heavy Rainfall / Waterlogging",
            "risk_level": "HIGH"
        },
        "wardha": {
            "region": "Vidarbha, Maharashtra",
            "forecast_summary": "Severe dry spell with heat index reaching 42.8°C. Consecutive 9 rainless days.",
            "temp_max_c": 42.8,
            "temp_min_c": 27.5,
            "rain_prob_pct": 8,
            "expected_rainfall_mm": 0,
            "soil_moisture_index": "Severely Deficit",
            "primary_hazard": "Heat Wave / Drought Stress",
            "risk_level": "CRITICAL"
        },
        "ludhiana": {
            "region": "Central Plain, Punjab",
            "forecast_summary": "Unseasonal squall and localized hailstorm risk accompanied by 35 km/h gusts.",
            "temp_max_c": 28.0,
            "temp_min_c": 16.0,
            "rain_prob_pct": 65,
            "expected_rainfall_mm": 35,
            "soil_moisture_index": "Moderate",
            "primary_hazard": "Unseasonal Rain & Hail Risk",
            "risk_level": "MEDIUM"
        },
        "muzaffarpur": {
            "region": "North Bihar Alluvial Plains",
            "forecast_summary": "Prolonged dry hiatus following delayed monsoon. Atmospheric moisture deficit.",
            "temp_max_c": 38.5,
            "temp_min_c": 25.5,
            "rain_prob_pct": 20,
            "expected_rainfall_mm": 5,
            "soil_moisture_index": "Low / Depleted",
            "primary_hazard": "Dry Spell / Seedling Desiccation",
            "risk_level": "HIGH"
        }
    }
    
    # Matching or default calibrated profile
    for key, data in weather_profiles.items():
        if key in loc_lower:
            return data
            
    # Fallback contextual assessment based on user's stated concern
    concern_lower = concern.lower()
    if "rain" in concern_lower or "flood" in concern_lower:
        return {
            "region": location,
            "forecast_summary": f"Substantial precipitation event anticipated over {location} within 36-48 hours.",
            "temp_max_c": 31.0,
            "temp_min_c": 23.5,
            "rain_prob_pct": 80,
            "expected_rainfall_mm": 70,
            "soil_moisture_index": "Elevated",
            "primary_hazard": "Heavy Rainfall / Waterlogging",
            "risk_level": "HIGH"
        }
    elif "heat" in concern_lower or "drought" in concern_lower:
        return {
            "region": location,
            "forecast_summary": f"Sustained elevated temperatures exceeding 4°C above seasonal normal in {location}.",
            "temp_max_c": 41.5,
            "temp_min_c": 26.0,
            "rain_prob_pct": 12,
            "expected_rainfall_mm": 0,
            "soil_moisture_index": "Deficit",
            "primary_hazard": "Heat Wave Stress",
            "risk_level": "CRITICAL" if "extreme" in concern_lower else "HIGH"
        }
    else:
        return {
            "region": location,
            "forecast_summary": f"Mild weather fluctuations forecast in {location}. Isolated showers possible.",
            "temp_max_c": 33.0,
            "temp_min_c": 21.0,
            "rain_prob_pct": 40,
            "expected_rainfall_mm": 18,
            "soil_moisture_index": "Normal",
            "primary_hazard": "Moderate Weather Variability",
            "risk_level": "LOW"
        }


def get_crop_vulnerability(crop: str, growth_stage: str) -> Dict[str, Any]:
    """
    Agronomic knowledge tool for crop physiological vulnerabilities at specific stages.
    Grounded in ICAR (Indian Council of Agricultural Research) agronomy guidelines.
    """
    crop_lower = crop.lower()
    stage_lower = growth_stage.lower()
    
    vulnerabilities = {
        "soybean": {
            "flowering": {
                "critical_hazard": "Waterlogging & Heat > 36°C",
                "impact": "Excess water causes flower drop and nodule hypoxia; heat stress leads to floral abortion.",
                "frugal_interventions": [
                    "Open surface drainage furrows (broad-bed furrow practice) to evacuate standing water within 12 hours.",
                    "Spray 1% Potassium Nitrate (KNO3) if heat spike occurs to preserve floral turgor.",
                    "Halt nitrogen fertilization during heavy rain to prevent nutrient leaching."
                ]
            },
            "vegetative": {
                "critical_hazard": "Drought & Leaf miner",
                "impact": "Stunted shoot elongation and decreased leaf area index.",
                "frugal_interventions": [
                    "Inter-cultivation with dora/hoe to create soil dust mulch and break capillaries.",
                    "Apply straw or farm biomass mulch between rows to conserve moisture."
                ]
            }
        },
        "cotton": {
            "flowering": {
                "critical_hazard": "Square/Boll shedding due to heat or water stagnation",
                "impact": "Shifts harvest cycle and degrades staple length.",
                "frugal_interventions": [
                    "Ensure immediate drainage at field corners.",
                    "Foliar spray of 2% DAP or Urea + MgSO4 (1%) post-rain to revive root vigor.",
                    "Erect yellow sticky traps for sucking pests arriving after rain."
                ]
            },
            "vegetative": {
                "critical_hazard": "Sucking pest resurgence & heat stress",
                "impact": "Leaf curling and stunted seedling growth.",
                "frugal_interventions": [
                    "Spray 5% Neem Seed Kernel Extract (NSKE) as low-cost natural protective barrier.",
                    "Provide light alternate furrow irrigation during late evening hours."
                ]
            }
        },
        "wheat": {
            "grain filling": {
                "critical_hazard": "Terminal heat shock (> 30°C) & unseasonal squall/lodging",
                "impact": "Forced maturity leading to shriveled grains and 20-30% yield penalty.",
                "frugal_interventions": [
                    "Light evening sprinkler or furrow irrigation to lower microclimate temperature by 2-3°C.",
                    "Spray 0.5% Zinc Sulphate + 2% Urea to promote grain weight.",
                    "Avoid flood irrigation if wind speed exceeds 20 km/h to prevent lodging."
                ]
            }
        },
        "rice": {
            "flowering": {
                "critical_hazard": "Pollen sterility from heat (> 35°C) or prolonged submergence (> 4 days)",
                "impact": "High chaffy grain percentage.",
                "frugal_interventions": [
                    "Maintain 3-5 cm standing water layer to buffer ambient thermal swings.",
                    "Drain excess flood water rapidly as soon as regional river levels recede."
                ]
            }
        }
    }
    
    # Try exact match or provide generalized agronomic rule
    for c_key, stages in vulnerabilities.items():
        if c_key in crop_lower:
            for s_key, data in stages.items():
                if s_key in stage_lower:
                    return data
            # Return first available stage info for that crop
            first_key = list(stages.keys())[0]
            return stages[first_key]
            
    # Generic agronomic advisory for uncatalogued crops
    return {
        "critical_hazard": "Extreme soil moisture fluctuation & temperature extremes",
        "impact": "Root hypoxia during waterlogging; stomatal closure during thermal spikes.",
        "frugal_interventions": [
            "Ensure peripheral drainage ditches are free of weed debris.",
            "Apply low-cost organic mulch from previous crop stubble to protect topsoil.",
            "Monitor plants daily at 7 AM and 4 PM for early wilting or foliar spotting."
        ]
    }
