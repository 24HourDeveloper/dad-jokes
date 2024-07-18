'use client'
import React from 'react'
import { Flex, Button } from "@chakra-ui/react";
import { useUser } from '@clerk/clerk-react';

export default function CardButtons(props: { xata_id: string, disableLaugh: boolean, onNext: () => void }) {
  const { user } = useUser();
  const addLaughToJoke = async (e: any) => {
    e.preventDefault()
    try {
      await fetch('/api/add-laugh',{
        method: 'POST',
        body: JSON.stringify({ jokeId: props.xata_id, userId: user?.id })
      })
      props.onNext()
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  return (
    <Flex justifyContent="space-between" w={{ base: "95%", lg: "500px" }}>
      <Button w="48%" colorScheme="teal" shadow="lg"
        onClick={addLaughToJoke}
        isDisabled={props.disableLaugh}>
        Laugh
      </Button>
      <Button w="48%" variant="outline" colorScheme="teal" shadow="lg" onClick={props.onNext}>
        Crickets
      </Button>
    </Flex>
  )
}
