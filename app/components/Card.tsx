import React from 'react'
import { Heading, Flex, Card, Text, Button } from "@chakra-ui/react";

type ContainerTypes = {
  showAnswer?: boolean;
  joke: { question: string; answer: string};
  onClick?: () => void;
}

export default function Container({ showAnswer, joke, onClick }: ContainerTypes) {
  return (
    <>
      <Card
        bg="teal.200"
        p="4"
        w={{ base: "95%", lg: "500px" }}
        borderBottom="2px"
        borderColor="teal"
      >
        <Flex flexDirection="column" gap="4">
          <Heading size="lg">{joke.question}</Heading>
          {
            !showAnswer && 
            <Button
              onClick={onClick}
              colorScheme='teal'
              textTransform="uppercase"
            >
              <Text textAlign="center">Click to see answer</Text>
            </Button>
          }
        </Flex>
      </Card>
      {
        showAnswer &&
        <Card
          p="4"
          bg="#1A202C"
          color="white"
          borderBottom="2px"
          borderColor="teal"
          w={{ base: "95%", lg: "500px" }}
        >
          <Text fontSize="xl" textAlign="center">{joke.answer}</Text>
        </Card>
      }
    </>
  )
}
