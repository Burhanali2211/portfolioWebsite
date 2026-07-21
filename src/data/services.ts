import { Globe, Cpu, Plug, BarChart3, Smartphone, Terminal } from "lucide-react";

export interface Service {
  id: string;
  icon: typeof Globe;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  technologies: string[];
  priceRange?: string;
}

export const services: Service[] = [
  {
    id: "web-development",
    icon: Globe,
    title: "Web Application Development",
    shortDescription: "Full-stack React & Python apps that scale with your business",
    fullDescription: "Custom web applications built with React, Next.js, and FastAPI/Django backends. From landing pages and e-commerce stores to complex ERP systems — deployed, documented, and handed over with source code.",
    benefits: [
      "Mobile-first, responsive on all devices",
      "SEO-ready architecture from day one",
      "Supabase or PostgreSQL real-time backends",
      "AI/LLM feature integration on request",
    ],
    technologies: ["React", "Next.js", "FastAPI", "Django", "Supabase", "PostgreSQL"],
    priceRange: "₹25k – ₹2L+",
  },
  {
    id: "iot-solutions",
    icon: Cpu,
    title: "IoT Solutions & Smart Devices",
    shortDescription: "Connected systems that automate and optimize",
    fullDescription: "End-to-end IoT solutions from sensor integration to cloud dashboards. I design and build smart systems for home automation, industrial monitoring, and data collection.",
    benefits: [
      "Real-time monitoring dashboards",
      "Energy-efficient designs",
      "Scalable architecture",
      "Mobile app integration",
    ],
    technologies: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Python"],
    priceRange: "₹40k – ₹3L+",
  },
  {
    id: "api-development",
    icon: Plug,
    title: "API Development & Integration",
    shortDescription: "Seamless connections between systems",
    fullDescription: "RESTful APIs that power your applications. I build robust, well-documented APIs and integrate third-party services to extend your system's capabilities.",
    benefits: [
      "Well-documented endpoints",
      "Rate limiting & security",
      "Webhook integrations",
      "Version management",
    ],
    technologies: ["FastAPI", "Django REST", "Node.js", "GraphQL"],
    priceRange: "₹15k – ₹75k",
  },
  {
    id: "dashboards",
    icon: BarChart3,
    title: "Dashboard & Data Visualization",
    shortDescription: "Complex data made simple and actionable",
    fullDescription: "Interactive dashboards that transform raw data into insights. Perfect for business analytics, IoT monitoring, or any data-driven decision making.",
    benefits: [
      "Real-time data updates",
      "Interactive charts & graphs",
      "Export capabilities",
      "Custom KPI tracking",
    ],
    technologies: ["React", "D3.js", "Recharts", "Python", "SQL"],
    priceRange: "₹20k – ₹1L",
  },
  {
    id: "mobile-first",
    icon: Smartphone,
    title: "Mobile-First Development",
    shortDescription: "Experiences optimized for mobile users",
    fullDescription: "Progressive web apps and mobile-optimized interfaces that work flawlessly on any device. Offline support, push notifications, and native-like experiences.",
    benefits: [
      "PWA capabilities",
      "Offline functionality",
      "Push notifications",
      "App-like experience",
    ],
    technologies: ["React", "PWA", "Service Workers", "Tailwind"],
    priceRange: "₹20k – ₹75k",
  },
  {
    id: "automation",
    icon: Terminal,
    title: "Automation & Scripting",
    shortDescription: "Eliminate repetitive tasks with smart automation",
    fullDescription: "Custom scripts and automation tools that save hours of manual work. From data processing to workflow automation, I build tools that work while you sleep.",
    benefits: [
      "Time savings",
      "Error reduction",
      "Scheduled tasks",
      "Integration with existing tools",
    ],
    technologies: ["Python", "Bash", "Cron", "APIs"],
    priceRange: "₹10k – ₹50k",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Discovery",
    description: "We discuss your needs, goals, and constraints to understand the full picture.",
  },
  {
    step: 2,
    title: "Planning",
    description: "I create a detailed roadmap with milestones, deliverables, and timelines.",
  },
  {
    step: 3,
    title: "Development",
    description: "Building with regular updates and feedback loops to ensure we're on track.",
  },
  {
    step: 4,
    title: "Launch & Support",
    description: "Deployment with documentation and ongoing support as needed.",
  },
];

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "A landing page or small website: 1–2 weeks. A web application with database and auth: 4–8 weeks. A full ERP or LMS platform: 2–4 months. You'll get a written timeline with milestones before any work begins — no surprises.",
  },
  {
    question: "What are your payment terms?",
    answer: "50% upfront, 50% on delivery. For larger projects (₹75k+), I split into 3 milestones: 40% start, 30% mid, 30% final. Payments via UPI, bank transfer, or Razorpay. No full payment upfront, ever.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes. Monthly retainer plans start at ₹5k/month covering bug fixes, security patches, and minor updates. For production applications, I strongly recommend at least a 3-month post-launch retainer.",
  },
  {
    question: "How do you communicate during a project?",
    answer: "Primary: WhatsApp for quick updates and daily check-ins. Weekly: a written progress summary. Calls on request. You'll always know what's built, what's next, and what's blocked — no radio silence.",
  },
  {
    question: "Can you work with my existing codebase?",
    answer: "Yes. I've extended and refactored codebases in React, Next.js, Django, and Node.js. I'll audit the code first, give you an honest assessment of its state, then quote accordingly. No hidden costs once work begins.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, before any sensitive discussion. Send me a message on WhatsApp or email and I'll review and sign within 24 hours. Your idea, your IP.",
  },
];
