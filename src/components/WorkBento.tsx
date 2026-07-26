import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import TextRevealMask from "./TextRevealMask";
import TextReveal from "./TextReveal";

interface BentoItem {
  type: "video" | "image";
  src: string;
  alt: string;
  label: string;
  sub: string;
  colSpan?: string;
  rowSpan?: string;
  portrait?: boolean;
}

const items: BentoItem[] = [
  {
    type: "video",
    src: "/mywork/students-questioning.mp4",
    alt: "Engaging students with board questioning",
    label: "Live Classroom Session",
    sub: "Real-time board engagement — students driving the narrative",
    colSpan: "col-span-2",
    rowSpan: "row-span-1",
    portrait: false,
  },
  {
    type: "video",
    src: "/mywork/mechatronics-iot.mp4",
    alt: "Teaching mechatronics and IoT",
    label: "Mechatronics & IoT Workshop",
    sub: "Hands-on college systems — hardware meets software",
    colSpan: "col-span-1",
    rowSpan: "row-span-2",
    portrait: true,
  },
  {
    type: "image",
    src: "/mywork/certification.jpg",
    alt: "Certification felicitation",
    label: "Certified & Recognised",
    sub: "Officially recognised across IoT, full-stack, systems",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    src: "/mywork/project-official.jpg",
    alt: "Project showcase to officials",
    label: "Official Project Demo",
    sub: "Stakeholder demos — live builds in action",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    src: "/mywork/students-around.jpg",
    alt: "Students gathered around",
    label: "Collaborative Learning",
    sub: "Curiosity clustering — problems spark solutions",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    src: "/mywork/programming-basics.jpg",
    alt: "Teaching programming basics",
    label: "Programming Fundamentals",
    sub: "First principles — breaking code into building blocks",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    src: "/mywork/workshop-selfie.jpg",
    alt: "Workshop facilitation",
    label: "Hands-on Workshops",
    sub: "Zero to deployed — end-to-end technical depth",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    src: "/mywork/teaching raspberrypi.png",
    alt: "Teaching Raspberry Pi",
    label: "Raspberry Pi Sessions",
    sub: "Bringing hardware to life with embedded Linux",
    colSpan: "col-span-1 sm:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
  }
];

const VideoItem = ({ item }: { item: BentoItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={item.src}
      muted
      loop
      playsInline
      preload="none"
      className={cn(
        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
        item.portrait ? "object-center" : "object-top"
      )}
    />
  );
};

const BentoCard = ({ item, index }: { item: BentoItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/60 cursor-pointer transition-all duration-300 h-full w-full",
        item.colSpan,
        item.rowSpan
      )}
      whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)", y: -4 }}
    >
      {/* Media */}
      <div className="absolute inset-0 group-hover:brightness-110 transition-all duration-300">
        {item.type === "video" ? (
          <VideoItem item={item} />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      {/* Always-visible gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      {/* Hover overlay — slides up */}
      <div className="absolute inset-0 bg-foreground/85 flex flex-col justify-end p-4 md:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-1">
          {item.type === "video" ? "● Live" : "◆ Proof"}
        </p>
        <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-background leading-tight">
          {item.label}
        </h4>
        <p className="mt-1.5 text-[11px] text-background/70 leading-relaxed line-clamp-2">
          {item.sub}
        </p>
      </div>

      {/* Resting label (bottom, always visible on non-hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent">
        <p className="text-[11px] font-bold uppercase tracking-wide text-accent-foreground line-clamp-1">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
};

const WorkBento = () => {
  return (
    <section className="px-4 py-12 sm:px-5 md:px-6 md:py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" once className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <TextRevealMask
                as="h2"
                className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-5xl md:text-6xl"
              >
                {"Systems\nIn Action"}
              </TextRevealMask>
              <motion.div 
                initial={{ scaleX: 0 }} 
                whileInView={{ scaleX: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 h-1.5 w-24 origin-left bg-accent md:w-32" 
              />
              <TextReveal
                delay={0.4}
                className="mt-6 text-base font-medium text-muted-foreground md:text-lg leading-relaxed"
              >
                Engineering goes beyond the IDE. From deploying embedded Linux and IoT hardware to leading live technical workshops that bridge the gap between code and physical circuits.
              </TextReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Grid — 2 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 auto-rows-[160px] sm:auto-rows-[220px] lg:auto-rows-[250px]">
          {items.map((item, i) => (
            <BentoCard key={item.src} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkBento;
