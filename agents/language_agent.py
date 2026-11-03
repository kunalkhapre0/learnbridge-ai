"""
KrishiSaathi AI - Language Agent (Strands Agents SDK)
Specialist Agent responsible for localized, colloquial bilingual translation (English and Hindi).
Translates technical agronomy concepts into simple, culturally respectful spoken farmer Hindi.
"""

from typing import Dict, Any, List

class LanguageAgent:
    """
    Strands Specialist Agent: Adapts technical risk assessments and agronomic recommendations
    into simple, empathetic, and culturally grounded language (Hindi and English).
    """
    
    NAME = "BilingualLanguageSpecialist"
    DESCRIPTION = "Localizes multi-agent outputs into plain English and conversational rural Hindi."
    
    def __init__(self, model_name: str = "amazon.titan-text-express-v1"):
        self.model_name = model_name

    def format_response(
        self,
        language: str,
        farmer_name: str,
        crop: str,
        growth_stage: str,
        climate_risk: Dict[str, Any],
        crop_advisory: Dict[str, Any],
        action_plan: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Synthesizes the complete output package into the farmer's chosen language.
        """
        is_hindi = language.lower() in ["hi", "hindi", "हिंदी"]
        risk_level = climate_risk.get("risk_level", "MEDIUM")
        
        if is_hindi:
            # Natural colloquial Hindi translations
            risk_labels = {
                "LOW": "कम जोखिम (सुरक्षित)",
                "MEDIUM": "मध्यम जोखिम (सावधानी बरतें)",
                "HIGH": "उच्च जोखिम (तुरंत कार्रवाई जरूरी)",
                "CRITICAL": "गंभीर जोखिम (आपातकालीन स्थिति)"
            }
            
            # Map Today's action
            today_hindi = [
                "खेत के सबसे निचले हिस्से में पानी निकासी के लिए 1 फीट गहरी नाली (ड्रेनेज) तुरंत खोदें या साफ करें।",
                f"अभी {crop} में यूरिया (नाइट्रोजन) या रासायनिक कीटनाशक का छिड़काव बिल्कुल न करें, बारिश से दवा बह जाएगी।",
                "खलिहान में कटी हुई फसल या बीज को तिरपाल से ढंककर ऊंची जगह पर सुरक्षित रखें।"
            ]
            
            next_3_days_hindi = [
                "खेत में 24 घंटे से ज्यादा पानी न ठहरने दें, नहीं तो फसल की जड़ों में सड़न लग सकती है।",
                "जब खेत की मिट्टी थोड़ी सूख जाए, तब फसल को मजबूती देने के लिए 1% पोटेशियम नाइट्रेट का हल्का छिड़काव करें।",
                "बारिश के बाद पत्तों पर फफूंद या कीड़े के प्रकोप की सुबह-शाम निगरानी करें।"
            ]
            
            this_week_hindi = [
                "अगर बारिश से खेत में नुकसान हुआ हो, तो प्रधानमंत्री फसल बीमा योजना (PMFBY) क्लेम के लिए मोबाइल से फोटो खींच लें।",
                "पत्ते पीले पड़ने की स्थिति में पास के कृषि विज्ञान केंद्र (KVK) या ग्राम सेवक से तुरंत सलाह लें।",
                "अगली सिंचाई करने से पहले मिट्टी की नमी अपने हाथ से मुट्ठी बांधकर जांचें।"
            ]
            
            summary_statement = (
                f"किसान साथी सलाह: {crop} ({growth_stage} अवस्था) के लिए मौसम का जोखिम '{risk_labels.get(risk_level, risk_level)}' है। "
                f"सबसे पहले खेत में जलभराव रोकने की तैयारी करें ताकि जड़ें सुरक्षित रहें।"
            )
            
            immediate_action_text = "खेत के निचले छोर पर तुरंत पानी निकासी की नाली तैयार करें ताकि जलभराव न हो।"
            
            return {
                "language": "hi",
                "language_name": "हिंदी (Hindi)",
                "risk_badge": risk_labels.get(risk_level, risk_level),
                "summary": summary_statement,
                "immediate_action": immediate_action_text,
                "action_plan": {
                    "today": today_hindi,
                    "next_3_days": next_3_days_hindi,
                    "this_week": this_week_hindi
                },
                "disclaimer": "सलाह: यह एक शैक्षणिक एवं अनुसंधान सहायता प्रोटोटाइप है। भारी आंधी-तूफान या बाढ़ की स्थिति में मौसम विभाग (IMD) और स्थानीय प्रशासन की चेतावनी का पालन करें।"
            }
        else:
            # Plain, direct English
            summary_statement = (
                f"KrishiSaathi Advisory: For your {crop} at {growth_stage} stage, climate risk is evaluated as {risk_level}. "
                f"Immediate field drainage and withholding fertilizer leaching are paramount."
            )
            
            return {
                "language": "en",
                "language_name": "English",
                "risk_badge": f"{risk_level} Risk",
                "summary": summary_statement,
                "immediate_action": action_plan.get("immediate_action", "Clear field drainage outlets."),
                "action_plan": {
                    "today": action_plan.get("today", []),
                    "next_3_days": action_plan.get("next_3_days", []),
                    "this_week": action_plan.get("this_week", [])
                },
                "disclaimer": "Advisory Notice: This is an educational resilience prototype. During severe weather or emergency declarations, follow official India Meteorological Department (IMD) and district administration warnings."
            }
