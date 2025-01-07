import { NextResponse } from "next/server";
import { fetchAnalysisData } from "@/app/lib/csvUtils";
import type { ApiResponse } from "@/app/types";

export async function GET(request: Request) {
  try {
    // Extract pagination parameters from the query string
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    // Fetch all data using the existing function
    const allData = await fetchAnalysisData();

    // Paginate the data
    const paginatedData = allData.slice(offset, offset + limit);

    return NextResponse.json({
      data: paginatedData,
      total: allData.length,
      offset,
      limit,
    } as ApiResponse);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An error occurred",
        data: null,
      } as ApiResponse,
      { status: 500 }
    );
  }
}
