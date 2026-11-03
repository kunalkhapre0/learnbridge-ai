import { DemoScenario } from '../types/agent';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'indore-soybean',
    name: 'Indore, MP · Soybean (Flowering)',
    name_hi: 'इंदौर, मध्य प्रदेश · सोयाबीन (फूल आने पर)',
    badge: 'Heavy Rainfall Risk (95mm)',
    location: 'Indore, Madhya Pradesh',
    crop: 'Soybean',
    growthStage: 'Flowering',
    soilType: 'Black cotton soil',
    irrigation: 'Limited',
    concern: 'Heavy rainfall',
    query_en: 'Heavy rain is forecast in next 48 hours. How can I protect my flowering soybean from waterlogging and flower drop?',
    query_hi: 'अगले 48 घंटों में भारी बारिश का अलर्ट है। फूल आने पर सोयाबीन की फसल को जलभराव से कैसे बचाऊं?',
    expectedRisk: 'HIGH',
    contextDescription: 'Malwa plateau region. Black cotton soil has slow water permeability. Standing water over 24h triggers severe hypoxia and flower shedding.',
    contextDescription_hi: 'मालवा क्षेत्र की काली मिट्टी में पानी धीरे निकलता है। 24 घंटे से ज्यादा जलभराव होने पर फूल झड़ने और जड़ सड़न का भारी खतरा होता है।'
  },
  {
    id: 'wardha-cotton',
    name: 'Wardha, Vidarbha · Cotton (Vegetative)',
    name_hi: 'वर्धा, विदर्भ · कपास (बढ़वार अवस्था)',
    badge: 'Severe Heatwave (42.8°C)',
    location: 'Wardha, Maharashtra',
    crop: 'Cotton',
    growthStage: 'Vegetative',
    soilType: 'Shallow black soil',
    irrigation: 'Rainfed only',
    concern: 'Heat wave / Drought stress',
    query_en: 'Heat wave is arriving, temperatures reaching 43°C with no rain. How to protect my rainfed cotton seedlings from wilting?',
    query_hi: 'गर्मी की लहर (Heat wave) आ रही है, तापमान 43°C पहुंच रहा है। बारिश के बिना कपास की फसल को सूखने से कैसे बचाऊं?',
    expectedRisk: 'CRITICAL',
    contextDescription: 'Vidarbha rainfed belt. Consecutive rainless days and 42.8°C heat spike induce leaf scorching and wilting.',
    contextDescription_hi: 'विदर्भ का वर्षा-आधारित क्षेत्र। 9 दिनों से बारिश नहीं हुई है और 43°C तापमान से पौधों की पत्तियां झुलसने का खतरा है।'
  },
  {
    id: 'ludhiana-wheat',
    name: 'Ludhiana, PB · Wheat (Grain Filling)',
    name_hi: 'लुधियाना, पंजाब · गेहूं (दाना भराव अवस्था)',
    badge: 'Unseasonal Hail & Wind Risk',
    location: 'Ludhiana, Punjab',
    crop: 'Wheat',
    growthStage: 'Grain filling',
    soilType: 'Alluvial sandy loam',
    irrigation: 'Canal / Tubewell assured',
    concern: 'Hailstorm / Strong winds',
    query_en: 'Strong winds and sudden rain squalls are predicted during grain filling. Should I irrigate my wheat field or hold off?',
    query_hi: 'दाना भरने के समय तेज आंधी और बेमौसम बारिश की आशंका है। क्या मुझे अभी गेहूं में पानी देना चाहिए या रोकना चाहिए?',
    expectedRisk: 'MEDIUM',
    contextDescription: 'Indo-Gangetic plain. Heavy irrigation combined with >25 km/h gusts causes severe crop lodging and shriveled grains.',
    contextDescription_hi: 'तेज हवाओं के साथ भारी सिंचाई करने से गेहूं की फसल गिर (lodging) सकती है और दाना पतला रह जाता है।'
  },
  {
    id: 'muzaffarpur-paddy',
    name: 'Muzaffarpur, BR · Paddy (Seedling)',
    name_hi: 'मुजफ्फरपुर, बिहार · धान (रोपणी/पौध अवस्था)',
    badge: 'Delayed Monsoon Dry Spell',
    location: 'Muzaffarpur, Bihar',
    crop: 'Paddy / Rice',
    growthStage: 'Seedling / Nursery',
    soilType: 'Clay loam',
    irrigation: 'Rainfed only',
    concern: 'Prolonged dry spell',
    query_en: 'Monsoon is delayed by 18 days. My rice seedlings are turning pale and nursery beds are drying up. What immediate low-cost steps can I take?',
    query_hi: 'मानसून में देरी हो रही है। धान की नर्सरी सूख रही है और पौध पीली पड़ रही है। कम खर्च में तुरंत क्या उपाय करूं?',
    expectedRisk: 'HIGH',
    contextDescription: 'North Bihar plains. High temperature and deficit soil moisture threaten transplanting schedules.',
    contextDescription_hi: 'उत्तरी बिहार का मैदान। कम वर्षा और नमी की कमी से धान की पौध सूखने का जोखिम है।'
  }
];

export const QUICK_QUESTIONS = [
  {
    id: 'q1',
    en: 'Heavy rain is forecast, what preparation should I do today?',
    hi: 'Heavy rain se pehle kya preparation karu?',
    concern: 'Heavy rainfall'
  },
  {
    id: 'q2',
    en: 'Heat wave is coming, how do I protect my crops from heat shock?',
    hi: 'Heat wave aa rahi hai, meri fasal ko kaise bachau?',
    concern: 'Heat wave / High temperature'
  },
  {
    id: 'q3',
    en: 'What is the current drought and moisture stress risk for my crop?',
    hi: 'Meri crop ke liye drought risk kya hai?',
    concern: 'Prolonged dry spell / Drought'
  },
  {
    id: 'q4',
    en: 'What urgent low-cost action must I take today to safeguard my field?',
    hi: 'Aaj mujhe kya karna chahiye?',
    concern: 'Field drainage & pest scout'
  }
];
