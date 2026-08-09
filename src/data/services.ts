import { Globe, Cpu, Plug, BarChart3, Smartphone, Terminal } from "lucide-react";

export interface Service {
  id: string;
  icon: typeof Globe;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
}

export const services: Service[] = [
  {
    id: "web-development",
    icon: Globe,
    title: "Custom Web Platforms",
    shortDescription: "Stop fighting software that doesn't fit your business.",
    fullDescription: "Off-the-shelf tools force you to change how you work. I build custom web applications—from internal portals to specialized CRMs—that map exactly to your unique processes and help you scale efficiently.",
    benefits: [
      "Replace messy spreadsheets with secure systems",
      "Automate data entry and reporting",
      "Software that grows exactly as you do",
    ],
  },
  {
    id: "iot-solutions",
    icon: Cpu,
    title: "Hardware & IoT Systems",
    shortDescription: "Connect physical operations to digital insights.",
    fullDescription: "Blind spots in physical operations cost money. I design custom IoT and hardware solutions that monitor environments, track assets, and control devices remotely, giving you real-time visibility.",
    benefits: [
      "Real-time alerts for critical failures",
      "Automate manual monitoring tasks",
      "Reduce energy and operational waste",
    ],
  },
  {
    id: "api-development",
    icon: Plug,
    title: "API & Integrations",
    shortDescription: "Make your disconnected tools talk to each other.",
    fullDescription: "Copy-pasting data between different apps wastes time and causes errors. I build robust APIs and integrations that seamlessly sync data across your entire tech stack.",
    benefits: [
      "Eliminate manual data entry across systems",
      "Create a single source of truth for data",
      "Automate cross-platform workflows",
    ],
  },
  {
    id: "dashboards",
    icon: BarChart3,
    title: "Data Dashboards",
    shortDescription: "Turn overwhelming data into actionable clarity.",
    fullDescription: "Having raw data isn't enough if you can't understand it. I build fast, interactive dashboards that visualize your key metrics so you can make confident, informed business decisions.",
    benefits: [
      "Spot trends and bottlenecks instantly",
      "Consolidate metrics in one clean view",
      "Stop waiting for weekly manual reports",
    ],
  },
  {
    id: "mobile-first",
    icon: Smartphone,
    title: "Mobile Experiences",
    shortDescription: "Engage users where they spend their time.",
    fullDescription: "A clunky mobile experience loses customers fast. I develop lightning-fast Progressive Web Apps (PWAs) and mobile-optimized interfaces that feel native, work offline, and keep users engaged.",
    benefits: [
      "Reach customers on any device seamlessly",
      "Send push notifications for retention",
      "Functionality even with poor internet connection",
    ],
  },
  {
    id: "automation",
    icon: Terminal,
    title: "Workflow Automation",
    shortDescription: "Eliminate repetitive tasks that drain your time.",
    fullDescription: "Your team is too valuable to spend hours on repetitive admin work. I write custom automation scripts that handle data processing, file management, and routine tasks in the background.",
    benefits: [
      "Reclaim hours of lost productivity weekly",
      "Remove costly human errors from routines",
      "Run crucial tasks 24/7 without manual input",
    ],
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
