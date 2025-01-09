import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the incoming request
    const json = await req.json();
    const { platform, postType, region, genre } = json;

    // Validate the required parameters
    if (!platform || typeof platform !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "platform" parameter' },
        { status: 400 }
      );
    }
    if (!postType || typeof postType !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "postType" parameter' },
        { status: 400 }
      );
    }
    if (!genre || typeof genre !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "Genre" parameter' },
        { status: 400 }
      );
    }
    if (!region || typeof region !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "Region" parameter' },
        { status: 400 }
      );
    }

    // Prepare the external API request
    const response = await fetch(
      'https://api.langflow.astra.datastax.com/lf/d4db2943-5547-4f36-8d55-4cb64223be8c/api/v1/run/7bedef0d-c20f-4849-99c8-08093bb345d2?stream=false',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer AstraCS:eJecoexeLwHvNGgPMYjahMzT:aab0baaa606cd2a4314ec4fd31493a560133224d90e542ee1638b03b8f9abdda',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweaks: {
            'TextInput-BMXIX': {
                input_value: postType
              },
              'TextInput-fzQrH': {
                input_value: platform
              },
              'TextInput-80YvO': {
                input_value: region
              },
              'TextInput-3I3Bk': {
                input_value: genre
              },
          },
        }),
      }
    );

    // Handle the external API response
    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract and return the message from the response
    if (data.outputs && data.outputs[0]?.outputs[0]?.results?.message?.text) {
      return NextResponse.json({
        message: data.outputs[0].outputs[0].results.message.text,
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