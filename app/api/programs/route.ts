import { NextResponse } from "next/server";
import { getPrograms } from "@/lib/programs/getPrograms";

export async function GET() {
  const programs = await getPrograms();
  const sanitizedPrograms = programs.map(({ priceFrom: _priceFrom, ...program }) => program);
  return NextResponse.json({ data: sanitizedPrograms });
}
