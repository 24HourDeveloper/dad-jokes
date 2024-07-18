import React from 'react'
import { Flex, Heading } from "@chakra-ui/react";
import prisma from '../db'
import Card from '../components/Card'

export default async function PopularPage() {
  const allFunnyJokes = await prisma.joke.findMany({
    where: {
      laughs: {gt: 0}
    },
    orderBy: {
      laughs: 'desc'
    }
  })

  if(allFunnyJokes.length === 0){
    return <Heading color="white" textAlign="center">No votes at this time</Heading>
  }
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
