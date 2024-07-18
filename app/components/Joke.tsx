'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react';
import { Flex, Button } from "@chakra-ui/react";
import CardButtons from './CardButtons'
import Container from './Card';

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
      <Container
        joke={randomJoke}
        showAnswer={showAnswer}
        onClick={() => setShowAnswer(true)}
      />
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
          colorScheme="teal"
          textTransform="uppercase"
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
