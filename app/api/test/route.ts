import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasLangFlowUrl: !!process.env.LANGFLOW_API_URL,
      hasLangFlowToken: !!process.env.LANGFLOW_APPLICATION_TOKEN,
      hasFlowId: !!process.env.FLOW_ID,
      langFlowUrl: process.env.LANGFLOW_API_URL,
      flowId: process.env.FLOW_ID
    }
  });
}