export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Liveable AI - Find Your Perfect Neighborhood",
  description: "Make informed housing decisions with AI-powered livability scores.",
  language: "en",
};

export const navigationConfig = {
  logo: "Liveable AI",
  items: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Us", href: "#about" },
    { label: "Pricing", href: "#pricing" },
  ],
};

export const heroConfig = {
  title: "Find Your Perfect Home Based on Life Quality",
  subtitle: "Make informed housing decisions with AI-powered livability scores. Understand noise levels, safety, air quality, and neighborhood comfort before you move.",
  backgroundImage: "/hero-main.jpg", // Restored your original image
  primaryButtonText: "Try Liveable AI",
  secondaryButtonText: "Learn More",
};

export const problemConfig = {
  title: "The Problem We Solve",
  description: "Choosing a home is one of life's biggest decisions, yet most people lack access to critical information about their future neighborhood's quality of life.",
  image: "/about-2.jpg", // Restored your original image
  problems: [
    {
      icon: "AlertTriangle",
      title: "Hidden Environmental Risks",
      description: "Noise levels, air quality, and safety issues are often discovered only after moving in.",
    },
    {
      icon: "DollarSign",
      title: "Price-Focused Platforms",
      description: "Traditional real estate sites focus on investment value, ignoring daily living comfort.",
    },
    {
      icon: "Clock",
      title: "Time-Consuming Research",
      description: "Vital information is scattered across multiple sources and hard to interpret.",
    },
  ],
};

export const featuresConfig = {
  title: "Why Choose Liveable AI?",
  description: "We go beyond property prices to give you the complete picture of what living in a neighborhood truly feels like.",
  features: [
    {
      icon: "Brain",
      title: "AI-Powered Analysis",
      description: "Machine learning models predict noise and crime trends based on temporal patterns throughout the day.",
    },
    {
      icon: "Shield",
      title: "Safety Scoring",
      description: "Real-time safety metrics using official data from AFAD and local authorities to assess neighborhood security.",
    },
    {
      icon: "Volume2",
      title: "Temporal Noise Data",
      description: "Unlike static tools, we show how noise and activity levels change from morning to night in your area.",
    },
    {
      icon: "Leaf",
      title: "Air Quality & Environment",
      description: "Track environmental conditions and air quality that directly affect your daily comfort and health.",
    },
    {
      icon: "MapPin",
      title: "Sociocultural Clustering",
      description: "Discover pet-friendly, family-oriented, or lifestyle-specific neighborhoods tailored to your needs.",
    },
    {
      icon: "TrendingUp",
      title: "Personalized Recommendations",
      description: "Get practical advice like soundproofing suggestions or better commute times to improve your quality of life.",
    },
  ],
};

export const howItWorksConfig = {
  title: "How It Works",
  description: "Four simple steps to find your perfect neighborhood",
  steps: [
    {
      icon: "Search",
      title: "Search Your Area",
      description: "Enter the neighborhood or address you're considering for your next home.",
    },
    {
      icon: "Sliders",
      title: "Set Your Priorities",
      description: "Customize what matters most to you: safety, quietness, air quality, or family-friendliness.",
    },
    {
      icon: "BarChart3",
      title: "Get Your Livability Score",
      description: "Receive a comprehensive score with detailed breakdowns of all quality-of-life factors.",
    },
    {
      icon: "Home",
      title: "Make Confident Decisions",
      description: "Move forward with data-backed insights and practical recommendations for your new home.",
    },
  ],
};

export const aboutConfig = {
  title: "About Us",
  description: "Team BIM is dedicated to transforming how people choose their homes through innovative technology and data-driven insights.",
  image: "/about-1.jpg", // Restored your original image
  mission: "We believe that choosing a home should be based on more than just price and location. By making complex urban data accessible and understandable, we help people make healthier, safer choices that improve their long-term well-being.",
  goals: [
    {
      title: "Our Goal",
      description: "Reduce the risk of moving to unsuitable neighborhoods by highlighting hidden environmental risks.",
      icon: "Target",
    },
    {
      title: "Innovation",
      description: "First platform in Turkey to combine multi-source data into personalized livability scores.",
      icon: "Award",
    },
  ],
  team: [
    {
      name: "İrem Kalay",
      role: "Lead - Machine Learning & Data Analysis",
      description: "Responsible for building the core Livability Index and testing predictive models.",
      image: "/team-irem.jpg", 
    },
    {
      name: "Berra Mutlu",
      role: "Backend Engineering & Database Design",
      description: "Ensures system stability and processes large amounts of urban data correctly.",
      image: "/team-berra.jpg",
    },
    {
      name: "Muhammet Can Özkurt",
      role: "Frontend Development & UX Research",
      description: "Focuses on the overall look and user experience of the mobile platform.",
      image: "/team-can.jpg",
    },
  ],
  technology: [
    "Cloud-hosted PostgreSQL with PostGIS for geographic data",
    "Python backend with pandas and geopandas",
    "Machine learning models for noise and crime prediction",
    "React Native mobile app for iOS and Android",
  ],
  partners: [
    "Municipal governments and city data portals",
    "AFAD for earthquake and safety data",
    "Real estate platforms (Sahibinden, Emlakjet)",
    "University research labs for model validation",
  ]
};

export const pricingConfig = {
  title: "Simple, Transparent Pricing",
  subtitle: "Start with our free basic scores, then unlock detailed insights for just $5 per report",
  plans: [
    {
      id: 1,
      name: "Free",
      price: 0,
      unit: "",
      description: "Perfect for exploring neighborhoods",
      featured: false,
      features: [
        "Basic livability scores",
        "View overall neighborhood ratings",
        "Access to public data",
        "Limited area comparisons",
        "Community insights",
      ],
      cta: "Get Started",
    },
    {
      id: 2,
      name: "Detailed Report",
      price: 5,
      unit: "report",
      description: "Complete insights for your next move",
      featured: true,
      features: [
        "Everything in Free",
        "Detailed livability breakdown",
        "Temporal noise analysis",
        "Safety and crime predictions",
        "Air quality metrics",
        "Personalized recommendations",
        "Soundproofing suggestions",
        "Commute time optimization",
        "Confidence score indicators",
        "Downloadable PDF report",
      ],
      cta: "Buy Report",
    },
    {
      id: 3,
      name: "Premium",
      price: 15,
      unit: "month",
      description: "For professionals and planners",
      featured: false,
      features: [
        "Everything in Detailed Report",
        "Multiple area comparisons",
        "Advanced simulation tools",
        "Historical data trends",
        "Priority support",
        "API access (coming soon)",
        "Custom alerts",
        "Neighborhood change tracking",
      ],
      cta: "Coming Soon",
    },
  ],
};

export const ctaConfig = {
  title: "Ready to Find Your Perfect Neighborhood?",
  description: "Join thousands of users making smarter housing decisions with Liveable AI. Start with our free basic scores today.",
  image: "/contact.jpg", // Restored your original image
  primaryButton: "Get Started Free",
  secondaryButton: "Contact Us",
  note: "Launching in Istanbul, Turkey • Expanding to more cities soon"
};

export const footerConfig = {
  tagline: "Making housing decisions smarter with AI-powered livability insights.",
  copyright: `© ${new Date().getFullYear()} Liveable AI - Team BIM. All rights reserved.`,
  productLinks: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  companyLinks: [
    { label: "About Us", href: "#about" },
    { label: "Team", href: "#about" },
    { label: "Contact", href: "#cta" },
  ],
  socialLinks: [
    { icon: "Mail", href: "mailto:team@liveableai.com" },
    { icon: "Linkedin", href: "#" },
    { icon: "Github", href: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "KVKK Compliance", href: "#" },
  ]
};