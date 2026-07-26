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
,
  {
    id: "aah",
    name: "aah",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-22",
    links: {
      github: "https://github.com/Burhanali2211/aah",
      demo: "https://aah-teal.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/aah.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/aah.git",
    license: "MIT"
  },
  {
    id: "age-calculator",
    name: "Age-Calculator",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-25",
    links: {
      github: "https://github.com/Burhanali2211/Age-Calculator",
      demo: "https://my-server-inky.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Age-Calculator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Age-Calculator.git",
    license: "MIT"
  },
  {
    id: "ai-camera",
    name: "AI-Camera",
    tagline: "This provides real-time audio feedback on the posi...",
    description: "This provides real-time audio feedback on the position of a person within a video frame to help them adjust their position while recording.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-11-17",
    links: {
      github: "https://github.com/Burhanali2211/AI-Camera",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/AI-Camera.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/AI-Camera.git",
    license: "MIT License"
  },
  {
    id: "ai-code-reviewer",
    name: "AI-Code-Reviewer",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-25",
    links: {
      github: "https://github.com/Burhanali2211/AI-Code-Reviewer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/AI-Code-Reviewer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/AI-Code-Reviewer.git",
    license: "MIT License"
  },
  {
    id: "ai-gradio",
    name: "ai-gradio",
    tagline: "A Python package that makes it easy for developers...",
    description: "A Python package that makes it easy for developers to create AI apps powered by various AI providers. ",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/ai-gradio",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ai-gradio.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ai-gradio.git",
    license: "MIT"
  },
  {
    id: "ai4free-wrapper",
    name: "ai4free-wrapper",
    tagline: "A Free AI OpenAI compatible API for Different AI m...",
    description: "A Free AI OpenAI compatible API for Different AI models like GPT-4o, Claude 3.7 Sonnet, Deepseek R1, o3-mini, etc",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-03-12",
    links: {
      github: "https://github.com/Burhanali2211/ai4free-wrapper",
      demo: "https://beta.sree.shop/v1/models",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ai4free-wrapper.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ai4free-wrapper.git",
    license: "MIT License"
  },
  {
    id: "ai_background_remover",
    name: "AI_Background_Remover",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-24",
    links: {
      github: "https://github.com/Burhanali2211/AI_Background_Remover",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/AI_Background_Remover.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/AI_Background_Remover.git",
    license: "MIT License"
  },
  {
    id: "alaramtimer",
    name: "AlaramTimer",
    tagline: "Alarm Timer is a simple Python-based program that ...",
    description: "Alarm Timer is a simple Python-based program that lets users set an alarm with a custom time delay (in seconds). The program displays a countdown of the remaining time and plays a specified sound once the alarm time is reached. It uses the playsound library to play the alarm sound, making it a useful tool for reminders or as a basic alarm system.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/AlaramTimer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/AlaramTimer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/AlaramTimer.git",
    license: "MIT"
  },
  {
    id: "atlas",
    name: "Atlas",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-24",
    links: {
      github: "https://github.com/Burhanali2211/Atlas",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Atlas.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Atlas.git",
    license: "MIT License"
  },
  {
    id: "automated-screenshot-screen-recorder",
    name: "Automated-Screenshot-Screen-Recorder",
    tagline: "A Python program that can take automated screensho...",
    description: "A Python program that can take automated screenshots at regular intervals or record the screen based on user-defined settings.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-14",
    links: {
      github: "https://github.com/Burhanali2211/Automated-Screenshot-Screen-Recorder",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Automated-Screenshot-Screen-Recorder.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Automated-Screenshot-Screen-Recorder.git",
    license: "MIT"
  },
  {
    id: "automaticinvoicegenerator",
    name: "AutomaticInvoiceGenerator",
    tagline: "A GUI-based PDF Invoice Generator that allows user...",
    description: "A GUI-based PDF Invoice Generator that allows users to enter invoice details through a simple interface and automatically generates a professionally formatted PDF invoice",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/AutomaticInvoiceGenerator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/AutomaticInvoiceGenerator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/AutomaticInvoiceGenerator.git",
    license: "MIT"
  },
  {
    id: "backend_",
    name: "backend_",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-27",
    links: {
      github: "https://github.com/Burhanali2211/backend_",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/backend_.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/backend_.git",
    license: "MIT"
  },
  {
    id: "btp",
    name: "btp",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-01-14",
    links: {
      github: "https://github.com/Burhanali2211/btp",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/btp.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/btp.git",
    license: "MIT"
  },
  {
    id: "build-your-own-x",
    name: "build-your-own-x",
    tagline: "Master programming by recreating your favorite tec...",
    description: "Master programming by recreating your favorite technologies from scratch.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-08",
    links: {
      github: "https://github.com/Burhanali2211/build-your-own-x",
      demo: "https://codecrafters.io",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/build-your-own-x.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/build-your-own-x.git",
    license: "MIT"
  },
  {
    id: "burhanali2211",
    name: "Burhanali2211",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-05-17",
    links: {
      github: "https://github.com/Burhanali2211/Burhanali2211",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Burhanali2211.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Burhanali2211.git",
    license: "MIT"
  },
  {
    id: "burpsuite-professional",
    name: "Burpsuite-Professional",
    tagline: "Latest Burpsuite Professional v2025.1.*...",
    description: "Latest Burpsuite Professional v2025.1.*",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Burpsuite-Professional",
      demo: "https://portswigger-cdn.net/burp/releases/download?product=pro&version=&type=Jar",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Burpsuite-Professional.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Burpsuite-Professional.git",
    license: "MIT"
  },
  {
    id: "calculator",
    name: "Calculator",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-01-24",
    links: {
      github: "https://github.com/Burhanali2211/Calculator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Calculator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Calculator.git",
    license: "MIT"
  },
  {
    id: "chat-app",
    name: "Chat-App",
    tagline: "a simple chat app using the pyqt6...",
    description: "a simple chat app using the pyqt6",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-20",
    links: {
      github: "https://github.com/Burhanali2211/Chat-App",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Chat-App.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Chat-App.git",
    license: "MIT License"
  },
  {
    id: "chat-bot",
    name: "Chat-Bot",
    tagline: " A simple AI-powered chatbot that interacts with u...",
    description: " A simple AI-powered chatbot that interacts with users by taking their questions and fetching responses from the Gemini API",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-20",
    links: {
      github: "https://github.com/Burhanali2211/Chat-Bot",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Chat-Bot.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Chat-Bot.git",
    license: "MIT License"
  },
  {
    id: "color-detection",
    name: "Color-Detection",
    tagline: " A simple color detection application using Python...",
    description: " A simple color detection application using Python, Pandas, and OpenCV",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-21",
    links: {
      github: "https://github.com/Burhanali2211/Color-Detection",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Color-Detection.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Color-Detection.git",
    license: "MIT License"
  },
  {
    id: "craft-connect",
    name: "Craft-Connect",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-07",
    links: {
      github: "https://github.com/Burhanali2211/Craft-Connect",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["JavaScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Craft-Connect.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Craft-Connect.git",
    license: "MIT"
  },
  {
    id: "cristy",
    name: "Cristy",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2023-03-19",
    links: {
      github: "https://github.com/Burhanali2211/Cristy",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Cristy.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Cristy.git",
    license: "MIT"
  },
  {
    id: "cursor-free-vip",
    name: "cursor-free-vip",
    tagline: "[Support 0.46.10]（Reset Cursor AI MachineID & Auto...",
    description: "[Support 0.46.10]（Reset Cursor AI MachineID & Auto Sign Up / In）自动注册 Cursor Ai ，自动重置机器ID ， 免费升级使用Pro功能: You've reached your trial request limit. / Too many free trial accounts used on this machine. Please upgrade to pro. We have this limit in place to prevent abuse. Please let us know if you believe this is a mistake.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-03-13",
    links: {
      github: "https://github.com/Burhanali2211/cursor-free-vip",
      demo: "https://www.cursor.com/",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/cursor-free-vip.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/cursor-free-vip.git",
    license: "Other"
  },
  {
    id: "cursorplus",
    name: "CursorPlus",
    tagline: "Enables source file where you can edit and improve...",
    description: "Enables source file where you can edit and improve your own cursor ide",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/CursorPlus",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/CursorPlus.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/CursorPlus.git",
    license: "MIT"
  },
  {
    id: "dokploy",
    name: "dokploy",
    tagline: "Open Source Alternative to Vercel, Netlify and Her...",
    description: "Open Source Alternative to Vercel, Netlify and Heroku.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-06-13",
    links: {
      github: "https://github.com/Burhanali2211/dokploy",
      demo: "https://dokploy.com/",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/dokploy.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/dokploy.git",
    license: "Other"
  },
  {
    id: "droneairth",
    name: "DroneAiRTH",
    tagline: "LSTM-powered autonomous drone intelligence for GPS...",
    description: "LSTM-powered autonomous drone intelligence for GPS/RC jamming detection and recovery. Real-time MAVLink integration | ArduPilot/PX4 compatible | Raspberry Pi deployment ready",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-05-12",
    links: {
      github: "https://github.com/Burhanali2211/DroneAiRTH",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/DroneAiRTH.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/DroneAiRTH.git",
    license: "MIT"
  },
  {
    id: "e-commerce-website",
    name: "e-commerce-website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-06-06",
    links: {
      github: "https://github.com/Burhanali2211/e-commerce-website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/e-commerce-website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/e-commerce-website.git",
    license: "MIT"
  },
  {
    id: "early-landslide-detection-system",
    name: "Early-Landslide-Detection-System",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-08",
    links: {
      github: "https://github.com/Burhanali2211/Early-Landslide-Detection-System",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["HTML"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Early-Landslide-Detection-System.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Early-Landslide-Detection-System.git",
    license: "MIT"
  },
  {
    id: "easio-school",
    name: "easio-school",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-18",
    links: {
      github: "https://github.com/Burhanali2211/easio-school",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/easio-school.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/easio-school.git",
    license: "MIT"
  },
  {
    id: "easiolabs",
    name: "Easiolabs",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-06-08",
    links: {
      github: "https://github.com/Burhanali2211/Easiolabs",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Easiolabs.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Easiolabs.git",
    license: "MIT"
  },
  {
    id: "easyio.tech",
    name: "easyio.tech",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-28",
    links: {
      github: "https://github.com/Burhanali2211/easyio.tech",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/easyio.tech.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/easyio.tech.git",
    license: "MIT"
  },
  {
    id: "easyiotech",
    name: "easyiotech",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-28",
    links: {
      github: "https://github.com/Burhanali2211/easyiotech",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/easyiotech.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/easyiotech.git",
    license: "MIT"
  },
  {
    id: "easyio_upgrade",
    name: "easyio_upgrade",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-12-30",
    links: {
      github: "https://github.com/Burhanali2211/easyio_upgrade",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/easyio_upgrade.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/easyio_upgrade.git",
    license: "MIT"
  },
  {
    id: "ecommerce",
    name: "ecommerce",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-03-22",
    links: {
      github: "https://github.com/Burhanali2211/ecommerce",
      demo: "https://ecommerce-eta-vert.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ecommerce.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ecommerce.git",
    license: "MIT"
  },
  {
    id: "ecommerce-website",
    name: "ecommerce-website",
    tagline: "A modern ecommerce website built with React, featu...",
    description: "A modern ecommerce website built with React, featuring product listings, shopping cart, and secure checkout functionality.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/ecommerce-website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["JavaScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ecommerce-website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ecommerce-website.git",
    license: "MIT"
  },
  {
    id: "educate-dmd",
    name: "educate-dmd",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/educate-dmd",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/educate-dmd.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/educate-dmd.git",
    license: "MIT"
  },
  {
    id: "educational-platform",
    name: "educational-platform",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/educational-platform",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/educational-platform.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/educational-platform.git",
    license: "MIT"
  },
  {
    id: "eid-greeting-generator",
    name: "eid-greeting-generator",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/eid-greeting-generator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/eid-greeting-generator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/eid-greeting-generator.git",
    license: "MIT"
  },
  {
    id: "eit_sms",
    name: "eit_sms",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-10-04",
    links: {
      github: "https://github.com/Burhanali2211/eit_sms",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/eit_sms.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/eit_sms.git",
    license: "MIT"
  },
  {
    id: "emu",
    name: "emu",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-07-22",
    links: {
      github: "https://github.com/Burhanali2211/emu",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/emu.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/emu.git",
    license: "MIT"
  },
  {
    id: "evolution-api",
    name: "evolution-api",
    tagline: "Evolution API is an open-source WhatsApp integrati...",
    description: "Evolution API is an open-source WhatsApp integration API",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-06-17",
    links: {
      github: "https://github.com/Burhanali2211/evolution-api",
      demo: "https://evolutionfoundation.com.br",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/evolution-api.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/evolution-api.git",
    license: "Other"
  },
  {
    id: "expensestracker",
    name: "ExpensesTracker",
    tagline: "Expense Tracker is a lightweight Python applicatio...",
    description: "Expense Tracker is a lightweight Python application that helps users log their daily expenses, categorize spending, and view summaries. It provides a simple way to manage personal finances and track where money is going.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/ExpensesTracker",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ExpensesTracker.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ExpensesTracker.git",
    license: "MIT"
  },
  {
    id: "f14",
    name: "f14",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-04-05",
    links: {
      github: "https://github.com/Burhanali2211/f14",
      demo: "https://f14-navy.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/f14.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/f14.git",
    license: "MIT"
  },
  {
    id: "fastmcp",
    name: "fastmcp",
    tagline: "🚀 The fast, Pythonic way to build MCP servers and ...",
    description: "🚀 The fast, Pythonic way to build MCP servers and clients",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-02-18",
    links: {
      github: "https://github.com/Burhanali2211/fastmcp",
      demo: "https://gofastmcp.com",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/fastmcp.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/fastmcp.git",
    license: "Apache License 2.0"
  },
  {
    id: "fibonacci-generator",
    name: "Fibonacci-Generator",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-23",
    links: {
      github: "https://github.com/Burhanali2211/Fibonacci-Generator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Fibonacci-Generator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Fibonacci-Generator.git",
    license: "MIT"
  },
  {
    id: "file-renamer",
    name: "File-Renamer",
    tagline: "a powerful tool best for web developers that allow...",
    description: "a powerful tool best for web developers that allows to rename files in bulk using a user-friendly GUI.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/File-Renamer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/File-Renamer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/File-Renamer.git",
    license: "MIT"
  },
  {
    id: "fileorganizer",
    name: "FileOrganizer",
    tagline: "this app is a CLI (command line user interface) ba...",
    description: "this app is a CLI (command line user interface) based which organizes around 40 + file formats and make you files clean and well organized",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/FileOrganizer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/FileOrganizer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/FileOrganizer.git",
    license: "MIT"
  },
  {
    id: "filessearchengine",
    name: "FilesSearchEngine",
    tagline: "A fast and efficient file search tool that finds f...",
    description: "A fast and efficient file search tool that finds files by name, extension, or content inside text and PDF files, with a simple GUI and multi-threaded performance.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/FilesSearchEngine",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/FilesSearchEngine.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/FilesSearchEngine.git",
    license: "MIT"
  },
  {
    id: "filesystem",
    name: "FileSystem",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-25",
    links: {
      github: "https://github.com/Burhanali2211/FileSystem",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["HTML"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/FileSystem.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/FileSystem.git",
    license: "MIT License"
  },
  {
    id: "final-version",
    name: "FINAL-VERSION",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2023-09-12",
    links: {
      github: "https://github.com/Burhanali2211/FINAL-VERSION",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/FINAL-VERSION.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/FINAL-VERSION.git",
    license: "MIT"
  },
  {
    id: "followers-0f-14",
    name: "followers-0f-14",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-12-11",
    links: {
      github: "https://github.com/Burhanali2211/followers-0f-14",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/followers-0f-14.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/followers-0f-14.git",
    license: "MIT"
  },
  {
    id: "forza_controller",
    name: "forza_controller",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-11-09",
    links: {
      github: "https://github.com/Burhanali2211/forza_controller",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["C++"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/forza_controller.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/forza_controller.git",
    license: "MIT"
  },
  {
    id: "fritzing-resources",
    name: "Fritzing-Resources",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-03-21",
    links: {
      github: "https://github.com/Burhanali2211/Fritzing-Resources",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Fritzing-Resources.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Fritzing-Resources.git",
    license: "MIT"
  },
  {
    id: "full-stack-website",
    name: "full-stack-website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/full-stack-website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/full-stack-website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/full-stack-website.git",
    license: "MIT"
  },
  {
    id: "gesturesketch",
    name: "GestureSketch",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-01-24",
    links: {
      github: "https://github.com/Burhanali2211/GestureSketch",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/GestureSketch.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/GestureSketch.git",
    license: "MIT"
  },
  {
    id: "gesturesketchpro",
    name: "GestureSketchPro",
    tagline: "This is an AI-powered hand gesture recognition sys...",
    description: "This is an AI-powered hand gesture recognition system that allows users to draw mathematical equations or shapes in the air using hand gestures,",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-20",
    links: {
      github: "https://github.com/Burhanali2211/GestureSketchPro",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/GestureSketchPro.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/GestureSketchPro.git",
    license: "MIT"
  },
  {
    id: "gesture_sketch_sbx",
    name: "gesture_sketch_sbx",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2024-07-23",
    links: {
      github: "https://github.com/Burhanali2211/gesture_sketch_sbx",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/gesture_sketch_sbx.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/gesture_sketch_sbx.git",
    license: "MIT"
  },
  {
    id: "guessthenumber",
    name: "GuessTheNumber",
    tagline: "A simple Python program where users guess a random...",
    description: "A simple Python program where users guess a randomly generated number. Includes helpful feedback like \"Too high\" or \"Too low\" and tracks the number of attempts. Built as part of the \"30 Python Projects in 30 Days\" challenge",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-01-21",
    links: {
      github: "https://github.com/Burhanali2211/GuessTheNumber",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/GuessTheNumber.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/GuessTheNumber.git",
    license: "MIT"
  },
  {
    id: "habittracker",
    name: "HabitTracker",
    tagline: "The CLI Habit Tracker is a simple Python program t...",
    description: "The CLI Habit Tracker is a simple Python program that helps users track their daily habits, log progress, and view summaries. It encourages consistency by recording completed habits and displaying progress over time.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/HabitTracker",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/HabitTracker.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/HabitTracker.git",
    license: "MIT"
  },
  {
    id: "health-companion",
    name: "Health-Companion",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-20",
    links: {
      github: "https://github.com/Burhanali2211/Health-Companion",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Health-Companion.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Health-Companion.git",
    license: "MIT"
  },
  {
    id: "high-potential",
    name: "high-potential",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/high-potential",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/high-potential.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/high-potential.git",
    license: "MIT"
  },
  {
    id: "image-aspect-ratio-changer",
    name: "Image-Aspect-Ratio-Changer",
    tagline: "This Python script processes all images in the cur...",
    description: "This Python script processes all images in the current directory, cropping them to a specified target aspect ratio while preserving important content",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Image-Aspect-Ratio-Changer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Image-Aspect-Ratio-Changer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Image-Aspect-Ratio-Changer.git",
    license: "MIT License"
  },
  {
    id: "imageresizer-developermindset",
    name: "ImageResizer-DeveloperMindset",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-01-11",
    links: {
      github: "https://github.com/Burhanali2211/ImageResizer-DeveloperMindset",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ImageResizer-DeveloperMindset.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ImageResizer-DeveloperMindset.git",
    license: "MIT"
  },
  {
    id: "information_technology",
    name: "Information_Technology",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2023-03-19",
    links: {
      github: "https://github.com/Burhanali2211/Information_Technology",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Information_Technology.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Information_Technology.git",
    license: "MIT"
  },
  {
    id: "internet-identity-hub",
    name: "internet-identity-hub",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-26",
    links: {
      github: "https://github.com/Burhanali2211/internet-identity-hub",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/internet-identity-hub.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/internet-identity-hub.git",
    license: "MIT"
  },
  {
    id: "internetspeedtest",
    name: "InternetSpeedTest",
    tagline: "this python file lets you to check your internet d...",
    description: "this python file lets you to check your internet download and upload speed in CLI (command line user interface) mode",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/InternetSpeedTest",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/InternetSpeedTest.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/InternetSpeedTest.git",
    license: "MIT"
  },
  {
    id: "islamic-website",
    name: "islamic-website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-07-20",
    links: {
      github: "https://github.com/Burhanali2211/islamic-website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/islamic-website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/islamic-website.git",
    license: "MIT"
  },
  {
    id: "iwa",
    name: "iwa",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-06-22",
    links: {
      github: "https://github.com/Burhanali2211/iwa",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/iwa.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/iwa.git",
    license: "MIT"
  },
  {
    id: "kb-invoice-generator",
    name: "KB-Invoice-Generator",
    tagline: "Free offline desktop invoice generator and PDF cre...",
    description: "Free offline desktop invoice generator and PDF creator. Easily design professional business invoices with custom branding, drag-and-drop items, and print-ready layouts. 100% private, secure, and no login required.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-06-11",
    links: {
      github: "https://github.com/Burhanali2211/KB-Invoice-Generator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/KB-Invoice-Generator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/KB-Invoice-Generator.git",
    license: "MIT"
  },
  {
    id: "library_website",
    name: "Library_Website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Library_Website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["HTML"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Library_Website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Library_Website.git",
    license: "MIT"
  },
  {
    id: "link-o-matic",
    name: "Link-O-Matic",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-05",
    links: {
      github: "https://github.com/Burhanali2211/Link-O-Matic",
      demo: "https://link-o-matic.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Link-O-Matic.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Link-O-Matic.git",
    license: "MIT"
  },
  {
    id: "local-weather-station",
    name: "Local-Weather-Station",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-08",
    links: {
      github: "https://github.com/Burhanali2211/Local-Weather-Station",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Dart"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Local-Weather-Station.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Local-Weather-Station.git",
    license: "MIT License"
  },
  {
    id: "manual",
    name: "Manual",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Manual",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Manual.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Manual.git",
    license: "MIT"
  },
  {
    id: "marksanalyzer",
    name: "MarksAnalyzer",
    tagline: "This is a simple CLI-based tool that helps analyze...",
    description: "This is a simple CLI-based tool that helps analyze student marks by calculating key statistics such as the highest and lowest scores.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/MarksAnalyzer",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/MarksAnalyzer.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/MarksAnalyzer.git",
    license: "MIT"
  },
  {
    id: "measurement_converter",
    name: "Measurement_Converter",
    tagline: " A user-friendly Python tool that quickly converts...",
    description: " A user-friendly Python tool that quickly converts units of length, weight, and temperature. It provides accurate and instant conversions for everyday and professional use.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/Measurement_Converter",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Measurement_Converter.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Measurement_Converter.git",
    license: "MIT"
  },
  {
    id: "mehdi-art-72",
    name: "mehdi-art-72",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2023-04-10",
    links: {
      github: "https://github.com/Burhanali2211/mehdi-art-72",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/mehdi-art-72.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/mehdi-art-72.git",
    license: "MIT"
  },
  {
    id: "moodmorph",
    name: "Moodmorph",
    tagline: "MoodMorph generates colorpallets and typographyt f...",
    description: "MoodMorph generates colorpallets and typographyt formats from websites ",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-05-22",
    links: {
      github: "https://github.com/Burhanali2211/Moodmorph",
      demo: "https://moodmorph-nine.vercel.app",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Moodmorph.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Moodmorph.git",
    license: "MIT"
  },
  {
    id: "myntra",
    name: "Myntra",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2024-04-06",
    links: {
      github: "https://github.com/Burhanali2211/Myntra",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Myntra.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Myntra.git",
    license: "MIT"
  },
  {
    id: "object_detection_for_home_security",
    name: "Object_Detection_for_Home_Security",
    tagline: "This project implements real-time AI-based object ...",
    description: "This project implements real-time AI-based object detection using YOLOv8 for home security",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-16",
    links: {
      github: "https://github.com/Burhanali2211/Object_Detection_for_Home_Security",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Object_Detection_for_Home_Security.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Object_Detection_for_Home_Security.git",
    license: "MIT"
  },
  {
    id: "offline_caption_generator",
    name: "Offline_Caption_Generator",
    tagline: "It Takes an image as input Uses a free, offline de...",
    description: "It Takes an image as input Uses a free, offline deep learning model to generate a caption for the image Outputs a meaningful sentence describing the image Tech Stack:",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-16",
    links: {
      github: "https://github.com/Burhanali2211/Offline_Caption_Generator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Offline_Caption_Generator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Offline_Caption_Generator.git",
    license: "MIT License"
  },
  {
    id: "omniparser",
    name: "OmniParser",
    tagline: "A simple screen parsing tool towards pure vision b...",
    description: "A simple screen parsing tool towards pure vision based GUI agent",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-03-16",
    links: {
      github: "https://github.com/Burhanali2211/OmniParser",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/OmniParser.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/OmniParser.git",
    license: "Creative Commons Attribution 4.0 International"
  },
  {
    id: "oru",
    name: "Oru",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-02-26",
    links: {
      github: "https://github.com/Burhanali2211/Oru",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Oru.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Oru.git",
    license: "MIT"
  },
  {
    id: "orufy",
    name: "orufy",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-04-25",
    links: {
      github: "https://github.com/Burhanali2211/orufy",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/orufy.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/orufy.git",
    license: "MIT"
  },
  {
    id: "passwordgenerator",
    name: "PasswordGenerator",
    tagline: "This is a simple yet powerful Python tool that cre...",
    description: "This is a simple yet powerful Python tool that creates strong, random passwords based on user preferences. It ensures secure and customizable password generation for better online security.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/PasswordGenerator",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/PasswordGenerator.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/PasswordGenerator.git",
    license: "MIT"
  },
  {
    id: "perfume",
    name: "perfume",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-09-20",
    links: {
      github: "https://github.com/Burhanali2211/perfume",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/perfume.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/perfume.git",
    license: "MIT"
  },
  {
    id: "portfolio",
    name: "Portfolio",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Portfolio",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Portfolio.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Portfolio.git",
    license: "MIT License"
  },
  {
    id: "portfolio-website",
    name: "Portfolio-Website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/Portfolio-Website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Portfolio-Website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Portfolio-Website.git",
    license: "MIT"
  },
  {
    id: "portfoliowebsite",
    name: "portfolioWebsite",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-26",
    links: {
      github: "https://github.com/Burhanali2211/portfolioWebsite",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/portfolioWebsite.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/portfolioWebsite.git",
    license: "MIT"
  },
  {
    id: "posture-control-chair",
    name: "Posture-Control-Chair",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-16",
    links: {
      github: "https://github.com/Burhanali2211/Posture-Control-Chair",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Dart"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Posture-Control-Chair.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Posture-Control-Chair.git",
    license: "MIT"
  },
  {
    id: "poy",
    name: "poy",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-26",
    links: {
      github: "https://github.com/Burhanali2211/poy",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/poy.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/poy.git",
    license: "MIT"
  },
  {
    id: "pure_spoofing",
    name: "Pure_Spoofing",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-06-28",
    links: {
      github: "https://github.com/Burhanali2211/Pure_Spoofing",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Shell"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Pure_Spoofing.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Pure_Spoofing.git",
    license: "MIT"
  },
  {
    id: "python",
    name: "Python",
    tagline: "All Algorithms implemented in Python...",
    description: "All Algorithms implemented in Python",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-20",
    links: {
      github: "https://github.com/Burhanali2211/Python",
      demo: "https://thealgorithms.github.io/Python/",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Open Source"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/Python.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/Python.git",
    license: "MIT License"
  },
  {
    id: "qr-file--share",
    name: "qr-file--share",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-04-08",
    links: {
      github: "https://github.com/Burhanali2211/qr-file--share",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["JavaScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/qr-file--share.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/qr-file--share.git",
    license: "MIT"
  },
  {
    id: "qr-website",
    name: "qr-website",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-03-07",
    links: {
      github: "https://github.com/Burhanali2211/qr-website",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/qr-website.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/qr-website.git",
    license: "MIT"
  },
  {
    id: "quizapp",
    name: "QuizApp",
    tagline: " An interactive Python program that presents multi...",
    description: " An interactive Python program that presents multiple-choice questions, records user responses, and provides instant feedback. It supports different categories, difficulty levels, and a final score summary.",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/QuizApp",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/QuizApp.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/QuizApp.git",
    license: "MIT"
  },
  {
    id: "registration",
    name: "registration",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "utility",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2023-03-19",
    links: {
      github: "https://github.com/Burhanali2211/registration",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["CSS"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/registration.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/registration.git",
    license: "MIT"
  },
  {
    id: "repo",
    name: "repo",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-07-22",
    links: {
      github: "https://github.com/Burhanali2211/repo",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["TypeScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/repo.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/repo.git",
    license: "MIT"
  },
  {
    id: "repo-poster",
    name: "repo-poster",
    tagline: "Open Source Project",
    description: "An open-source project by Burhanali2211.",
    category: "web",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2026-07-02",
    links: {
      github: "https://github.com/Burhanali2211/repo-poster",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["JavaScript"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/repo-poster.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/repo-poster.git",
    license: "MIT"
  },
  {
    id: "resturantbillingsystem",
    name: "ResturantBillingSystem",
    tagline: "The CLI Restaurant Billing System is a simple Pyth...",
    description: "The CLI Restaurant Billing System is a simple Python-based program that allows users to view a menu, place orders, and generate a bill. It calculates the total cost and saves the receipt as a text file for record-keeping. This lightweight and user-friendly system is perfect for small restaurants or personal use. 🚀",
    category: "python",
    downloadCount: "N/A",
    version: "1.0.0",
    lastUpdated: "2025-02-10",
    links: {
      github: "https://github.com/Burhanali2211/ResturantBillingSystem",
    },
    features: ["Open Source", "Built by Burhanali2211"],
    techStack: ["Python"],
    installation: {
      steps: [{"title": "Clone repository", "code": "git clone https://github.com/Burhanali2211/ResturantBillingSystem.git"}]
    },
    quickStart: "git clone https://github.com/Burhanali2211/ResturantBillingSystem.git",
    license: "MIT"
  }
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
