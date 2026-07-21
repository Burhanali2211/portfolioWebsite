import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
}

const BASE = "Burhan Ali";

export function useSEO({ title, description }: SEOOptions) {
  useEffect(() => {
    document.title = title === BASE ? `${BASE} — Software Developer & IoT Architect` : `${title} | ${BASE}`;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }

    return () => {
      document.title = `${BASE} — Software Developer & IoT Architect`;
    };
  }, [title, description]);
}
