import { NextResponse } from 'next/server';
import { fetchAnalysisData } from '@/lib/api';
import type { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    const data = await fetchAnalysisData();
    return NextResponse.json({ data } as ApiResponse);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An error occurred',
        data: null 
      } as ApiResponse,
      { status: 500 }
    );
  }
}