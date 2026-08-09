export interface Project {
  id: string;
  title: string;
  impactLine: string;
  image: string;
  problem: string;
  whatWasDone: string;
  outcome: string;
  technicalDetails?: string;
  accentColor?: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: "technurture-lms",
    title: "TechNurture Labs",
    impactLine: "The online learning platform students actually love.",
    image: "/technnurture.png",
    problem: "K-12 schools lacked engaging platforms for technical subjects like IoT and full-stack development.",
    whatWasDone: "Built a gamified LMS for K-12 schools across India, featuring real-time analytics and school-wide student management.",
    outcome: "Created an online learning platform students actually love, driving engagement in complex technical subjects.",
    technicalDetails: "LMS, Real-time Analytics, Gamification.",
    accentColor: "#2563eb",
    link: "https://technurturelms.in/"
  },
  {
    id: "orulabs",
    title: "OruLabs",
    impactLine: "Real-Time Live Training Platform for Educators",
    image: "/orulabs.png",
    problem: "Educators relied on passive video lectures that failed to drive real engagement or measure student performance in real time.",
    whatWasDone: "Built a live interactive training platform where educators deliver real-time classes with polling, widgets, analytics, and hybrid support — no downloads needed.",
    outcome: "Replaced passive video tools with an active learning environment, giving educators instant performance data and students a reason to stay engaged.",
    technicalDetails: "React, Real-time Infrastructure, Analytics, SaaS, EdTech.",
    accentColor: "#6366f1",
    link: "https://orulabs.in/"
  },
  {
    id: "oru-erp",
    title: "OruErp",
    impactLine: "Comprehensive ERP System for Agencies",
    image: "/oruerp.png",
    problem: "Agencies struggle with fragmented workflows, manual reporting, and inefficient project tracking across multiple disconnected platforms.",
    whatWasDone: "Architected a central ERP ecosystem that unifies project management, lead tracking, and automated financial operations into a cohesive visual experience.",
    outcome: "Digitally transformed agency logistics, enabling 100% visibility into project health and reducing administrative task-load by over 30%.",
    technicalDetails: "React, TypeScript, Vite, Tailwind CSS, TanStack Query, Supabase for real-time infrastructure.",
    accentColor: "#1e293b",
    link: "http://oruerp.com/"
  },
  {
    id: "easyio-tech",
    title: "Easyio Technologies",
    impactLine: "Simplifying Complex Technology",
    image: "/easyio.png",
    problem: "Industries face high barriers to entry when adopting IoT and digital transformation due to technical complexity and high integration costs.",
    whatWasDone: "Developed a specialized platform focusing on accessible automation and scalable digital solutions for small to medium enterprises.",
    outcome: "Successfully launched multiple IoT initiatives, making complex tech sustainable and accessible for early-stage adopters.",
    technicalDetails: "Next.js, Tailwind CSS, IoT integration, Digital Transformation strategies.",
    accentColor: "#1083a0bd",
    link: "https://easyio.tech/"
  },
  {
    id: "serique-avenue",
    title: "Serique Avenue",
    impactLine: "Premium E-Commerce Experience",
    image: "/serique.png",
    problem: "The brand needed a high-end digital storefront to showcase their premium products with a seamless shopping experience.",
    whatWasDone: "Designed and developed a fully customized e-commerce platform with a focus on aesthetics, performance, and user conversion.",
    outcome: "Delivered a luxurious online shopping destination that elevated the brand identity and streamlined the customer purchasing journey.",
    technicalDetails: "Next.js, E-commerce, UI/UX Design, Payment Integrations.",
    accentColor: "#a38260",
    link: "https://www.seriqueavenue.com/"
  },
  {
    id: "followers-of-14",
    title: "Kalaam Reader",
    impactLine: "Preserving Sacred Poetry",
    image: "/followers-of-14.png",
    problem: "Islamic poetry and recitations were scattered across the web, making it difficult for enthusiasts to find specific lyrics and media.",
    whatWasDone: "Built the #1 destination for Islamic poetry, featuring a multi-lingual database with specialized search for Naats, Nohas, and Marsiyas.",
    outcome: "Centralized thousands of recitations in Urdu, Arabic, and Persian, serving a global community of dedicated followers.",
    technicalDetails: "React, Vercel, Multi-lingual Database, Cloudinary for Media.",
    accentColor: "#10B981",
    link: "https://followersof14.online/"
  },
];
