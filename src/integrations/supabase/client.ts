import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://00e4ea35-a633-43e9-9f08-22a5f2dd520b.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Create a nullable client - will be null if anon key is missing
export const supabase = SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Edge function base URL
const EDGE_FUNCTION_URL = "https://00e4ea35-a633-43e9-9f08-22a5f2dd520b.supabase.co/functions/v1";

// Helper function to invoke edge functions
export async function invokeEdgeFunction<T = unknown>(
  functionName: string,
  body: Record<string, unknown>
): Promise<{ data: T | null; error: Error | null }> {
  // If Supabase client is available, use it
  if (supabase) {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, { body });
      return { data: data as T, error: error ? new Error(error.message) : null };
    } catch (clientError) {
      console.warn("Supabase client invoke failed, falling back to direct fetch:", clientError);
      // Fall through to direct fetch
    }
  }

  // Direct fetch to edge function
  const url = `${EDGE_FUNCTION_URL}/${functionName}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { data: null, error: new Error(data.error || `Request failed with status ${response.status}`) };
    }
    
    return { data: data as T, error: null };
  } catch (error) {
    console.error("Edge function fetch error:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error("Network error - please check your connection") 
    };
  }
}
