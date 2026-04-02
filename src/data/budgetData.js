export const summaryData = [
  {
    id: 1,
    title: "Fiscal Deficit Targeted at 4.5%",
    description: "The government has committed to reducing the fiscal deficit to 4.5% of GDP by 2026, marking a significant consolidation path.",
    icon: "TrendingDown"
  },
  {
    id: 2,
    title: "Capex Boost of ₹12 Lakh Crore",
    description: "Capital expenditure has been increased to ₹12 Lakh Crore, with a primary focus on infrastructure, digital public goods, and green energy.",
    icon: "Building2"
  },
  {
    id: 3,
    title: "New Tax Regime Enhancements",
    description: "Standard deduction increased to ₹75,000 in the new tax regime, and income up to ₹8 Lakhs is now effectively tax-free.",
    icon: "Wallet"
  },
  {
    id: 4,
    title: "AI & Startup Ecosystem Fund",
    description: "A specialized ₹20,000 crore fund established strictly for AI innovation and deep-tech startups over the next five years.",
    icon: "Cpu"
  }
];

export const professionsData = [
  {
    profession: "Salaried Employees",
    highlights: [
      "Standard deduction raised to ₹75,000.",
      "No tax on income up to ₹8 Lakh under new regime.",
      "Work-from-home allowance tax exemption proposed.",
      "Provident fund employer contribution limits expanded."
    ],
    impact: "Positive"
  },
  {
    profession: "Business & MSMEs",
    highlights: [
      "Presumptive taxation limit increased to ₹4 Crore for small businesses.",
      "Corporate tax for new manufacturing units maintained at 15%.",
      "Ease of doing business portal 2.0 launched.",
      "Mandatory MSME payment clearance strictly enforced to 30 days."
    ],
    impact: "Highly Positive"
  },
  {
    profession: "Farmers & Agriculture",
    highlights: [
      "PM-KISAN payout proposed to increase from ₹6,000 to ₹8,000 annually.",
      "Massive push for Drone ecosystem in farming (Kisan Drones).",
      "Subsidized loans limit extended for agri-tech adoptions.",
      "New crop insurance schemes against climate volatility."
    ],
    impact: "Positive"
  },
  {
    profession: "Startups & Freelancers",
    highlights: [
      "Tax holiday for startups incorporated before 2027.",
      "Angel tax completely abolished across all tiers.",
      "Freelancer presumed income declaration limit increased to ₹75 Lakh.",
      "Lowered compliance hurdles for GST on small-scale service exports."
    ],
    impact: "Highly Positive"
  }
];

export const lawsData = [
  {
    title: "Personal Income Tax Slabs (New Regime 2026)",
    details: [
      { range: "0 - ₹4 Lakh", rate: "Nil" },
      { range: "₹4 Lakh - ₹8 Lakh", rate: "5%" },
      { range: "₹8 Lakh - ₹12 Lakh", rate: "10%" },
      { range: "₹12 Lakh - ₹16 Lakh", rate: "15%" },
      { range: "₹16 Lakh - ₹20 Lakh", rate: "20%" },
      { range: "Above ₹20 Lakh", rate: "30%" }
    ],
    note: "Income up to ₹8 Lakhs effectively tax-free after rebate."
  },
  {
    title: "Customs & Indirect Taxes",
    details: [
      { range: "Mobile parts & EV batteries", rate: "Reduced to 5%" },
      { range: "Gold & Precious Metals", rate: "Increased by 2%" },
      { range: "Imported luxury goods", rate: "Surcharge increased" },
      { range: "Solar string invertors", rate: "Reduced to 10%" }
    ],
    note: "Focus on domestic manufacturing and green energy transition."
  }
];

export const comparativeChartData = [
  { name: "2024", capex: 10, health: 0.89, defense: 5.94 },
  { name: "2025", capex: 11.1, health: 0.95, defense: 6.2 },
  { name: "2026", capex: 12.0, health: 1.1, defense: 6.8 }
];

export const chatbotFaqs = [
  {
    keywords: ["tax free", "limit", "no tax", "8 lakh"],
    answer: "For the year 2026, income up to ₹8 Lakhs is effectively tax-free under the new tax regime due to rebates. Additionally, the standard deduction has been increased to ₹75,000."
  },
  {
    keywords: ["startup", "angel tax", "freelancer"],
    answer: "Great news for startups! The Angel Tax has been completely abolished. Startups incorporated before 2027 get a tax holiday, and freelancers can now declare presumed income up to ₹75 Lakh."
  },
  {
    keywords: ["farmer", "agriculture", "kisan"],
    answer: "For farmers, the PM-KISAN payout has increased from ₹6,000 to ₹8,000 annually. There is also a huge push for 'Kisan Drones' and subsidized agri-tech loans."
  },
  {
    keywords: ["business", "msme", "corporate"],
    answer: "MSMEs benefit from an increased presumptive taxation limit of ₹4 Crore. Corporate tax for new manufacturing remains at 15%, and MSME payments must be cleared strictly in 30 days."
  },
  {
    keywords: ["deduction", "standard deduction"],
    answer: "The standard deduction for salaried employees has been raised to ₹75,000 under the new tax regime."
  }
];
