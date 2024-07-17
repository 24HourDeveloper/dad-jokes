'use client'
import React from 'react'
import { Flex, Button } from "@chakra-ui/react";

export default function CardButtons(props: { xata_id: string, disableLaugh: boolean, onNext: () => void }) {
  const addLaughToJoke = async (e: any) => {
    e.preventDefault()
    try {
      await fetch('/api/add-laugh',{
        method: 'POST', body: JSON.stringify({ id: props.xata_id })
      })
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  return (
    <Flex justifyContent="space-between" w={{ base: "95%", lg: "500px" }}>
      <Button w="48%" colorScheme="orange" shadow="lg" onClick={addLaughToJoke} isDisabled={props.disableLaugh}>
        Laugh
      </Button>
      <Button w="48%" variant="outline" colorScheme="orange" shadow="lg" onClick={props.onNext}>
        Crickets
      </Button>
    </Flex>
  )
}
