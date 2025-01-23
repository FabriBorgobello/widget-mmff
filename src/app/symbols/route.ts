import { asc } from "drizzle-orm";

import { db } from "@/db";
import { symbols } from "@/db/schema/symbols";

export async function GET() {
  const data = await db
    .select({ id: symbols.id, name: symbols.name })
    .from(symbols)
    .orderBy(asc(symbols.id));

  return Response.json(data);
}
