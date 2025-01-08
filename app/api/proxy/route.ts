import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.langflow.astra.datastax.com/lf/81585ed6-5563-4a29-a944-2376648984ce/api/v1/run/f44d53ab-bdeb-4291-ad81-259bc36fe2db?stream=false', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer AstraCS:ZOtuMbAoNHQykQrhMNLCfgEz:29df99895007ca890e06926668b0482d0fa86042fd1a384ed7944f5ea395824d',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.outputs && data.outputs[0].outputs[0].results.message.text) {
      return NextResponse.json({
        message: data.outputs[0].outputs[0].results.message.text
      });
    } else {
      return NextResponse.json(
        { error: 'Unexpected response structure' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
