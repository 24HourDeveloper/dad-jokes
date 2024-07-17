'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react';
import { Heading, Flex, Card, Text, Button } from "@chakra-ui/react";
import CardButtons from './CardButtons'

type Joke = {
  question: string;
  answer: string;
  xata_id: string;
  laughs: number
}
type Jokes = {
  jokes: Joke[]
}
export default function Joke({ jokes } : Jokes) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomJoke, setRandomJoke] = useState<Joke | null>(null)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const joke = jokes[Math.floor(Math.random() * 90)];
    setRandomJoke(joke)
  },[])

  if(!randomJoke) return null;

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
        w={{ base: "95%", lg: "500px" }}
        borderBottom="2px"
        borderColor="orange"
      >
        <Flex flexDirection="column" gap="4">
          <Heading size="lg">{randomJoke.question}</Heading>
          {
            !showAnswer && 
            <Button
              onClick={() => setShowAnswer(true)}
              bg="orange.100"
              _hover={{
                color: "white",
                bg: "orange.500",
              }}
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
          borderBottom="2px"
          borderColor="orange"
          w={{ base: "95%", lg: "500px" }}
        >
          <Text fontSize="xl" textAlign="center">{randomJoke.answer}</Text>
        </Card>
      }
      {
        isSignedIn &&
        <CardButtons
          {...randomJoke}
          disableLaugh={!showAnswer}
          onNext={() => {
            const joke = jokes[Math.floor(Math.random() * 90)];
            setShowAnswer(false)
            setRandomJoke(joke)
          }}
        />
      }
      {
        !isSignedIn &&
        <Button
          shadow="lg"
          colorScheme="orange"
          w={{ base: "95%", lg: "500px" }}
          onClick={() => {
            const joke = jokes[Math.floor(Math.random() * 90)];
            setShowAnswer(false)
            setRandomJoke(joke)
          }}
        >
          Next Joke
        </Button>
      }
    </Flex>
  )
}
