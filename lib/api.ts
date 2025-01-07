import { AnalysisData } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchAnalysisData(retries = 5): Promise<AnalysisData> {
  const FLOW_ID = process.env.NEXT_PUBLIC_FLOW_ID;
  const LANGFLOW_ID = process.env.NEXT_PUBLIC_LANGFLOW_ID;
  const LANGFLOW_TOKEN = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN;

  if (!FLOW_ID || !LANGFLOW_ID || !LANGFLOW_TOKEN) {
    throw new Error('Missing required environment variables');
  }

  const apiUrl = `https://api.langflow.astra.datastax.com/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}?stream=false`;

  const tweaks = {
    "AstraDB-m8WFT": {},
    "ParseData-F4OL7": {},
    "ParseData-2pDOZ": {},
    "ParseData-0nnXV": {},
    "Prompt-fvBvh": {},
    "GoogleGenerativeAIModel-ilsuF": {},
    "ChatOutput-JtbDE": {}
  };

  let lastError;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add longer delays between retries
      if (attempt > 0) {
        const waitTime = Math.min(1000 * Math.pow(3, attempt), 30000); // More aggressive backoff
        console.log(`Waiting ${waitTime}ms before retry ${attempt + 1}...`);
        await delay(waitTime);
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: "fetch_analysis",
          input_type: "chat",
          output_type: "chat",
          tweaks: tweaks
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 429) {
          console.log(`Rate limit hit on attempt ${attempt + 1}`);
          if (attempt === retries - 1) {
            throw new Error('Rate limit exceeded. Please try again in a few minutes.');
          }
          continue;
        }
        throw new Error(
          `API error ${response.status}: ${errorData?.detail || response.statusText}`
        );
      }

      const data = await response.json();
      
      if (!data?.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
        throw new Error('Invalid response format from API');
      }

      return data.outputs[0].outputs[0].outputs.message;

    } catch (error) {
      lastError = error;
      
      if (error instanceof Error && !error.message.includes('429')) {
        throw error;
      }
    }
  }

  throw lastError;
}