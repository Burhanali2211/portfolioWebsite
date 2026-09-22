export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  seoKeywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "software-developer-in-kashmir-building-production-systems",
    title: "A Software Developer in Kashmir: Building End-to-End Production Systems",
    excerpt: "Exploring the journey, skills, and projects of a software developer based in Kashmir, focusing on Next.js, React, and IoT.",
    content: `
# Building Tech from the Valley

As a **software developer in Kashmir**, my focus is on building robust, scalable, and practical systems. Rather than just writing code, my approach centers on delivering complete solutions—from developing complex IoT architectures to deploying high-performance Next.js and React web applications.

## End-to-End Production Systems

Clients need reliability. My experience involves handling full system architecture. As the engineer behind the TechNurture LMS platform at Easyio Technologies, I manage server infrastructure, database administration (PostgreSQL), and containerized deployments using Docker and Linux. 

## Bridging Software and Hardware (IoT)

What adds a unique layer to my work as a **web developer in Srinagar** is my deep understanding of embedded systems. I enjoy designing hands-on workshops on Mechatronics and IoT, integrating sensors and writing firmware for Arduino and ESP32. 

My goal is always to keep learning and building things that solve real-world problems.
    `,
    date: "Sep 22, 2026",
    readTime: "4 min read",
    category: "Software Engineering",
    seoKeywords: ["software developer in Kashmir", "web developer Srinagar", "IoT engineer Kashmir", "Burhan Ali"],
  },
  {
    id: "2",
    slug: "freelance-developer-journey-react-nextjs",
    title: "My Journey as a Freelance Web Developer: Next.js, React, and Open Source",
    excerpt: "How continuous learning led to building enterprise-grade learning management systems and contributing to open source from Kashmir.",
    content: `
# The Learning Path

Working as a **freelance developer in India** comes with its own unique set of challenges and opportunities. I started my journey with a deep curiosity for how things work, which naturally led me into the world of software engineering and open-source contributions.

## Key Milestones

1. **Government Certification**: Becoming a Government-certified Software Engineer (NSQF Level 4) helped validate my foundational skills and commitment to quality code.
2. **Open Source Contributions**: With over 119 public repositories on GitHub, I strongly believe in giving back to the developer community that taught me so much.
3. **TechNurture LMS**: Architecting a production learning management platform with video streaming and AI-powered blog generation using Next.js.

I'm Burhan Ali, and I believe in shipping working software and continuously improving my craft every single day.
    `,
    date: "Sep 15, 2026",
    readTime: "3 min read",
    category: "Career Journey",
    seoKeywords: ["freelance web developer", "React developer Kashmir", "Next.js developer", "open source contributor"],
  }
];
