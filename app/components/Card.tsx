import React from 'react'
import { Heading, Flex, Card, Text, Button, Box } from "@chakra-ui/react";

type ContainerTypes = {
  showAnswer?: boolean;
  joke: { question: string; answer: string, laughs: number};
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
        pos="relative"
      >
        <Box
          pos="absolute"
          p="2"
          bg="white"
          w="8"
          h="8"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          left={["-5px","-15px"]}
          top="-8px"
          border="2px"
          borderColor="teal"
        >
          {joke.laughs}
        </Box>
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
