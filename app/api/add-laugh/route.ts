import prisma from "@/app/db";
import { inngest } from "../../inngest/client";

export async function POST(req: Request) {
  const { jokeId, userId } = await req.json();
  const updatedLaugh = await prisma.joke.update({
    where: {
      xata_id: jokeId,
    },
    data: {
      laughs: {
        increment: 1,
      },
    },
  });

  await inngest.send({
    name: "joke/joke.junction",
    data: {
      userId,
      jokeId,
    },
  });
  return Response.json({ updatedLaugh });
}
