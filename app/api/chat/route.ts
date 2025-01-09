import { NextResponse } from 'next/server';
import { LangflowClient } from '@/lib/langflow-client';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { messages } = json;
    const currentMessage = messages[messages.length - 1];

    const FLOW_ID = process.env.NEXT_PUBLIC_FLOW_ID;
    const LANGFLOW_ID = process.env.NEXT_PUBLIC_LANGFLOW_ID;
    const LANGFLOW_TOKEN = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN;

    if (!FLOW_ID || !LANGFLOW_ID || !LANGFLOW_TOKEN) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }

    const client = new LangflowClient(
      'https://api.langflow.astra.datastax.com',
      LANGFLOW_TOKEN
    );

    const tweaks = {
      "AstraDB-m8WFT": {},
      "ParseData-F4OL7": {},
      "ParseData-2pDOZ": {},
      "ParseData-0nnXV": {},
      "Prompt-fvBvh": {},
      "GoogleGenerativeAIModel-ilsuF": {},
      "ChatOutput-JtbDE": {}
    };

    const response = await client.runFlow(
      FLOW_ID,
      LANGFLOW_ID,
      currentMessage.content,
      'chat',
      'chat',
      tweaks,
      false
    );

    // Extract message from the nested response structure
    const message = response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    if (!message || typeof message !== 'string') {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response format from Langflow');
    }

    return NextResponse.json({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: message.trim(),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// You can remove the GET method since it's not being used properly
// If you need GET functionality, it should use URL parameters or query string
// instead of trying to parse a body (which GET requests don't have)