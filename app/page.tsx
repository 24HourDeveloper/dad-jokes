import { Heading, Text, Flex, Card, Button } from "@chakra-ui/react"
//import OpenAI from "openai";



export default async function Home() {
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
  const res = await fetch("http://localhost:3000/jokes")
  const jokes = await res.json()
  return (
    <main>
      <Flex flexDir="column" gap="2" w="100%" justifyContent="center" alignItems="center" mt="6">
        <Card bg="orange.100" p="4" pos="relative" w={{ base: '95%', lg: '500px'}} borderBottom="2px" borderColor="orange">
          <Flex flexDirection="column" gap="4">
            <Heading size="lg">{jokes[Math.floor(Math.random() * 5)].question}</Heading>
            <Text fontSize="xl">{jokes[Math.floor(Math.random() * 5)].answer}</Text>
          </Flex>
        </Card>
        <Flex justifyContent="space-between" w={{ base: '95%', lg: '500px'}}>
          <Button w="48%" colorScheme="orange" shadow="lg">Laugh</Button>
          <Button w="48%" variant="outline" colorScheme="orange" shadow="lg">Crickets</Button>
        </Flex>
      </Flex>
    </main>
  );
}
