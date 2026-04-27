import { NextResponse } from "next/server";
import { getPrograms } from "@/lib/programs/getPrograms";

export async function GET() {
  const programs = await getPrograms();
  return NextResponse.json({ data: programs });
}
