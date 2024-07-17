import JokeCard from "./components/Joke";
import prisma from "./db";
//import OpenAI from "openai";

export default async function Home() {
  // const prisma_jokes = await prisma.joke.findMany();
  const jokes = await prisma.joke.findMany();
  // const openai = new OpenAI() TODO: implement openai when I add money on account. For now use jsonserver
  // try {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices[0]);
  // } catch (error) {
  //   console.log("ERROR: ", error)
  // }
  return (
    <main>
      <JokeCard jokes={jokes}/>
    </main>
  );
}
