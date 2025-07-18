import { getUser } from "@/actions/user";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const conversation = await db.conversation.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });

    return new Response(JSON.stringify({ chat: conversation }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Load chat error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
