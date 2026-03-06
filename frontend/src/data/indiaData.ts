// // ─── India Geography ─────────────────────────────────────────────
// export const INDIA_STATES_DISTRICTS: Record<string, string[]> = {
//   "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati","Rajahmundry","Kadapa","Anantapur","Eluru"],
//   "Arunachal Pradesh": ["Itanagar","Naharlagun","Tawang","Ziro","Pasighat","Bomdila","Tezu","Roing","Changlang","Khonsa"],
//   "Assam": ["Guwahati","Silchar","Dibrugarh","Nagaon","Jorhat","Tinsukia","Tezpur","Bongaigaon","Dhubri","Karimganj"],
//   "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Purnia","Darbhanga","Bihar Sharif","Arrah","Begusarai","Katihar"],
//   "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon","Jagdalpur","Raigarh","Ambikapur","Dhamtari"],
//   "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda","Bicholim","Curchorem","Sanquelim","Canacona","Quepem"],
//   "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh","Anand","Bharuch"],
//   "Haryana": ["Gurugram","Faridabad","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal","Sonipat","Kurukshetra"],
//   "Himachal Pradesh": ["Shimla","Mandi","Solan","Dharamsala","Kangra","Kullu","Hamirpur","Una","Bilaspur","Chamba"],
//   "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Phusro","Hazaribagh","Giridih","Ramgarh","Medininagar"],
//   "Karnataka": ["Bengaluru","Mysuru","Hubballi","Mangaluru","Belagavi","Kalaburagi","Davanagere","Ballari","Vijayapura","Shimoga"],
//   "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Palakkad","Alappuzha","Kannur","Malappuram","Kottayam"],
//   "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa"],
//   "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur","Amravati","Kolhapur","Nanded","Thane"],
//   "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur","Senapati","Ukhrul","Tamenglong","Chandel","Jiribam","Kangpokpi"],
//   "Meghalaya": ["Shillong","Tura","Nongstoin","Jowai","Baghmara","Ampati","Resubelpara","Nongpoh","Mairang","Cherrapunji"],
//   "Mizoram": ["Aizawl","Lunglei","Champhai","Kolasib","Serchhip","Mamit","Lawngtlai","Saiha","Khawzawl","Hnahthial"],
//   "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha","Zunheboto","Phek","Mon","Longleng","Kiphire"],
//   "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Bhadrak","Bargarh","Jharsuguda"],
//   "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Hoshiarpur","Gurdaspur","Firozpur","Faridkot"],
//   "Rajasthan": ["Jaipur","Jodhpur","Kota","Bikaner","Ajmer","Udaipur","Bhilwara","Alwar","Sikar","Barmer"],
//   "Sikkim": ["Gangtok","Namchi","Geyzing","Mangan","Rangpo","Jorethang","Naya Bazar","Ravangla","Yuksom","Pelling"],
//   "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Tiruppur","Vellore","Erode","Thoothukkudi"],
//   "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Ramagundam","Mahbubnagar","Nalgonda","Adilabad","Suryapet"],
//   "Tripura": ["Agartala","Dharmanagar","Udaipur","Kailasahar","Belonia","Khowai","Ambassa","Sabroom","Sonamura","Melaghar"],
//   "Uttar Pradesh": ["Lucknow","Kanpur","Agra","Varanasi","Allahabad","Meerut","Ghaziabad","Noida","Gorakhpur","Bareilly"],
//   "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur","Rishikesh","Kotdwara","Jaspur","Ramnagar"],
//   "West Bengal": ["Kolkata","Howrah","Asansol","Siliguri","Bardhaman","Malda","Durgapur","Baharampur","Habra","Kharagpur"],
//   "Delhi": ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","North East Delhi","North West Delhi","South West Delhi","Shahdara"],
//   "Jammu & Kashmir": ["Srinagar","Jammu","Anantnag","Sopore","Baramulla","Kathua","Udhampur","Rajauri","Poonch","Doda"],
//   "Ladakh": ["Leh","Kargil","Nubra","Zanskar","Drass","Nyoma","Diskit","Padum","Tangtse","Khaltse"],
//   "Chandigarh": ["Chandigarh"],
//   "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"],
//   "Andaman & Nicobar": ["Port Blair","Diglipur","Car Nicobar","Rangat","Mayabunder"],
//   "Dadra & Nagar Haveli": ["Silvassa","Amli","Khanvel"],
//   "Daman & Diu": ["Daman","Diu"],
//   "Lakshadweep": ["Kavaratti","Agatti","Amini","Andrott"],
// };

// export const ALL_STATES = Object.keys(INDIA_STATES_DISTRICTS).sort();
// export function getDistricts(state: string): string[] {
//   return INDIA_STATES_DISTRICTS[state] || [];
// }

// // ─── Domain Taxonomy ─────────────────────────────────────────────
// export const DEPARTMENTS = [
//   "Ministry of Health & Family Welfare",
//   "Ministry of Rural Development",
//   "Ministry of Education",
//   "Ministry of Housing & Urban Affairs",
//   "Ministry of Road Transport & Highways",
//   "Ministry of Jal Shakti",
//   "Ministry of Agriculture & Farmers Welfare",
// ];

// export const SCHEMES_BY_DEPT: Record<string, string[]> = {
//   "Ministry of Health & Family Welfare":        ["Ayushman Bharat – PM-JAY", "National Health Mission", "PM Swasthya Suraksha Yojana"],
//   "Ministry of Rural Development":              ["PMGSY", "MGNREGS", "PM Awaas Yojana (Gramin)", "DEEN DAYAL Upadhyaya Grameen Kaushalya Yojana"],
//   "Ministry of Education":                      ["PM POSHAN", "Samagra Shiksha Abhiyan", "Pradhan Mantri Uchchatar Shiksha Protsahan"],
//   "Ministry of Housing & Urban Affairs":        ["PM Awaas Yojana (Urban)", "Smart Cities Mission", "Swachh Bharat Mission (Urban)"],
//   "Ministry of Road Transport & Highways":      ["Bharatmala Pariyojana", "PMGSY Urban", "National Highways Development Project"],
//   "Ministry of Jal Shakti":                     ["Jal Jeevan Mission", "AMRUT 2.0", "Swachh Bharat Mission (Gramin)"],
//   "Ministry of Agriculture & Farmers Welfare":  ["PM Kisan Samman Nidhi", "PM Fasal Bima Yojana", "Pradhan Mantri Krishi Sinchai Yojana"],
// };

// export const VENDORS = [
//   "ABC Infrastructure Ltd",
//   "XYZ Construction Pvt Ltd",
//   "GreenBuild Solutions",
//   "NovaTech Contractors",
//   "Bharat Road Works",
//   "HealthFirst Medical Infrastructure",
//   "AquaFlow Engineers",
//   "EduBuild India",
//   "UrbanHomes Developers",
//   "AgroPath Pvt Ltd",
// ];

// export type ProjectStatus = "Ongoing" | "Completed" | "Delayed" | "Cancelled";
// export const ALL_STATUSES: ProjectStatus[] = ["Ongoing", "Completed", "Delayed", "Cancelled"];

// export interface Project {
//   id: string;
//   name: string;
//   department: string;
//   scheme: string;
//   vendor: string;
//   status: ProjectStatus;
//   allocated: number;
//   utilized: number;
//   startDate: string;
//   endDate: string;
//   anomalyFlag: boolean;
// }

// // ─── Deterministic seeded random ─────────────────────────────────
// function seed(str: string): number {
//   let h = 0;
//   for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
//   return Math.abs(h);
// }
// function seededPick<T>(arr: T[], s: number): T { return arr[s % arr.length]; }

// // ─── Project Generator ───────────────────────────────────────────
// const PROJECT_NAME_TEMPLATES = [
//   "{district} Rural Road Development Phase {n}",
//   "{district} District Hospital Expansion",
//   "{district} Smart School Infrastructure",
//   "{district} Water Pipeline Project",
//   "{district} Urban Housing Complex Block {n}",
//   "{district} Primary Health Centre Upgrade",
//   "{district} Skill Development Centre",
//   "{district} Watershed Management Project",
//   "{district} Solar Street Lighting Scheme",
//   "{district} Anganwadi Renovation Phase {n}",
//   "{district} Irrigation Canal Extension",
//   "{district} NH Bypass Construction",
// ];

// export function getProjectsForLocation(state: string, district: string): Project[] {
//   const key = `${state}-${district}`;
//   const count = (seed(key + 'count') % 6) + 7; // 7–12 projects per location
//   const statuses: ProjectStatus[] = ["Ongoing", "Completed", "Delayed", "Cancelled"];
//   const startYears = ["2022", "2023", "2024"];

//   return Array.from({ length: count }, (_, i) => {
//     const k = `${key}-proj-${i}`;
//     const dept = seededPick(DEPARTMENTS, seed(k + 'd'));
//     const schemes = SCHEMES_BY_DEPT[dept];
//     const scheme = seededPick(schemes, seed(k + 's'));
//     const vendor = seededPick(VENDORS, seed(k + 'v'));
//     const status = seededPick(statuses, seed(k + 'st'));
//     const allocated = ((seed(k + 'a') % 900) + 50) * 100000;
//     const utilPct = status === 'Completed' ? 0.95 + (seed(k+'u') % 5) / 100
//                   : status === 'Cancelled'  ? 0.1  + (seed(k+'u') % 20) / 100
//                   : status === 'Delayed'    ? 0.3  + (seed(k+'u') % 30) / 100
//                   :                           0.5  + (seed(k+'u') % 40) / 100;
//     const startYr = seededPick(startYears, seed(k + 'sy'));
//     const startMo = String((seed(k + 'sm') % 12) + 1).padStart(2, '0');
//     const endYr   = String(parseInt(startYr) + 1 + (seed(k + 'ey') % 2));
//     const endMo   = String((seed(k + 'em') % 12) + 1).padStart(2, '0');
//     const tmpl = seededPick(PROJECT_NAME_TEMPLATES, seed(k + 'nm'));
//     const name = tmpl
//       .replace('{district}', district)
//       .replace('{n}', String((seed(k + 'ph') % 3) + 1));

//     return {
//       id: `PRJ-${seed(k).toString().slice(0, 6)}`,
//       name,
//       department: dept,
//       scheme,
//       vendor,
//       status,
//       allocated,
//       utilized: Math.round(allocated * utilPct),
//       startDate: `${startYr}-${startMo}-01`,
//       endDate:   `${endYr}-${endMo}-30`,
//       anomalyFlag: seed(k + 'flag') % 5 === 0,
//     };
//   });
// }

// // ─── Budget summary ──────────────────────────────────────────────
// export function getStateBudgetData(state: string, district?: string) {
//   const key = district ? `${state}-${district}` : state;
//   const s = seed(key);
//   const scale = district ? 1 : 10;

//   const totalAllocated = ((s % 900) + 100) * 1000000 * scale;
//   const utilizedPct = 0.4 + (seed(key + 'u') % 50) / 100;
//   const totalUtilized = Math.round(totalAllocated * utilizedPct);
//   const activeAnomalies = (seed(key + 'a') % 40) + 2;
//   const riskScore = ((seed(key + 'r') % 50) + 30) / 10;

//   const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct'];
//   const allocationVsUtilization = months.map(month => {
//     const allocated = Math.round(((seed(key + month) % 3000) + 1000) * scale);
//     const utilized  = Math.round(allocated * (0.3 + (seed(key + month + 'u') % 60) / 100));
//     return { month, allocated, utilized };
//   });
//   const anomaliesTrend = months.map(month => ({
//     month,
//     count: (seed(key + month + 'an') % 15) + 1,
//   }));

//   return {
//     totalAllocated, totalUtilized, activeAnomalies,
//     riskScore: parseFloat(riskScore.toFixed(1)),
//     allocationVsUtilization, anomaliesTrend,
//     label: district ? `${district}, ${state}` : state,
//   };
// }

// // ─── Fund Flow Node ──────────────────────────────────────────────
// export interface FlowNode {
//   level: number;
//   levelLabel: string;
//   entity: string;
//   role: string;
//   allocated: number;
//   disbursed: number;
//   utilized: number;
//   date: string;
//   status: 'Disbursed' | 'Partially Disbursed' | 'Flagged' | 'Pending';
//   alert?: string;
// }

// // Generates a 6-level fund flow chain for a specific project
// export function getFlowForProject(project: Project, state: string, district: string): FlowNode[] {
//   const k = project.id;

//   // Each level disburses slightly less (leakage / pending at each stage)
//   const total = project.allocated;
//   const l1 = total * 1.4;                          // Union Budget envelope (bigger)
//   const l2 = total * 1.15;
//   const l3 = total * 1.05;
//   const l4 = total;
//   const l5 = Math.round(total * (0.85 + (seed(k + 'l5') % 10) / 100));
//   const l6 = project.utilized;

//   const dept = project.department;
//   const stateGovt = `Government of ${state}`;

//   // Municipality / local body name based on district
//   const municipalBodies: Record<string, string> = {
//     Mumbai: 'Brihanmumbai Municipal Corporation (BMC)',
//     Pune: 'Pune Municipal Corporation',
//     Delhi: 'Delhi Municipal Corporation',
//     Chennai: 'Greater Chennai Corporation',
//     Bengaluru: 'Bruhat Bengaluru Mahanagara Palike',
//     Hyderabad: 'Greater Hyderabad Municipal Corporation',
//     Kolkata: 'Kolkata Municipal Corporation',
//   };
//   const municipal = municipalBodies[district] ?? `${district} Municipal Corporation`;

//   const flagLevel = project.anomalyFlag ? 5 : -1;   // which level is flagged

//   const mkStatus = (lvl: number): FlowNode['status'] =>
//     lvl === flagLevel ? 'Flagged'
//     : project.status === 'Cancelled' && lvl >= 5 ? 'Pending'
//     : project.status === 'Delayed'   && lvl >= 6 ? 'Pending'
//     : 'Disbursed';

//   const dates = [
//     '01 Apr 2024', '20 Apr 2024', '15 May 2024',
//     '10 Jun 2024', '05 Jul 2024', '20 Jul 2024',
//   ];

//   return [
//     {
//       level: 1,
//       levelLabel: 'Union Budget',
//       entity: 'Ministry of Finance, Government of India',
//       role: dept,
//       allocated: Math.round(l1),
//       disbursed: Math.round(l1),
//       utilized: Math.round(l1 * 0.7),
//       date: dates[0],
//       status: 'Disbursed',
//     },
//     {
//       level: 2,
//       levelLabel: 'Central Ministry',
//       entity: dept,
//       role: `Nodal ministry for ${project.scheme}`,
//       allocated: Math.round(l2),
//       disbursed: Math.round(l2),
//       utilized: Math.round(l2 * 0.72),
//       date: dates[1],
//       status: mkStatus(2),
//     },
//     {
//       level: 3,
//       levelLabel: 'State Government',
//       entity: stateGovt,
//       role: `State Nodal Agency — ${project.scheme}`,
//       allocated: Math.round(l3),
//       disbursed: Math.round(l3),
//       utilized: Math.round(l3 * 0.75),
//       date: dates[2],
//       status: mkStatus(3),
//     },
//     {
//       level: 4,
//       levelLabel: 'District / Municipal Body',
//       entity: municipal,
//       role: `District Implementation Unit`,
//       allocated: Math.round(l4),
//       disbursed: Math.round(l4 * (project.status === 'Cancelled' ? 0.4 : 0.95)),
//       utilized: Math.round(l4 * 0.6),
//       date: dates[3],
//       status: mkStatus(4),
//     },
//     {
//       level: 5,
//       levelLabel: 'Ward / Project Office',
//       entity: `${district} Ward Office – ${project.scheme}`,
//       role: 'On-ground project management',
//       allocated: l5,
//       disbursed: Math.round(l5 * (project.status === 'Cancelled' ? 0.2 : project.status === 'Delayed' ? 0.6 : 0.9)),
//       utilized: Math.round(l5 * (project.status === 'Delayed' ? 0.35 : 0.65)),
//       date: dates[4],
//       status: mkStatus(5),
//       alert: flagLevel === 5 ? `Utilization mismatch detected at ward level for ${project.name}.` : undefined,
//     },
//     {
//       level: 6,
//       levelLabel: 'Contractor / Implementer',
//       entity: project.vendor,
//       role: `Executing agency — ${project.name}`,
//       allocated: project.allocated,
//       disbursed: project.utilized,
//       utilized: project.utilized,
//       date: dates[5],
//       status: project.anomalyFlag ? 'Flagged'
//             : project.status === 'Completed' ? 'Disbursed'
//             : project.status === 'Cancelled' ? 'Pending'
//             : 'Partially Disbursed',
//       alert: project.anomalyFlag
//         ? `Completion claim submitted by ${project.vendor} but field verification is pending. Funds at risk: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(project.allocated - project.utilized)}.`
//         : undefined,
//     },
//   ];
// }
// ─── India Geography ─────────────────────────────────────────────
export const INDIA_STATES_DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati","Rajahmundry","Kadapa","Anantapur","Eluru"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Tawang","Ziro","Pasighat","Bomdila","Tezu","Roing","Changlang","Khonsa"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Nagaon","Jorhat","Tinsukia","Tezpur","Bongaigaon","Dhubri","Karimganj"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Purnia","Darbhanga","Bihar Sharif","Arrah","Begusarai","Katihar"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon","Jagdalpur","Raigarh","Ambikapur","Dhamtari"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda","Bicholim","Curchorem","Sanquelim","Canacona","Quepem"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh","Anand","Bharuch"],
  "Haryana": ["Gurugram","Faridabad","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal","Sonipat","Kurukshetra"],
  "Himachal Pradesh": ["Shimla","Mandi","Solan","Dharamsala","Kangra","Kullu","Hamirpur","Una","Bilaspur","Chamba"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Phusro","Hazaribagh","Giridih","Ramgarh","Medininagar"],
  "Karnataka": ["Bengaluru","Mysuru","Hubballi","Mangaluru","Belagavi","Kalaburagi","Davanagere","Ballari","Vijayapura","Shimoga"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Palakkad","Alappuzha","Kannur","Malappuram","Kottayam"],
  "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur","Amravati","Kolhapur","Nanded","Thane"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur","Senapati","Ukhrul","Tamenglong","Chandel","Jiribam","Kangpokpi"],
  "Meghalaya": ["Shillong","Tura","Nongstoin","Jowai","Baghmara","Ampati","Resubelpara","Nongpoh","Mairang","Cherrapunji"],
  "Mizoram": ["Aizawl","Lunglei","Champhai","Kolasib","Serchhip","Mamit","Lawngtlai","Saiha","Khawzawl","Hnahthial"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha","Zunheboto","Phek","Mon","Longleng","Kiphire"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Bhadrak","Bargarh","Jharsuguda"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Hoshiarpur","Gurdaspur","Firozpur","Faridkot"],
  "Rajasthan": ["Jaipur","Jodhpur","Kota","Bikaner","Ajmer","Udaipur","Bhilwara","Alwar","Sikar","Barmer"],
  "Sikkim": ["Gangtok","Namchi","Geyzing","Mangan","Rangpo","Jorethang","Naya Bazar","Ravangla","Yuksom","Pelling"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Tiruppur","Vellore","Erode","Thoothukkudi"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Ramagundam","Mahbubnagar","Nalgonda","Adilabad","Suryapet"],
  "Tripura": ["Agartala","Dharmanagar","Udaipur","Kailasahar","Belonia","Khowai","Ambassa","Sabroom","Sonamura","Melaghar"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Agra","Varanasi","Allahabad","Meerut","Ghaziabad","Noida","Gorakhpur","Bareilly"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur","Rishikesh","Kotdwara","Jaspur","Ramnagar"],
  "West Bengal": ["Kolkata","Howrah","Asansol","Siliguri","Bardhaman","Malda","Durgapur","Baharampur","Habra","Kharagpur"],
  "Delhi": ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","North East Delhi","North West Delhi","South West Delhi","Shahdara"],
  "Jammu & Kashmir": ["Srinagar","Jammu","Anantnag","Sopore","Baramulla","Kathua","Udhampur","Rajauri","Poonch","Doda"],
  "Ladakh": ["Leh","Kargil","Nubra","Zanskar","Drass","Nyoma","Diskit","Padum","Tangtse","Khaltse"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"],
  "Andaman & Nicobar": ["Port Blair","Diglipur","Car Nicobar","Rangat","Mayabunder"],
  "Dadra & Nagar Haveli": ["Silvassa","Amli","Khanvel"],
  "Daman & Diu": ["Daman","Diu"],
  "Lakshadweep": ["Kavaratti","Agatti","Amini","Andrott"],
};

export const ALL_STATES = Object.keys(INDIA_STATES_DISTRICTS).sort();
export function getDistricts(state: string): string[] {
  return INDIA_STATES_DISTRICTS[state] || [];
}

// ─── Domain Taxonomy ─────────────────────────────────────────────
export const DEPARTMENTS = [
  "Ministry of Health & Family Welfare",
  "Ministry of Rural Development",
  "Ministry of Education",
  "Ministry of Housing & Urban Affairs",
  "Ministry of Road Transport & Highways",
  "Ministry of Jal Shakti",
  "Ministry of Agriculture & Farmers Welfare",
];

export const SCHEMES_BY_DEPT: Record<string, string[]> = {
  "Ministry of Health & Family Welfare":        ["Ayushman Bharat – PM-JAY", "National Health Mission", "PM Swasthya Suraksha Yojana"],
  "Ministry of Rural Development":              ["PMGSY", "MGNREGS", "PM Awaas Yojana (Gramin)", "DEEN DAYAL Upadhyaya Grameen Kaushalya Yojana"],
  "Ministry of Education":                      ["PM POSHAN", "Samagra Shiksha Abhiyan", "Pradhan Mantri Uchchatar Shiksha Protsahan"],
  "Ministry of Housing & Urban Affairs":        ["PM Awaas Yojana (Urban)", "Smart Cities Mission", "Swachh Bharat Mission (Urban)"],
  "Ministry of Road Transport & Highways":      ["Bharatmala Pariyojana", "PMGSY Urban", "National Highways Development Project"],
  "Ministry of Jal Shakti":                     ["Jal Jeevan Mission", "AMRUT 2.0", "Swachh Bharat Mission (Gramin)"],
  "Ministry of Agriculture & Farmers Welfare":  ["PM Kisan Samman Nidhi", "PM Fasal Bima Yojana", "Pradhan Mantri Krishi Sinchai Yojana"],
};

export const VENDORS = [
  "ABC Infrastructure Ltd",
  "XYZ Construction Pvt Ltd",
  "GreenBuild Solutions",
  "NovaTech Contractors",
  "Bharat Road Works",
  "HealthFirst Medical Infrastructure",
  "AquaFlow Engineers",
  "EduBuild India",
  "UrbanHomes Developers",
  "AgroPath Pvt Ltd",
];

export type ProjectStatus = "Ongoing" | "Completed" | "Delayed" | "Cancelled";
export const ALL_STATUSES: ProjectStatus[] = ["Ongoing", "Completed", "Delayed", "Cancelled"];

export interface Project {
  id: string;
  name: string;
  department: string;
  scheme: string;
  vendor: string;
  status: ProjectStatus;
  allocated: number;
  utilized: number;
  startDate: string;
  endDate: string;
  anomalyFlag: boolean;
}

// ─── Deterministic seeded random ─────────────────────────────────
function seed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  return Math.abs(h);
}
function seededPick<T>(arr: T[], s: number): T { return arr[s % arr.length]; }

// ─── Project Generator ───────────────────────────────────────────
const PROJECT_NAME_TEMPLATES = [
  "{district} Rural Road Development Phase {n}",
  "{district} District Hospital Expansion",
  "{district} Smart School Infrastructure",
  "{district} Water Pipeline Project",
  "{district} Urban Housing Complex Block {n}",
  "{district} Primary Health Centre Upgrade",
  "{district} Skill Development Centre",
  "{district} Watershed Management Project",
  "{district} Solar Street Lighting Scheme",
  "{district} Anganwadi Renovation Phase {n}",
  "{district} Irrigation Canal Extension",
  "{district} NH Bypass Construction",
];

export function getProjectsForLocation(state: string, district: string): Project[] {
  const key = `${state}-${district}`;
  const count = (seed(key + 'count') % 6) + 7; // 7–12 projects per location
  const statuses: ProjectStatus[] = ["Ongoing", "Completed", "Delayed", "Cancelled"];
  const startYears = ["2022", "2023", "2024"];

  return Array.from({ length: count }, (_, i) => {
    const k = `${key}-proj-${i}`;
    const dept = seededPick(DEPARTMENTS, seed(k + 'd'));
    const schemes = SCHEMES_BY_DEPT[dept];
    const scheme = seededPick(schemes, seed(k + 's'));
    const vendor = seededPick(VENDORS, seed(k + 'v'));
    const status = seededPick(statuses, seed(k + 'st'));
    const allocated = ((seed(k + 'a') % 900) + 50) * 100000;
    const utilPct = status === 'Completed' ? 0.95 + (seed(k+'u') % 5) / 100
                  : status === 'Cancelled'  ? 0.1  + (seed(k+'u') % 20) / 100
                  : status === 'Delayed'    ? 0.3  + (seed(k+'u') % 30) / 100
                  :                           0.5  + (seed(k+'u') % 40) / 100;
    const startYr = seededPick(startYears, seed(k + 'sy'));
    const startMo = String((seed(k + 'sm') % 12) + 1).padStart(2, '0');
    const endYr   = String(parseInt(startYr) + 1 + (seed(k + 'ey') % 2));
    const endMo   = String((seed(k + 'em') % 12) + 1).padStart(2, '0');
    const tmpl = seededPick(PROJECT_NAME_TEMPLATES, seed(k + 'nm'));
    const name = tmpl
      .replace('{district}', district)
      .replace('{n}', String((seed(k + 'ph') % 3) + 1));

    return {
      id: `PRJ-${seed(k).toString().slice(0, 6)}`,
      name,
      department: dept,
      scheme,
      vendor,
      status,
      allocated,
      utilized: Math.round(allocated * utilPct),
      startDate: `${startYr}-${startMo}-01`,
      endDate:   `${endYr}-${endMo}-30`,
      anomalyFlag: seed(k + 'flag') % 5 === 0,
    };
  });
}

// ─── Budget summary ──────────────────────────────────────────────
export function getStateBudgetData(state: string, district?: string) {
  const key = district ? `${state}-${district}` : state;
  const s = seed(key);
  const scale = district ? 1 : 10;

  const totalAllocated = ((s % 900) + 100) * 1000000 * scale;
  const utilizedPct = 0.4 + (seed(key + 'u') % 50) / 100;
  const totalUtilized = Math.round(totalAllocated * utilizedPct);
  const activeAnomalies = (seed(key + 'a') % 40) + 2;
  const riskScore = ((seed(key + 'r') % 50) + 30) / 10;

  const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct'];
  const allocationVsUtilization = months.map(month => {
    const allocated = Math.round(((seed(key + month) % 3000) + 1000) * scale);
    const utilized  = Math.round(allocated * (0.3 + (seed(key + month + 'u') % 60) / 100));
    return { month, allocated, utilized };
  });
  const anomaliesTrend = months.map(month => ({
    month,
    count: (seed(key + month + 'an') % 15) + 1,
  }));

  return {
    totalAllocated, totalUtilized, activeAnomalies,
    riskScore: parseFloat(riskScore.toFixed(1)),
    allocationVsUtilization, anomaliesTrend,
    label: district ? `${district}, ${state}` : state,
  };
}

// ─── Fund Flow Node ──────────────────────────────────────────────
export interface FlowNode {
  level: number;
  levelLabel: string;
  entity: string;
  role: string;
  allocated: number;
  disbursed: number;
  utilized: number;
  date: string;
  status: 'Disbursed' | 'Partially Disbursed' | 'Flagged' | 'Pending';
  alert?: string;
}

// Generates a 6-level fund flow chain for a specific project
export function getFlowForProject(project: Project, state: string, district: string): FlowNode[] {
  const k = project.id;

  // Each level disburses slightly less (leakage / pending at each stage)
  const total = project.allocated;
  const l1 = total * 1.4;                          // Union Budget envelope (bigger)
  const l2 = total * 1.15;
  const l3 = total * 1.05;
  const l4 = total;
  const l5 = Math.round(total * (0.85 + (seed(k + 'l5') % 10) / 100));
  const l6 = project.utilized;

  const dept = project.department;
  const stateGovt = `Government of ${state}`;

  // Municipality / local body name based on district
  const municipalBodies: Record<string, string> = {
    Mumbai: 'Brihanmumbai Municipal Corporation (BMC)',
    Pune: 'Pune Municipal Corporation',
    Delhi: 'Delhi Municipal Corporation',
    Chennai: 'Greater Chennai Corporation',
    Bengaluru: 'Bruhat Bengaluru Mahanagara Palike',
    Hyderabad: 'Greater Hyderabad Municipal Corporation',
    Kolkata: 'Kolkata Municipal Corporation',
  };
  const municipal = municipalBodies[district] ?? `${district} Municipal Corporation`;

  const flagLevel = project.anomalyFlag ? 5 : -1;   // which level is flagged

  const mkStatus = (lvl: number): FlowNode['status'] =>
    lvl === flagLevel ? 'Flagged'
    : project.status === 'Cancelled' && lvl >= 5 ? 'Pending'
    : project.status === 'Delayed'   && lvl >= 6 ? 'Pending'
    : 'Disbursed';

  const dates = [
    '01 Apr 2024', '20 Apr 2024', '15 May 2024',
    '10 Jun 2024', '05 Jul 2024', '20 Jul 2024',
  ];

  return [
    {
      level: 1,
      levelLabel: 'Union Budget',
      entity: 'Ministry of Finance, Government of India',
      role: dept,
      allocated: Math.round(l1),
      disbursed: Math.round(l1),
      utilized: Math.round(l1 * 0.7),
      date: dates[0],
      status: 'Disbursed',
    },
    {
      level: 2,
      levelLabel: 'Central Ministry',
      entity: dept,
      role: `Nodal ministry for ${project.scheme}`,
      allocated: Math.round(l2),
      disbursed: Math.round(l2),
      utilized: Math.round(l2 * 0.72),
      date: dates[1],
      status: mkStatus(2),
    },
    {
      level: 3,
      levelLabel: 'State Government',
      entity: stateGovt,
      role: `State Nodal Agency — ${project.scheme}`,
      allocated: Math.round(l3),
      disbursed: Math.round(l3),
      utilized: Math.round(l3 * 0.75),
      date: dates[2],
      status: mkStatus(3),
    },
    {
      level: 4,
      levelLabel: 'District / Municipal Body',
      entity: municipal,
      role: `District Implementation Unit`,
      allocated: Math.round(l4),
      disbursed: Math.round(l4 * (project.status === 'Cancelled' ? 0.4 : 0.95)),
      utilized: Math.round(l4 * 0.6),
      date: dates[3],
      status: mkStatus(4),
    },
    {
      level: 5,
      levelLabel: 'Ward / Project Office',
      entity: `${district} Ward Office – ${project.scheme}`,
      role: 'On-ground project management',
      allocated: l5,
      disbursed: Math.round(l5 * (project.status === 'Cancelled' ? 0.2 : project.status === 'Delayed' ? 0.6 : 0.9)),
      utilized: Math.round(l5 * (project.status === 'Delayed' ? 0.35 : 0.65)),
      date: dates[4],
      status: mkStatus(5),
      alert: flagLevel === 5 ? `Utilization mismatch detected at ward level for ${project.name}.` : undefined,
    },
    {
      level: 6,
      levelLabel: 'Contractor / Implementer',
      entity: project.vendor,
      role: `Executing agency — ${project.name}`,
      allocated: project.allocated,
      disbursed: project.utilized,
      utilized: project.utilized,
      date: dates[5],
      status: project.anomalyFlag ? 'Flagged'
            : project.status === 'Completed' ? 'Disbursed'
            : project.status === 'Cancelled' ? 'Pending'
            : 'Partially Disbursed',
      alert: project.anomalyFlag
        ? `Completion claim submitted by ${project.vendor} but field verification is pending. Funds at risk: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(project.allocated - project.utilized)}.`
        : undefined,
    },
  ];
}

// ─── Anomaly Types ───────────────────────────────────────────────
export type AnomalySeverity = 'High' | 'Medium' | 'Low';
export type AnomalyStatus = 'Investigating' | 'Flagged for Audit' | 'Warning Issued' | 'Resolved';

export interface Anomaly {
  id: string;
  projectId: string;
  projectName: string;
  department: string;
  scheme: string;
  vendor: string;
  projectStatus: ProjectStatus;
  type: string;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  description: string;
  amountAtRisk: number;
  date: string;
  district: string;
  state: string;
}

const ANOMALY_TEMPLATES = [
  {
    type: 'Verification Mismatch',
    severity: 'High' as AnomalySeverity,
    desc: (p: Project, district: string) =>
      `${p.vendor} has marked "${p.name}" as 100% complete. ${(seed(p.id + 'tickets') % 40) + 10}+ citizen tickets raised in the last 48 hours reporting incomplete work and debris at site in ${district}.`,
  },
  {
    type: 'Abnormal Allocation Spike',
    severity: 'Medium' as AnomalySeverity,
    desc: (p: Project) =>
      `Historical 5-year average budget for this scheme was ₹${((seed(p.id + 'hist') % 20) + 5)}L/year. Current fiscal year allocation spiked to ₹${Math.round(p.allocated / 100000)}L without corresponding project proposals.`,
  },
  {
    type: 'Fund Idling',
    severity: 'Low' as AnomalySeverity,
    desc: (p: Project) =>
      `Funds disbursed ${(seed(p.id + 'months') % 5) + 3} months ago for "${p.name}" have only ${Math.round((p.utilized / p.allocated) * 100)}% utilization rate. Deadline approaching with no work commencement.`,
  },
  {
    type: 'Duplicate Disbursement',
    severity: 'High' as AnomalySeverity,
    desc: (p: Project) =>
      `Two disbursement records detected for the same work order under "${p.name}". Total duplicate amount flagged: ₹${Math.round(p.allocated * 0.3 / 100000)}L. Vendor: ${p.vendor}.`,
  },
  {
    type: 'Contractor Non-Performance',
    severity: 'Medium' as AnomalySeverity,
    desc: (p: Project) =>
      `${p.vendor} has received ${Math.round(p.utilized / 100000)}L in milestone payments for "${p.name}" but field verification shows only ${Math.round((p.utilized / p.allocated) * 60)}% physical completion.`,
  },
];

const ANOMALY_STATUSES: AnomalyStatus[] = ['Investigating', 'Flagged for Audit', 'Warning Issued', 'Resolved'];

export const ALL_ANOMALY_STATUSES: AnomalyStatus[] = ['Investigating', 'Flagged for Audit', 'Warning Issued', 'Resolved'];
export const ALL_ANOMALY_SEVERITIES: AnomalySeverity[] = ['High', 'Medium', 'Low'];

export function getAnomaliesForLocation(state: string, district: string): Anomaly[] {
  const projects = getProjectsForLocation(state, district);
  const dates = ['2024-10-24', '2024-10-22', '2024-10-20', '2024-10-18', '2024-10-15', '2024-10-10'];

  // Every flagged project generates an anomaly; also add some for delayed ones
  const anomalyProjects = projects.filter(p => p.anomalyFlag || p.status === 'Delayed');

  return anomalyProjects.map((p, i) => {
    const tmpl = ANOMALY_TEMPLATES[seed(p.id + 'tmpl') % ANOMALY_TEMPLATES.length];
    const statusIdx = seed(p.id + 'astatus') % 3; // exclude 'Resolved' for active ones
    return {
      id: `ANM-${new Date().getFullYear()}-${String(seed(p.id + 'anum') % 900 + 100)}`,
      projectId: p.id,
      projectName: p.name,
      department: p.department,
      scheme: p.scheme,
      vendor: p.vendor,
      projectStatus: p.status,
      type: tmpl.type,
      severity: p.anomalyFlag ? 'High' : tmpl.severity,
      status: ANOMALY_STATUSES[statusIdx],
      description: tmpl.desc(p, district),
      amountAtRisk: Math.round(p.allocated * (0.2 + (seed(p.id + 'risk') % 50) / 100)),
      date: dates[i % dates.length],
      district,
      state,
    };
  });
}