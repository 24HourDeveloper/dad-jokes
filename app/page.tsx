import JokeCard from "./components/Joke";
import prisma from "./db";

export default async function Home() {
  const jokes = await prisma.joke.findMany();
  return (
    <main>
      <JokeCard jokes={jokes}/>
    </main>
  );
}
