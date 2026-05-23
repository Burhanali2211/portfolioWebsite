import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GripHorizontal } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

const ServicesCarousel = () => {
  return (
    <section className="bg-muted/30 px-6 py-20 md:py-32 overflow-hidden border-t-2 border-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Core Services
            </h2>
            <div className="mt-2 h-1 w-16 bg-foreground md:mt-4 md:mx-0 mx-auto" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild variant="outline" className="border-2 border-foreground hover:bg-accent hover:text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[4px_4px_0px_0px_hsl(var(--accent))]">
              <Link to="/services">
                View All Services
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative px-4 sm:px-0"
        >
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {services.map((service, index) => (
                <CarouselItem key={service.id} className="pl-4 md:pl-6 basis-[85%] sm:basis-[60%] lg:basis-[45%]">
                  <div className="h-full py-2">
                    <ServiceCard service={service} index={index} size="small" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled Next/Prev buttons */}
            <div className="hidden sm:block">
              <CarouselPrevious className="-left-12 border-2 border-foreground bg-background hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--accent))]" />
              <CarouselNext className="-right-12 border-2 border-foreground bg-background hover:bg-accent hover:text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_0px_hsl(var(--accent))]" />
            </div>
          </Carousel>

          {/* Swipe Indicator for Mobile */}
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground sm:hidden animate-pulse">
            <GripHorizontal size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Swipe to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
