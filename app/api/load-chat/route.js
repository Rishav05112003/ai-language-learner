import { getUser } from "@/actions/user";
import { db } from "@/lib/prisma";

const PAGE_SIZE = 20;

export async function GET(request) {
  try {
    const user = await getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const cursor = searchParams.get("cursor"); // for pagination

    if (!sessionId) {
      return new Response("Missing sessionId", { status: 400 });
    }

    const messages = await db.conversation.findMany({
      where: { sessionId: sessionId },
      take: PAGE_SIZE,
      ...(cursor
        ? {
            skip: 1,
            cursor: { id: cursor },
          }
        : {}),
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ messages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Load chat error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
