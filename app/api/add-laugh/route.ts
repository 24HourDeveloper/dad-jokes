import prisma from "@/app/db";

export async function POST(req: Request) {
  const { id } = await req.json();
  const updatedLaugh = await prisma.joke.update({
    where: {
      xata_id: id,
    },
    data: {
      laughs: {
        increment: 1,
      },
    },
  });
  return Response.json({ updatedLaugh });
}
