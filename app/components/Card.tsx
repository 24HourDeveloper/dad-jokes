import React from "react";
import { Heading, Flex, Card, Button } from "@chakra-ui/react";
import Answer from "./Answer";

export default function JokeCard({
  jokes,
}: {
  jokes: { question: string; answer: string };
}) {
  return (
    <Flex
      flexDir="column"
      gap="2"
      w="100%"
      justifyContent="center"
      alignItems="center"
      mt="6"
    >
      <Card
        bg="orange.100"
        p="4"
        pos="relative"
        w={{ base: "95%", lg: "500px" }}
        borderBottom="2px"
        borderColor="orange"
      >
        <Flex flexDirection="column" gap="4">
          <Heading size="lg">{jokes.question}</Heading>
          <Answer answer={jokes.answer} />
        </Flex>
      </Card>
      <Flex justifyContent="space-between" w={{ base: "95%", lg: "500px" }}>
        <Button w="48%" colorScheme="orange" shadow="lg">
          Laugh
        </Button>
        <Button w="48%" variant="outline" colorScheme="orange" shadow="lg">
          Crickets
        </Button>
      </Flex>
    </Flex>
  );
}
