export type ToolCategory = "web" | "iot" | "python" | "react" | "utility" | "desktop";

export interface OpenSourceTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  image: string;
  downloadCount: string;
  version: string;
  lastUpdated: string;
  featured?: boolean;
  isNew?: boolean;

  links: {
    github: string;
    demo?: string;
    download?: string;
    documentation?: string;
  };

  features: string[];
  techStack: string[];

  installation: {
    steps: {
      title: string;
      description?: string;
      code?: string;
      image?: string;
    }[];
    command?: string;
    youtubeId?: string;
  };

  quickStart: string;
  requirements?: string[];
  license: string;
}

export const categories: { id: ToolCategory; label: string; icon: string }[] = [
  { id: "web", label: "Web Apps", icon: "Layout" },
  { id: "iot", label: "IoT Solutions", icon: "Cpu" },
  { id: "python", label: "Python Tools", icon: "Terminal" },
  { id: "react", label: "React Modules", icon: "Component" },
  { id: "utility", label: "Utilities", icon: "Wrench" },
  { id: "desktop", label: "Desktop Apps", icon: "Monitor" },
];

export const openSourceTools: OpenSourceTool[] = [
  {
    id: "oru-erp",
    name: "OruErp",
    tagline: "Comprehensive ERP System for Agencies",
    description: "A centralized ERP ecosystem that unifies project management, lead tracking, and automated financial operations. Architected to solve fragmentation in agency workflows and reduce administrative overhead.",
    category: "web",
    image: "/oruerp.png",
    downloadCount: "500+",
    version: "1.2.0",
    lastUpdated: "2025-11-15",
    featured: true,
    links: {
      github: "https://github.com/Burhanali2211/build",
      demo: "http://oruerp.com/",
    },
    features: [
      "Project & Sprint Management",
      "Automated Financial Reporting",
      "Lead & CRM Tracking",
      "Real-time Collaboration",
      "Resource Allocation Views",
      "Client Portal Access",
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "TanStack Query"],
    installation: {
      steps: [
        { title: "Clone the repository", code: "git clone https://github.com/Burhanali2211/oru-erp.git" },
        { title: "Install dependencies", code: "npm install" },
        { title: "Configure Supabase credentials", description: "Rename .env.example to .env and fill in your Supabase URL and Anon Key." },
        { title: "Run development server", code: "npm run dev" },
      ],
      command: "git clone https://github.com/Burhanali2211/oru-erp.git && npm install",
    },
    quickStart: "1. Clone repo\n2. npm install\n3. Setup .env\n4. npm run dev",
    requirements: ["Node.js 18+", "Supabase Project"],
    license: "MIT",
  },
  {
    id: "easyio-tech",
    name: "Easyio Technologies",
    tagline: "Simplifying Complex Technology",
    description: "A specialized platform accessible automation and scalable digital solutions. Bridges the gap for industries facing high technical barriers to entry in IoT and digital transformation.",
    category: "iot",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    downloadCount: "1.2k",
    version: "2.3.0",
    lastUpdated: "2025-09-20",
    links: {
      github: "https://github.com/Burhanali2211/easyio-tech",
      demo: "https://easyio.tech/",
    },
    features: [
      "IoT Device Integration",
      "Real-time Data Visualization",
      "Automated Workflows",
      "Scalable Cloud Architecture",
      "Secure Device Management",
    ],
    techStack: ["Next.js", "Tailwind CSS", "MQTT", "Node.js", "Express"],
    installation: {
      steps: [
        { title: "Clone the repository", code: "git clone https://github.com/Burhanali2211/easyio-tech.git" },
        { title: "Install dependencies", code: "npm install" },
        { title: "Setup IoT gateway", description: "Configure your MQTT broker settings in the configuration file." },
        { title: "Run the platform", code: "npm run dev" },
      ],
      command: "npm install",
    },
    quickStart: "1. npm install\n2. npm run build\n3. npm start",
    requirements: ["Node.js 20+"],
    license: "Apache-2.0",
  },
  {
    id: "himalayan-spices",
    name: "Himalayan Spices",
    tagline: "Premium Exports to the World",
    description: "An immersive e-commerce experience bridging traditional mountain farming with the global market. established a direct-to-consumer channel for premium herbs and teas.",
    category: "web",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
    downloadCount: "N/A",
    version: "Live",
    lastUpdated: "2025-06-10",
    links: {
      github: "https://github.com/Burhanali2211/himalayan-spices",
      demo: "https://www.himalayanspicesexports.com/",
    },
    features: [
      "International Payment Gateways",
      "Dynamic Product Catalog",
      "Story-driven Brand Experience",
      "Mobile-First Shopping Cart",
      "Automated Shipping Calculation",
    ],
    techStack: ["Shopify", "Liquid", "JavaScript", "SCSS"],
    installation: {
      steps: [
        { title: "Theme Installation", description: "Upload the theme zip file to your Shopify store under Online Store > Themes." },
        { title: "Configure Settings", description: "Customize the theme settings via the Shopify Theme Editor." },
      ],
    },
    quickStart: "Visit the live store.",
    requirements: ["Browser"],
    license: "Proprietary",
  },
  {
    id: "followers-of-14",
    name: "Kalaam Reader",
    tagline: "Preserving Sacred Poetry",
    description: "The #1 destination for Islamic poetry, featuring a multi-lingual database with specialized search for Naats, Nohas, and Marsiyas. Preserving heritage through modern technology.",
    category: "web",
    image: "/followers-of-14.png",
    downloadCount: "10k+",
    version: "3.7.0",
    lastUpdated: "2025-12-01",
    links: {
      github: "https://github.com/Burhanali2211/kalaam-reader",
      demo: "https://followersof14.online/",
    },
    features: [
      "Multi-lingual Search (Urdu, Arabic, Persian)",
      "Audio/Video Media Player",
      "Offline Reading Mode",
      "Community Contribution System",
      "Dark Reading Mode",
    ],
    techStack: ["React", "Next.js", "Vercel", "MongoDB", "Cloudinary"],
    installation: {
      steps: [
        { title: "Clone repo", code: "git clone https://github.com/Burhanali2211/kalaam-reader.git" },
        { title: "Install dependencies", code: "npm install" },
        { title: "Connect MongoDB", description: "Add your MONGODB_URI to the .env.local file." },
        { title: "Run dev server", code: "npm run dev" },
      ],
    },
    quickStart: "1. git clone\n2. npm i\n3. npm run dev",
    requirements: ["Node.js"],
    license: "MIT",
  },
  {
    id: "developers-mindset",
    name: "Devie Education",
    tagline: "Interactive Tech Learning",
    description: "An interactive learning platform featuring curated projects and structured paths. Solves the problem of passive learning by focusing on hands-on project-based mastery.",
    category: "web",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2070&auto=format&fit=crop",
    downloadCount: "5k+",
    version: "2.1.0",
    lastUpdated: "2025-08-14",
    links: {
      github: "https://github.com/Burhanali2211/devie-edu",
      demo: "https://devie-edu.vercel.app/",
    },
    features: [
      "Interactive Code Sandboxes",
      "Progress Tracking System",
      "Project-based Curriculum",
      "Community Discussion Boards",
      "Expert Mentorship Integration",
    ],
    techStack: ["Next.js", "TypeScript", "MDX", "Prisma", "PostgreSQL"],
    installation: {
      steps: [
        { title: "Clone repo", code: "git clone https://github.com/Burhanali2211/devie-edu.git" },
        { title: "Install dependencies", code: "npm install" },
        { title: "Setup Database", code: "npx prisma migrate dev" },
        { title: "Run application", code: "npm run dev" },
      ],
    },
    quickStart: "Start learning immediately on the platform.",
    requirements: ["Web Browser"],
    license: "MIT",
  },
  {
    id: "web-tools-all",
    name: "WebTools Hub",
    tagline: "Ultimate Developer Utility",
    description: "A high-performance productivity suite aggregating essential developer tools like AI text enhancers, image compressors, and converters into a single localized PWA.",
    category: "utility",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    downloadCount: "8.5k",
    version: "4.5.0",
    lastUpdated: "2026-01-22",
    featured: false,
    links: {
      github: "https://github.com/Burhanali2211/web-tools-hub",
      demo: "https://out-psi-kohl.vercel.app/",
    },
    features: [
      "AI Text Enhancement",
      "Local Image Compression",
      "File Format Converters",
      "RegEx Tester",
      "JSON Formatter",
      "Offline PWA Support",
    ],
    techStack: ["React", "WebAssembly", "Tailwind UI", "OpenAI API"],
    installation: {
      steps: [
        { title: "Clone the repo", code: "git clone https://github.com/Burhanali2211/web-tools-hub.git" },
        { title: "Install dependencies", code: "npm install" },
        { title: "Add API keys", description: "Create a .env file and add your OPENAI_API_KEY." },
        { title: "Build for production", code: "npm run build" },
      ],
    },
    quickStart: "Everything runs in the browser.",
    requirements: ["Modern Browser"],
    license: "MIT",
  },
  {
    id: "time-tracker-extension",
    name: "Time Tracker Extension",
    tagline: "Track dev time without leaving the browser",
    description: "A lightweight Chrome extension for tracking time across tasks and projects. 15k+ downloads. Designed for freelancers and developers who want simple time logging without a SaaS subscription.",
    category: "utility",
    image: "/time-tacker.png",
    downloadCount: "15k+",
    version: "1.3.0",
    lastUpdated: "2025-10-30",
    links: {
      github: "https://github.com/Burhanali2211/time-tracker-extension",
      download: "https://github.com/Burhanali2211/time-tracker-extension/releases/download/LastRelease/TimeTracker.zip",
    },
    features: [
      "One-click time tracking per task",
      "Project & task categorization",
      "Daily and weekly time reports",
      "Works offline — no sign-up needed",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Chrome Extension"],
    installation: {
      steps: [
        { title: "Step 1", image: "/Slide1.PNG" },
        { title: "Step 2", image: "/Slide2.PNG" },
        { title: "Step 3", image: "/Slide3.PNG" },
        { title: "Step 4", image: "/Slide4.PNG" },
        { title: "Step 5", image: "/Slide5.PNG" },
        { title: "Step 6", image: "/Slide6.PNG" },
        { title: "Step 7", image: "/Slide7.PNG" },
        { title: "Step 8", image: "/Slide8.PNG" },
        { title: "Step 9", image: "/Slide9.PNG" },
      ],
      youtubeId: "4JlNknXZZUw",
    },
    quickStart: "1. Download ZIP\n2. Enable Chrome Developer Mode\n3. Load unpacked\n4. Start tracking",
    requirements: ["Node.js"],
    license: "MIT",
  },
  {
    id: "segitelep",
    name: "Hi Tech Teleprompter",
    tagline: "Professional desktop teleprompter app",
    description: "SegiTelep is a professional-grade desktop teleprompter application built with Tauri. Features adjustable scroll speed, mirror mode, font customization, and multi-monitor support. Perfect for content creators, presenters, and video producers.",
    category: "desktop",
    image: "/teleprompter.jpeg",
    downloadCount: "520",
    version: "1.2.0",
    lastUpdated: "2025-07-05",
    links: {
      github: "https://github.com/Burhanali2211/SegiTelep",
      download: "https://github.com/Burhanali2211/SegiTelep/releases/download/ThirdRelease/SegiTelep.Pro_1.0.0_x64-setup.exe",
    },
    features: [
      "Adjustable scroll speed",
      "Mirror mode for glass teleprompters",
      "Font size & color customization",
      "Multi-monitor support",
      "Keyboard shortcuts",
      "Lightweight & fast native app",
      "Windows installer (.exe & .msi)",
      "Script import from text files",
    ],
    techStack: ["Rust", "Tauri", "TypeScript", "React", "Tailwind CSS"],
    installation: {
      steps: [
        { title: "Download Installer", description: "Get the latest .exe or .msi from the Releases page." },
        { title: "Run Installer", description: "Double click the downloaded file to install SegiTelep." },
        { title: "Launch", description: "Open SegiTelep from your Start Menu or Desktop." },
        { title: "Start Prompting", description: "Paste your script and hit Play!" },
      ],
      command: "Download: SegiTelep_1.0.0_x64-setup.exe",
    },
    quickStart: "1. Download installer\n2. Install\n3. Load script\n4. Start teleprompter",
    requirements: ["Windows 10/11 x64"],
    license: "MIT",
  },
];

export const totalDownloads = openSourceTools.reduce((acc, tool) => {
  // invalid or N/A
  if (!tool.downloadCount || tool.downloadCount === "N/A") return acc;

  // normalize
  const normalized = tool.downloadCount.toLowerCase().replace(/[^0-9.k]/g, "");

  // parse
  const val = parseFloat(normalized);
  if (isNaN(val)) return acc;

  // multiplier
  const multiplier = normalized.includes("k") ? 1000 : 1;

  return acc + (val * multiplier);
}, 0);
