import {
  Code2,
  Cpu,
  Globe,
  Database,
  Plug,
  Cloud,
  Smartphone,
  BarChart3,
  Terminal,
  Layers,
} from "lucide-react";

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: string;
  icon: typeof Code2;
}

export const skills: Skill[] = [
  // Python Ecosystem
  { name: "Python", proficiency: 90, category: "Backend", icon: Code2 },
  { name: "Django", proficiency: 85, category: "Backend", icon: Code2 },
  { name: "Flask", proficiency: 80, category: "Backend", icon: Code2 },
  { name: "FastAPI", proficiency: 75, category: "Backend", icon: Code2 },
  
  // Frontend
  { name: "React", proficiency: 85, category: "Frontend", icon: Globe },
  { name: "TypeScript", proficiency: 80, category: "Frontend", icon: Globe },
  { name: "Next.js", proficiency: 75, category: "Frontend", icon: Globe },
  { name: "Tailwind CSS", proficiency: 90, category: "Frontend", icon: Globe },
  
  // IoT & Embedded
  { name: "Arduino", proficiency: 85, category: "IoT", icon: Cpu },
  { name: "ESP32", proficiency: 80, category: "IoT", icon: Cpu },
  { name: "Raspberry Pi", proficiency: 75, category: "IoT", icon: Cpu },
  { name: "C/C++", proficiency: 70, category: "IoT", icon: Terminal },
  
  // Database
  { name: "PostgreSQL", proficiency: 80, category: "Database", icon: Database },
  { name: "Supabase", proficiency: 85, category: "Database", icon: Database },
  { name: "MongoDB", proficiency: 75, category: "Database", icon: Database },
  { name: "MySQL", proficiency: 80, category: "Database", icon: Database },
  { name: "Redis", proficiency: 65, category: "Database", icon: Database },

  // DevOps & Cloud
  { name: "Git & GitHub", proficiency: 90, category: "DevOps", icon: Cloud },
  { name: "Docker", proficiency: 70, category: "DevOps", icon: Cloud },
  { name: "Linux", proficiency: 80, category: "DevOps", icon: Terminal },
  { name: "REST APIs", proficiency: 90, category: "DevOps", icon: Plug },
  { name: "Tauri (Rust)", proficiency: 65, category: "DevOps", icon: Layers },

  // AI & Integrations
  { name: "OpenAI API", proficiency: 75, category: "AI", icon: Smartphone },
  { name: "Telegram Bot API", proficiency: 85, category: "AI", icon: Plug },
  { name: "WhatsApp Business API", proficiency: 70, category: "AI", icon: Plug },
];

export const skillCategories = [
  {
    id: "python",
    icon: Code2,
    title: "Python Development",
    description: "Django, Flask, FastAPI for robust backends",
    size: "large" as const,
  },
  {
    id: "iot",
    icon: Cpu,
    title: "IoT & Embedded",
    description: "Arduino, ESP32, Raspberry Pi solutions",
    size: "medium" as const,
  },
  {
    id: "fullstack",
    icon: Globe,
    title: "Full-Stack Web",
    description: "React, Next.js, TypeScript, Tailwind",
    size: "medium" as const,
  },
  {
    id: "database",
    icon: Database,
    title: "Database Engineering",
    description: "SQL, NoSQL, data modeling",
    size: "medium" as const,
  },
  {
    id: "api",
    icon: Plug,
    title: "API Architecture",
    description: "RESTful APIs, integrations, webhooks",
    size: "medium" as const,
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Docker, Git, CI/CD pipelines",
    size: "large" as const,
  },
];

export const topLanguages = [
  { name: "Python", percentage: 35, color: "hsl(var(--accent))" },
  { name: "TypeScript", percentage: 25, color: "hsl(var(--foreground))" },
  { name: "JavaScript", percentage: 20, color: "hsl(var(--muted-foreground))" },
  { name: "C++", percentage: 12, color: "hsl(var(--accent))" },
  { name: "Other", percentage: 8, color: "hsl(var(--muted))" },
];
