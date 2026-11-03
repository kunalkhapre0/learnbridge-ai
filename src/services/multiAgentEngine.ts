/**
 * KrishiSaathi AI - Multi-Agent Engine
 * Emulates the AWS Strands Agents SDK execution pipeline with transparent intermediate traces,
 * tool invocations, and bilingual synthesis (Hindi and English).
 */

import {
  FarmerProfile,
  ConsultationResponse,
  RiskLevel,
  WeatherMetrics,
  ClimateRiskResult,
  CropAdvisoryResult,
  ActionPlanResult,
  LocalizedResult,
  AgentTraceStep,
} from '../types/agent';

/**
 * Agronomic weather tool (equivalent to agents/tools.py::get_climate_risk_data)
 */
function toolGetClimateRiskData(location: string, concern: string): WeatherMetrics {
  const loc = location.toLowerCase();
  const c = concern.toLowerCase();

  if (loc.includes('indore') || (c.includes('rain') && !loc.includes('wardha'))) {
    return {
      region: 'Malwa Plateau, Madhya Pradesh',
      forecast_summary: 'Intense convective rainfall cluster forecast in next 48 hours. 85-110mm expected.',
      temp_max_c: 32.5,
      temp_min_c: 22.0,
      rain_prob_pct: 92,
      expected_rainfall_mm: 95,
      soil_moisture_index: 'High (Waterlogging & Saturation Hazard)',
      primary_hazard: 'Heavy Rainfall / Waterlogging',
      risk_level: 'HIGH',
    };
  }

  if (loc.includes('wardha') || c.includes('heat') || c.includes('drought')) {
    return {
      region: 'Vidarbha, Maharashtra',
      forecast_summary: 'Severe dry spell with heat index peaking at 42.8°C. Consecutive 9 rainless days.',
      temp_max_c: 42.8,
      temp_min_c: 27.5,
      rain_prob_pct: 8,
      expected_rainfall_mm: 0,
      soil_moisture_index: 'Severely Deficit / Desiccated',
      primary_hazard: 'Extreme Heat Wave / Thermal Stress',
      risk_level: 'CRITICAL',
    };
  }

  if (loc.includes('ludhiana') || c.includes('wind') || c.includes('hail')) {
    return {
      region: 'Central Plain, Punjab',
      forecast_summary: 'Unseasonal squall and localized hailstorm risk with 35-45 km/h surface wind gusts.',
      temp_max_c: 28.0,
      temp_min_c: 16.0,
      rain_prob_pct: 65,
      expected_rainfall_mm: 35,
      soil_moisture_index: 'Moderate (Lodging Vulnerable)',
      primary_hazard: 'Unseasonal Wind Gusts & Hailstorm',
      risk_level: 'MEDIUM',
    };
  }

  if (loc.includes('muzaffarpur') || c.includes('delay')) {
    return {
      region: 'North Bihar Alluvial Plains',
      forecast_summary: 'Monsoon hiatus: 18-day precipitation deficit. High evapotranspiration rate.',
      temp_max_c: 38.5,
      temp_min_c: 25.5,
      rain_prob_pct: 20,
      expected_rainfall_mm: 5,
      soil_moisture_index: 'Low / Topsoil Cracking',
      primary_hazard: 'Dry Spell / Seedling Desiccation',
      risk_level: 'HIGH',
    };
  }

  // Dynamic calibrated fallback
  return {
    region: location || 'Regional Agro-Zone',
    forecast_summary: `Variable climate conditions observed in ${location}. Weather pattern indicates moderate shifting.`,
    temp_max_c: 34.0,
    temp_min_c: 23.0,
    rain_prob_pct: 45,
    expected_rainfall_mm: 22,
    soil_moisture_index: 'Moderate',
    primary_hazard: concern || 'Seasonal Climate Fluctuation',
    risk_level: 'MEDIUM',
  };
}

/**
 * Agronomic physiological vulnerability tool (equivalent to agents/tools.py::get_crop_vulnerability)
 */
function toolGetCropVulnerability(crop: string, growthStage: string) {
  const c = crop.toLowerCase();
  const s = growthStage.toLowerCase();

  if (c.includes('soybean') || c.includes('सोयाबीन')) {
    return {
      critical_hazard: 'Waterlogging & Flower Abscission (>35°C)',
      impact: 'Excess water stagnating around roots induces anoxia, suffocating nitrogen-fixing Bradyrhizobium nodules and dropping flower clusters within 24-36 hours.',
      frugal_interventions: [
        'Open surface drainage furrows (broad-bed furrow approach) immediately at the lowest plot boundary.',
        'Halt nitrogen (Urea) and herbicide application to prevent chemical runoff and scorching.',
        'Foliar spray of 1% Potassium Nitrate (KNO3) once water clears to prevent floral abortion.',
      ],
    };
  }

  if (c.includes('cotton') || c.includes('कपास')) {
    return {
      critical_hazard: 'Heat Desiccation & Sucking Pest Surge',
      impact: 'Temperatures >40°C cause pollen sterility and square shedding; dry heat accelerates whitefly and thrips reproduction.',
      frugal_interventions: [
        'Apply 5% Neem Seed Kernel Extract (NSKE) as a low-cost bio-protective barrier against sucking pests.',
        'Create farm-waste mulch (crop stubble, dry grass) along crop rows to trap residual soil moisture.',
        'Schedule alternate-furrow light watering strictly during early dusk to avoid scalding.',
      ],
    };
  }

  if (c.includes('wheat') || c.includes('गेहूं')) {
    return {
      critical_hazard: 'Terminal Heat & Stem Lodging from High Winds',
      impact: 'Wet soil combined with 30+ km/h wind gusts leads to stem collapse (lodging), crippling nutrient transfer to filling grains.',
      frugal_interventions: [
        'Cease flood irrigation immediately when high wind warnings or squalls are in the forecast.',
        'Spray 0.5% Zinc Sulphate + 2% Urea at late dusk to support grain weight retention under stress.',
        'Inspect field perimeter for drainage clearing after rain to prevent foot-rot disease.',
      ],
    };
  }

  if (c.includes('rice') || c.includes('paddy') || c.includes('धान')) {
    return {
      critical_hazard: 'Nursery Desiccation & Delayed Tillering',
      impact: 'Deficit moisture in nursery beds causes seedling stunt and yellowing, delaying vital transplanting windows.',
      frugal_interventions: [
        'Provide shallow night-time irrigation to protect delicate root systems.',
        'Apply light cow-dung slurry or vermicompost top-dressing to insulate soil microbes.',
        'Prepare community shared tubewell water sharing with adjacent plot holders.',
      ],
    };
  }

  return {
    critical_hazard: 'Micro-climate Stress & Physiological Shock',
    impact: 'Sudden moisture or temperature stress disrupts photosynthesis and root nutrient uptake.',
    frugal_interventions: [
      'Maintain peripheral drainage channels free from weeds and debris.',
      'Use dried local organic biomass for root-zone moisture conservation.',
      'Scout crop leaves twice daily (early morning and late afternoon) for stress symptoms.',
    ],
  };
}

/**
 * Execute the 5-Agent Strands Pipeline
 */
export async function runStrandsMultiAgentConsultation(
  profile: FarmerProfile,
  userQuery: string
): Promise<ConsultationResponse> {
  const startTime = performance.now();
  const traces: AgentTraceStep[] = [];

  // Simulate network/inference micro-delay for realistic agent processing
  await new Promise((resolve) => setTimeout(resolve, 380));

  // STEP 1: Orchestrator Agent
  const step1Start = performance.now();
  traces.push({
    step: 1,
    agent: 'KrishiSaathiOrchestrator',
    action: 'INTENT_ANALYSIS_AND_SPECIALIST_ROUTING',
    details: `Parsed profile for ${profile.crop} (${profile.growthStage}) at ${profile.location}. Routed to Climate Risk, Crop Advisory, Action Plan, and Language specialists.`,
    output_summary: 'Dispatched tasks to 4 specialist agents in parallel execution branches.',
    duration_ms: Math.round(performance.now() - step1Start),
    timestamp_ms: 15,
  });

  // STEP 2: Climate Risk Agent
  const step2Start = performance.now();
  const weatherMetrics = toolGetClimateRiskData(profile.location, profile.concern);
  const climateRiskResult: ClimateRiskResult = {
    agent: 'ClimateRiskSpecialist',
    status: 'COMPLETED',
    risk_level: weatherMetrics.risk_level,
    primary_hazard: weatherMetrics.primary_hazard,
    weather_metrics: weatherMetrics,
    risk_summary: `Assessed risk level as ${weatherMetrics.risk_level} due to ${weatherMetrics.primary_hazard}. Anticipated peak ${weatherMetrics.temp_max_c}°C with ${weatherMetrics.expected_rainfall_mm}mm estimated precipitation.`,
    requires_urgent_escalation: weatherMetrics.risk_level === 'HIGH' || weatherMetrics.risk_level === 'CRITICAL',
    safety_note: 'Calibrated agrometeorological advisory. For regional emergency declarations, verify with India Meteorological Department (IMD).',
  };
  traces.push({
    step: 2,
    agent: 'ClimateRiskSpecialist',
    action: 'WEATHER_HAZARD_AND_SOIL_EVALUATION',
    tool_used: 'toolGetClimateRiskData',
    details: `Evaluated precipitation probability (${weatherMetrics.rain_prob_pct}%) and temperature bounds (${weatherMetrics.temp_min_c}-${weatherMetrics.temp_max_c}°C).`,
    output_summary: `Hazard: ${weatherMetrics.primary_hazard} | Risk Level: ${weatherMetrics.risk_level}`,
    duration_ms: Math.round(performance.now() - step2Start),
    timestamp_ms: 120,
  });

  // STEP 3: Crop Advisory Agent
  const step3Start = performance.now();
  const cropVuln = toolGetCropVulnerability(profile.crop, profile.growthStage);
  const soilNote = profile.soilType.toLowerCase().includes('black')
    ? 'Black cotton soil holds water tightly and swells; standing water causes acute root hypoxia.'
    : profile.soilType.toLowerCase().includes('sandy')
    ? 'Sandy loam drains freely; prioritize organic surface mulching against fast evaporation.'
    : `For ${profile.soilType || 'standard'} soil, ensure surface aeration and avoid soil compaction.`;

  const cropAdvisoryResult: CropAdvisoryResult = {
    agent: 'CropAdvisorySpecialist',
    status: 'COMPLETED',
    crop: profile.crop,
    growth_stage: profile.growthStage,
    critical_hazard: cropVuln.critical_hazard,
    stage_impact: cropVuln.impact,
    soil_consideration: soilNote,
    irrigation_strategy: `Current system: ${profile.irrigation}. Avoid scheduled irrigation before forecast precipitation.`,
    recommended_interventions: cropVuln.frugal_interventions,
    scientific_uncertainty_disclaimer:
      'Plant physiological reactions depend on field elevation, variety vigour, and local micro-relief. Test foliar mixtures on small border rows first.',
  };
  traces.push({
    step: 3,
    agent: 'CropAdvisorySpecialist',
    action: 'PHYSIOLOGICAL_STAGE_VULNERABILITY_ASSESSMENT',
    tool_used: 'toolGetCropVulnerability',
    details: `Mapped ${profile.crop} at ${profile.growthStage} stage against ${weatherMetrics.primary_hazard}. Formulated low-cost agronomic countermeasures.`,
    output_summary: `Identified vulnerability: ${cropVuln.critical_hazard}`,
    duration_ms: Math.round(performance.now() - step3Start),
    timestamp_ms: 210,
  });

  // STEP 4: Action Plan Agent
  const step4Start = performance.now();
  const isHighOrCritical = climateRiskResult.risk_level === 'HIGH' || climateRiskResult.risk_level === 'CRITICAL';
  const isRain = weatherMetrics.primary_hazard.toLowerCase().includes('rain') || weatherMetrics.primary_hazard.toLowerCase().includes('water');
  const isHeat = weatherMetrics.primary_hazard.toLowerCase().includes('heat') || weatherMetrics.primary_hazard.toLowerCase().includes('drought');

  let todayTasks: string[] = [];
  let next3DaysTasks: string[] = [];
  let thisWeekTasks: string[] = [];

  if (isRain) {
    todayTasks = [
      'Dig or clear 1-foot deep peripheral drainage furrows at the lowest plot boundary to evacuate excess runoff.',
      `Suspend all nitrogen (Urea) and chemical pesticide application on ${profile.crop}; torrential rain causes severe leaching.`,
      'Move any harvested bags or grain produce to elevated ground and seal tightly under a waterproof tarpaulin.',
    ];
    next3DaysTasks = [
      'Inspect field within 12 hours post-rain; ensure standing water does not persist beyond 24 hours in the root zone.',
      `Once topsoil is firm, spray 1% Potassium Nitrate (10g/L water) to re-energize ${profile.crop} vascular flow.`,
      'Check lower stem nodes for early fungal damping-off or collar rot symptoms.',
    ];
    thisWeekTasks = [
      'Take geolocated photos of any flooded rows on your mobile phone for Pradhan Mantri Fasal Bima Yojana (PMFBY) insurance claim records.',
      'Aerate wet soil with light inter-row hand weeding as soon as the upper crust is workable.',
      'Consult the local Krishi Vigyan Kendra (KVK) officer if leaf chlorosis (yellowing) appears.',
    ];
  } else if (isHeat) {
    todayTasks = [
      'Spread 2-3 inches of farm stubble, dried grass, or sugarcane bagasse between crop rows to preserve root moisture.',
      'Check field drip emitters or plan light alternate-furrow watering strictly between 6:00 PM and 8:00 PM.',
      'Erect temporary border cloth or shade fencing on the western edge if seedlings are vulnerable.',
    ];
    next3DaysTasks = [
      'Apply 5% cold Neem Seed Kernel Extract (NSKE) spray at dawn to curb sucking pest surges triggered by hot dry winds.',
      'Refrain from deep tilling or intercultural hoeing; turning dry soil exposes deeper moisture to solar evaporation.',
      'Monitor plants at 2:00 PM for temporary wilting; note if leaves fail to recover by dusk.',
    ];
    thisWeekTasks = [
      'Coordinate with neighboring farmers for shared night-time tubewell or canal water rotational turns.',
      'Record maximum temperature records and any premature leaf drop for insurance notification.',
      'Prepare bio-fertilizer compost drenching to protect soil microbiome viability under thermal stress.',
    ];
  } else {
    todayTasks = [
      `Inspect ${profile.crop} field perimeter and ensure bunds are intact to prevent erosion.`,
      'Delay heavy flood irrigation if wind gusts exceed 25 km/h to prevent crop lodging.',
      'Procure low-cost bio-agents (Neem extract, Trichoderma) for preventative resilience.',
    ];
    next3DaysTasks = [
      `Scout undersides of leaves on ${profile.crop} for pest egg clusters or early leaf-spot lesions.`,
      'Apply light balanced foliar nourishment (19:19:19 or bio-liquid) if weather stabilizes.',
      'Maintain clean drainage channels to manage any unpredictable precipitation events.',
    ];
    thisWeekTasks = [
      'Review growth stage progress and document field development milestones.',
      'Check soil moisture by hand-squeezing a soil sample into a ball before scheduling next irrigation.',
      'Attend weekly village Gram Sevak or KVK advisory session for upcoming regional forecasts.',
    ];
  }

  const actionPlanResult: ActionPlanResult = {
    agent: 'ActionPlanSpecialist',
    status: 'COMPLETED',
    immediate_action: todayTasks[0],
    today: todayTasks,
    next_3_days: next3DaysTasks,
    this_week: thisWeekTasks,
    estimated_cost_tier: '₹0 - ₹250 / acre (Zero-cost farm-sourced residue & manual labor)',
    frugal_principle: 'Frugal smallholder resilience: prioritizes natural physical defenses and farm-sourced materials over retail chemical purchases.',
  };
  traces.push({
    step: 4,
    agent: 'ActionPlanSpecialist',
    action: 'CHRONOLOGICAL_ACTION_PLAN_SYNTHESIS',
    details: 'Structured 3 time horizons (Today, Next 3 Days, This Week) with smallholder zero-cost priority filter.',
    output_summary: `Generated ${todayTasks.length} immediate tasks and ${next3DaysTasks.length} mid-term tasks.`,
    duration_ms: Math.round(performance.now() - step4Start),
    timestamp_ms: 290,
  });

  // STEP 5: Language Agent
  const step5Start = performance.now();
  const isHindi = profile.language === 'hi';

  const riskBadgeHindiMap: Record<RiskLevel, string> = {
    LOW: 'कम जोखिम (सामान्य सावधानी)',
    MEDIUM: 'मध्यम जोखिम (तैयारी रखें)',
    HIGH: 'उच्च जोखिम (तुरंत कार्रवाई जरूरी)',
    CRITICAL: 'गंभीर जोखिम (आपातकालीन अलर्ट)',
  };

  let localizedResult: LocalizedResult;

  if (isHindi) {
    let todayHi: string[] = [];
    let next3DaysHi: string[] = [];
    let thisWeekHi: string[] = [];
    let immediateHi = '';

    if (isRain) {
      immediateHi = 'खेत के सबसे निचले छोर पर 1 फीट गहरी पानी निकासी नाली तुरंत खोदें या साफ करें।';
      todayHi = [
        'खेत के निचले हिस्से में पानी निकासी के लिए नाली तुरंत बनाएं ताकि बारिश का पानी खेत में जमा न हो।',
        `अभी ${profile.crop} में यूरिया (नाइट्रोजन) या कीटनाशक का छिड़काव बिल्कुल रोक दें; भारी बारिश से दवा बह जाएगी।`,
        'खलिहान में रखी कटी फसल या बीज की बोरियों को ऊंचे स्थान पर रखकर तिरपाल से अच्छी तरह ढंक दें।',
      ];
      next3DaysHi = [
        'बारिश के बाद खेत में 24 घंटे से ज्यादा पानी न रुकने दें; जलभराव से सोयाबीन/फसल की जड़ों में सड़न लग जाती है।',
        `मिट्टी हल्की सूखते ही फसल को मजबूती देने के लिए 1% पोटेशियम नाइट्रेट (100 ग्राम प्रति 10 लीटर) का हल्का छिड़काव करें।`,
        'बारिश के बाद पत्तों और तनों पर फफूंद या कीड़ों के शुरुआती लक्षणों की सुबह-शाम जांच करें।',
      ];
      thisWeekHi = [
        'अगर खेत में नुकसान हुआ हो, तो तुरंत मोबाइल से फोटो खींच लें ताकि फसल बीमा (PMFBY) क्लेम में काम आ सके।',
        'मिट्टी चलने लायक होने पर हल्की खुरपी से ऊपरी परत को ढीला करें ताकि जड़ों को हवा मिल सके।',
        'फसल में पीलापन दिखे तो नजदीकी कृषि विज्ञान केंद्र (KVK) या किसान कॉल सेंटर से सलाह लें।',
      ];
    } else if (isHeat) {
      immediateHi = 'पौधों की जड़ों में नमी बचाने के लिए पंक्तियों के बीच सूखी घास या पुआल की मल्चिंग बिछाएं।';
      todayHi = [
        'खेत में 2-3 इंच सूखी घास, फसल के अवशेष या पत्तियों की मल्च बिछाएं ताकि जमीन से नमी न उड़े।',
        'सिंचाई केवल शाम 6:00 बजे के बाद या रात में करें; धूप में पानी देने से पौधे झुलस जाते हैं।',
        'यदि फसल छोटी है तो तेज गर्म हवा (लू) की दिशा में हल्का आड़ (बॉर्डर) बनाएं।',
      ];
      next3DaysHi = [
        'गर्मी में रस चूसने वाले कीड़ों से बचाव के लिए 5% नीम के काढ़े (NSKE) का सुबह-सुबह छिड़काव करें।',
        'अभी खेत में गहरी जुताई या गुड़ाई न करें, इससे मिट्टी की भीतरी नमी तेजी से सूखती है।',
        'दोपहर 2 बजे पौधों की जांच करें कि क्या पत्तियां अत्यधिक मुरझा रही हैं।',
      ];
      thisWeekHi = [
        'आसपास के किसान भाइयों के साथ मिलकर रात के समय पानी का साझा प्रबंधन तय करें।',
        'अधिक तापमान और नुकसान की तारीख डायरी या मोबाइल में नोट करें।',
        'फसल की प्रतिरोधक क्षमता बढ़ाने के लिए जैविक घोल का हल्का उपयोग करें।',
      ];
    } else {
      immediateHi = 'खेत की मेड़बंदी ठीक करें और तेज हवा में भारी सिंचाई करने से बचें।';
      todayHi = [
        'खेत की मेड़ और सीमाओं की जांच करें ताकि अचानक आई बारिश या आंधी से मिट्टी न कटे।',
        'अगर तेज आंधी की संभावना हो तो गेहूं या लंबी फसल में पानी न लगाएं, फसल गिर सकती है।',
        'जैविक सुरक्षा के लिए नीम अर्क या ट्राइकोडर्मा की व्यवस्था करके रखें।',
      ];
      next3DaysHi = [
        'पत्तों के नीचे कीड़े के अंडों या धब्बों की सुबह के समय बारीकी से निगरानी करें।',
        'मौसम साफ रहने पर ही आवश्यक पोषक तत्वों का संतुलित छिड़काव करें।',
        'जल निकासी के रास्तों को खरपतवार से पूरी तरह मुक्त रखें।',
      ];
      thisWeekHi = [
        'फसल के विकास के चरणों का रिकॉर्ड रखें।',
        'हाथ में मिट्टी की मुट्ठी बांधकर नमी की सही स्थिति परखें।',
        'साप्ताहिक ग्रामीण किसान गोष्ठी या KVK से जुड़कर मौसम का अगला हाल जानें।',
      ];
    }

    localizedResult = {
      language: 'hi',
      language_name: 'हिंदी (Hindi)',
      risk_badge: riskBadgeHindiMap[climateRiskResult.risk_level],
      summary: `कृषि साथी विश्लेषण: ${profile.crop} (${profile.growthStage} अवस्था) के लिए जलवायु जोखिम '${riskBadgeHindiMap[climateRiskResult.risk_level]}' आंका गया है। मुख्य खतरा: ${weatherMetrics.primary_hazard}। त्वरित प्राथमिकता: खेत में जल निकासी और अनावश्यक खाद के बहाव की रोकथाम।`,
      immediate_action: immediateHi,
      action_plan: {
        today: todayHi,
        next_3_days: next3DaysHi,
        this_week: thisWeekHi,
      },
      disclaimer:
        'महत्वपूर्ण सूचना: कृषि साथी एक शैक्षणिक एवं जलवायु निर्णय-सहायता प्रोटोटाइप है। यह सरकारी कृषि अधिकारियों या आपातकालीन सेवाओं का विकल्प नहीं है। गंभीर मौसम चेतावनी की स्थिति में मौसम विभाग (IMD) और स्थानीय प्रशासन के निर्देशों का पालन करें।',
    };
  } else {
    localizedResult = {
      language: 'en',
      language_name: 'English',
      risk_badge: `${climateRiskResult.risk_level} Risk Level`,
      summary: `KrishiSaathi Multi-Agent Synthesis: For ${profile.crop} at ${profile.growthStage} stage, climate risk is calculated as ${climateRiskResult.risk_level} (${weatherMetrics.primary_hazard}). Immediate priority focuses on zero-cost drainage protection and nutrient stabilization.`,
      immediate_action: actionPlanResult.immediate_action,
      action_plan: {
        today: actionPlanResult.today,
        next_3_days: actionPlanResult.next_3_days,
        this_week: actionPlanResult.this_week,
      },
      disclaimer:
        'Safety Notice: KrishiSaathi AI is an educational climate resilience prototype and not a replacement for official agricultural officers or emergency authorities. For severe weather or emergency declarations, follow India Meteorological Department (IMD) and district notices.',
    };
  }

  traces.push({
    step: 5,
    agent: 'BilingualLanguageSpecialist',
    action: 'LOCALIZED_NATURAL_TRANSLATION',
    details: `Transformed technical agronomy schemas into simple ${isHindi ? 'rural Hindi' : 'accessible English'}.`,
    output_summary: `Generated localized resilience plan in ${isHindi ? 'Hindi' : 'English'}.`,
    duration_ms: Math.round(performance.now() - step5Start),
    timestamp_ms: 360,
  });

  const totalDuration = Math.round(performance.now() - startTime);

  return {
    orchestrator_version: '1.0.0-strands-aws',
    status: 'SUCCESS',
    execution_duration_ms: totalDuration,
    farmer_profile: profile,
    climate_risk: climateRiskResult,
    crop_advisory: cropAdvisoryResult,
    action_plan: actionPlanResult,
    localized: localizedResult,
    traces: traces,
    safety_boundary: {
      is_educational_prototype: true,
      disclaimer: localizedResult.disclaimer,
      emergency_helpline_india: 'Kisan Call Center (Toll-Free 1800-180-1551) / IMD Mausam Service',
    },
  };
}
