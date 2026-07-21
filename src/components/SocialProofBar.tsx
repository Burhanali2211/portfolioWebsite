import { motion } from "framer-motion";
import { Shield, Clock, MapPin, FileText } from "lucide-react";

const proofItems = [
  { icon: Clock, text: "Replies within 24h" },
  { icon: Shield, text: "NDA available" },
  { icon: MapPin, text: "Based in Kashmir, India" },
  { icon: FileText, text: "23+ projects delivered" },
];

const SocialProofBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-y-2 border-foreground bg-muted/40 px-6 py-4"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 md:gap-10">
        {proofItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground"
          >
            <item.icon size={15} className="text-accent flex-shrink-0" strokeWidth={2.5} />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialProofBar;
