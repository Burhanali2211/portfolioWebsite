import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import TextRevealMask from "@/components/TextRevealMask";

const Blog = () => {
  useSEO({
    title: "Blog | Burhan Ali — Best Software Developer in Kashmir",
    description: "Read articles by Burhan Ali, a top techy in Kashmir, on software engineering, IoT, and building production systems.",
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <header className="mb-16">
            <TextRevealMask
              as="h1"
              delay={0}
              className="text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {"Insights & Writing"}
            </TextRevealMask>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Thoughts on building production software, embedded systems, and life as a techy in Kashmir.
            </motion.p>
          </header>

          <div className="grid gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative border-2 border-foreground bg-card p-6 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))]"
              >
                <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span className="text-accent">{post.category}</span>
                </div>
                
                <h2 className="mb-3 text-2xl font-black uppercase tracking-tight text-foreground group-hover:text-accent">
                  <Link to={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground">{post.excerpt}</p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
                  Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
