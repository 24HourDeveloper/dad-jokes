import React from 'react'
import { Flex } from "@chakra-ui/react";
import prisma from '../db'
import Card from '../components/Card'

export default async function PopularPage() {
  const allFunnyJokes = await prisma.joke.findMany({
    where: {
      laughs: {gt: 0}
    }
  })
  return (
    allFunnyJokes.map(joke => {
      return (
        <Flex
          flexDir="column"
          gap="2"
          w="100%"
          justifyContent="center"
          alignItems="center"
          mt="6"
        >
          <Card joke={joke} showAnswer={true}/>
        </Flex>
      )
    })
  )
}
