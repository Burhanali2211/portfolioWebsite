import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  useSEO({
    title: `${post.title} | Burhan Ali`,
    description: post.excerpt,
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="px-6 py-20 md:py-32">
        <article className="mx-auto max-w-3xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>
          
          <header className="mb-12 border-b-2 border-foreground pb-12">
            <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>{post.readTime}</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-accent">{post.category}</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {post.seoKeywords.map((kw) => (
                <span key={kw} className="bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                  #{kw.replace(/\\s+/g, '')}
                </span>
              ))}
            </div>
          </header>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-accent/80"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
