import { inngest } from "./client";
import prisma from "../db";

export const addJokeAndUserToJunction = inngest.createFunction(
  { id: "add-joke-and-user-junction" },
  { event: "joke/joke.junction" },
  async ({ event, step }) => {
    const { userId, jokeId } = event.data;
    await prisma.userJokes.create({
      data: {
        user: {
          connect: { xata_id: userId },
        },
        joke: {
          connect: { xata_id: jokeId },
        },
      },
    });
    return { event, body: "Joke added to funny list" };
  }
);

export const createUserOnSignUp = inngest.createFunction(
  { id: "create-user-on-signup" },
  { event: "user/create.user" },
  async ({ event, step }) => {
    const { id, email } = event.data;
    await prisma.user.create({
      data: {
        email,
        xata_id: id,
      },
    });
    return { event, body: "User added!" };
  }
);
