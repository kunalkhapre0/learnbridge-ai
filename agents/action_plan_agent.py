"""
KrishiSaathi AI - Action Plan Agent (Strands Agents SDK)
Specialist Agent responsible for converting advisory insights into a time-bound, frugal action plan.
"""

from typing import Dict, Any, List

class ActionPlanAgent:
    """
    Strands Specialist Agent: Organizes multi-agent findings into a 3-horizon action plan:
    1. TODAY (Immediate emergency or prep work)
    2. NEXT 3 DAYS (Preventative maintenance and foliar care)
    3. THIS WEEK (Field monitoring, recovery, and documentation)
    Focuses strictly on low-cost/zero-budget natural farming solutions.
    """
    
    NAME = "ActionPlanSpecialist"
    DESCRIPTION = "Converts risk evaluations into chronological, low-cost operational tasks for the farmer."
    
    def __init__(self, model_name: str = "amazon.titan-text-express-v1"):
        self.model_name = model_name

    def generate_plan(
        self,
        crop: str,
        growth_stage: str,
        climate_risk: Dict[str, Any],
        crop_advisory: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Structures tasks into TODAY, NEXT 3 DAYS, and THIS WEEK.
        """
        risk_level = climate_risk.get("risk_level", "MEDIUM")
        hazard = climate_risk.get("primary_hazard", "")
        interventions = crop_advisory.get("recommended_interventions", [])
        
        # Immediate / Today
        today_tasks: List[str] = []
        if risk_level in ["HIGH", "CRITICAL"]:
            today_tasks.append("Dig or clear field drainage trenches (30 cm depth) at the lowest corner of the plot.")
            today_tasks.append(f"Suspend chemical pesticide and nitrogen (Urea) application on {crop}; rain will leach inputs.")
            today_tasks.append("Anchor or move stored harvested produce to an elevated, tarpaulin-covered platform.")
        elif "heat" in hazard.lower():
            today_tasks.append("Apply a 2-3 inch layer of dry leaves or crop residue mulch to conserve root moisture.")
            today_tasks.append("Inspect drip lines or schedule early morning irrigation before 8:00 AM.")
        else:
            today_tasks.append(f"Scout field perimeter for weed buildup and check {crop} root zone moisture.")
            today_tasks.append("Clean spray equipment and procure neem seed kernel extract for organic pest resistance.")

        # Next 3 Days
        next_3_days_tasks: List[str] = []
        if "rain" in hazard.lower():
            next_3_days_tasks.append("Monitor standing water; ensure stagnation does not exceed 24 hours to prevent root rot.")
            next_3_days_tasks.append(f"Once topsoil is semi-dry, apply 1% potassium foliar spray to bolster {crop} cell wall strength.")
            next_3_days_tasks.append("Inspect for early symptoms of fungal collar rot or anthracnose post-precipitation.")
        elif "heat" in hazard.lower():
            next_3_days_tasks.append("Provide alternate-furrow light watering during dusk to minimize thermal evaporation.")
            next_3_days_tasks.append("Avoid intercultural hoeing which exposes moist subsurface soil to scorching sunlight.")
        else:
            next_3_days_tasks.append(f"Review {growth_stage} stage milestones and check for insect egg masses under leaves.")
            next_3_days_tasks.append("Maintain soil aeration through shallow surface scratching once soil workable.")

        # This Week
        this_week_tasks: List[str] = [
            f"Record weather impact photographs on your mobile phone for Pradhan Mantri Fasal Bima Yojana (PMFBY) insurance claim documentation if crop damage occurred.",
            f"Consult the nearest Krishi Vigyan Kendra (KVK) or Gram Sevak if yellowing appears on {crop} leaves.",
            "Re-assess field moisture capacity before scheduling the next irrigation cycle."
        ]

        # Estimated cost for smallholder
        cost_estimate = "₹0 - ₹250 / acre (Utilizes farm-sourced crop residue, manual trenching, and low-cost bio-extracts)"

        return {
            "agent": self.NAME,
            "status": "COMPLETED",
            "immediate_action": today_tasks[0] if today_tasks else "Inspect field drainage.",
            "today": today_tasks,
            "next_3_days": next_3_days_tasks,
            "this_week": this_week_tasks,
            "estimated_cost_tier": cost_estimate,
            "frugal_principle": "Zero-waste, farm-sourced resilience prioritizing labor and natural barriers over retail chemicals."
        }
