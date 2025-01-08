import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { ApiResponse } from "@/app/types";

export async function GET(request: Request) {
  try {
    // Extract filename from the query string
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        {
          error: "Filename is required",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Construct the file path
    const filePath = path.join(
      process.cwd(),
      "public",
      "json",
      `${filename}.json`
    );

    // Read the JSON file
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json({
      data: jsonData,
      error: null,
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
