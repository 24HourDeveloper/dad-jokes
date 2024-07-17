import { inngest } from "../../inngest/client";

export async function POST(req: Request) {
  const { id, email } = await req.json();
  await inngest.send({
    name: "user/create.user",
    data: {
      email,
      id,
    },
  });
  return Response.json({ message: "user created!" });
}
