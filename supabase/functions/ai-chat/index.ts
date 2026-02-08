import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    
    if (mode === "nl-to-query") {
      systemPrompt = `You are a SQL query generator for a business analytics platform. Convert natural language questions into SQL queries.
      
Available tables and their schemas:
- orders (id, customer, product, category, amount, quantity, region, country, date, status)
- customers (id, name, email, company, total_spend, order_count, region, joined_date)
- products (id, name, category, price, stock, sales_count, revenue)
- analytics (date, visitors, page_views, bounce_rate, avg_session_duration)

Rules:
- Return ONLY the SQL query, no explanations
- Use standard PostgreSQL syntax
- Always include reasonable LIMIT clauses
- Format the query nicely`;
    } else if (mode === "insights") {
      systemPrompt = `You are a data analytics AI assistant. Analyze the provided data and generate insights. For each insight, categorize it as one of: "trend", "anomaly", or "recommendation". 
      
Return a JSON array of insights with this structure:
[{"type": "trend|anomaly|recommendation", "title": "Short title", "description": "Detailed explanation"}]

Be specific, actionable, and data-driven. Return 3-5 insights.`;
    } else if (mode === "explain") {
      systemPrompt = `You are a business analytics assistant. Explain the given chart or dashboard data in simple, clear language that a non-technical stakeholder would understand. Highlight key takeaways, trends, and actionable recommendations. Keep it concise (2-3 paragraphs max).`;
    } else {
      systemPrompt = `You are InsightFlow AI, a helpful business intelligence assistant. You help users understand their data, create queries, build dashboards, and generate insights. Be concise, data-driven, and actionable. When asked about data, provide specific examples and recommendations.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("AI chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
