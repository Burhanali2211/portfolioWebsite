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
    shortDescription: "Full-stack solutions that scale with your business",
    fullDescription: "Custom web applications built with modern technologies. From simple landing pages to complex enterprise systems, I create solutions that are fast, secure, and user-friendly.",
    benefits: [
      "Responsive design for all devices",
      "SEO-optimized architecture",
      "Fast loading times",
      "Secure authentication",
    ],
    technologies: ["React", "Next.js", "Django", "FastAPI", "PostgreSQL"],
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
    answer: "It depends on complexity. Simple websites take 1-2 weeks, while complex applications can take 1-3 months. I'll provide a timeline estimate after our initial discussion.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes! I offer maintenance packages for keeping your application updated, secure, and running smoothly. This includes bug fixes, security updates, and minor feature additions.",
  },
  {
    question: "What's your communication style during projects?",
    answer: "I believe in regular updates. You'll receive weekly progress reports, and I'm available for calls when needed. I use clear documentation so you always know what's happening.",
  },
  {
    question: "Can you work with my existing codebase?",
    answer: "Absolutely. I can audit, refactor, or extend existing projects. I'll assess the current state and recommend the best approach forward.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, I'm happy to sign NDAs before discussing sensitive project details. Your ideas and business information are safe with me.",
  },
];
