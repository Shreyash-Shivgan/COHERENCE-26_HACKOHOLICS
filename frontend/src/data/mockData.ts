export const summaryStats = {
  totalAllocated: 50000000000, // 50,000 Cr
  totalDisbursed: 35000000000,
  totalUtilized: 28000000000,
  activeAnomalies: 142,
  riskScore: 7.4, // Out of 10
};

export const allocationVsUtilization = [
  { month: 'Apr', allocated: 4000, utilized: 2400 },
  { month: 'May', allocated: 3000, utilized: 1398 },
  { month: 'Jun', allocated: 2000, utilized: 9800 },
  { month: 'Jul', allocated: 2780, utilized: 3908 },
  { month: 'Aug', allocated: 1890, utilized: 4800 },
  { month: 'Sep', allocated: 2390, utilized: 3800 },
  { month: 'Oct', allocated: 3490, utilized: 4300 },
];

export const anomalies = [
  {
    id: 'ANM-2024-089',
    type: 'Verification Mismatch',
    severity: 'High',
    entity: 'ABC Contractors (Dahisar Road Project)',
    description: 'Contractor marked project as 100% complete. 45+ citizen tickets raised in the last 48 hours reporting incomplete roadwork and debris.',
    date: '2024-10-24',
    status: 'Investigating',
    amountAtRisk: 25000000, // 2.5 Cr
  },
  {
    id: 'ANM-2024-092',
    type: 'Abnormal Allocation Spike',
    severity: 'Medium',
    entity: 'Ward Office - Sector 4',
    description: 'Historical 10-year average budget allocation was ₹10L/year. Current fiscal year allocation spiked to ₹50L without corresponding project proposals.',
    date: '2024-10-22',
    status: 'Flagged for Audit',
    amountAtRisk: 4000000, // 40L difference
  },
  {
    id: 'ANM-2024-095',
    type: 'Fund Idling',
    severity: 'Low',
    entity: 'State Health Department',
    description: 'Funds disbursed 6 months ago for Rural Clinic Upgrades have 0% utilization rate.',
    date: '2024-10-20',
    status: 'Warning Issued',
    amountAtRisk: 150000000, // 15 Cr
  }
];

export const fundFlowHierarchy = [
  {
    level: 1,
    title: 'Union Budget',
    entity: 'Ministry of Finance',
    allocated: 10000000000,
    status: 'Disbursed',
    date: '01 Apr 2024'
  },
  {
    level: 2,
    title: 'Central Ministry',
    entity: 'Ministry of Road Transport & Highways',
    allocated: 2500000000,
    status: 'Disbursed',
    date: '15 Apr 2024'
  },
  {
    level: 3,
    title: 'State Government',
    entity: 'Government of Maharashtra',
    allocated: 800000000,
    status: 'Disbursed',
    date: '10 May 2024'
  },
  {
    level: 4,
    title: 'Municipal Corporation',
    entity: 'Brihanmumbai Municipal Corporation (BMC)',
    allocated: 150000000,
    status: 'Disbursed',
    date: '05 Jun 2024'
  },
  {
    level: 5,
    title: 'Ward / District Office',
    entity: 'R/North Ward (Dahisar)',
    allocated: 25000000,
    status: 'Disbursed',
    date: '20 Jun 2024'
  },
  {
    level: 6,
    title: 'Implementation / Contractor',
    entity: 'ABC Contractors (Road Resurfacing)',
    allocated: 25000000,
    status: 'Flagged',
    date: '01 Jul 2024',
    alert: 'Completion status mismatch detected via citizen feedback.'
  }
];
