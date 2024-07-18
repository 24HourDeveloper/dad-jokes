import React from 'react'
import { Box, Heading, Link, Flex, Divider, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import LogBtn from './LogBtn';

export default function Header() {
  return (
    <Box bg="teal.200" p={["2", "4"]} as='nav' display="flex" justifyContent="space-between" alignItems="center" shadow="md" borderBottom="2px" borderColor="teal">
      <Flex alignItems="center" gap="4">
        <Link as={NextLink} href='/'>
          <Heading size={["md", "xl"]} textTransform="uppercase" sx={{WebkitTextStroke: 1.5, WebkitTextFillColor: 'transparent'}}>Dad Jokes</Heading>
        </Link>
        <Center height='50px'>
          <Divider orientation='vertical' borderColor="teal" />
        </Center>
        <Link as={NextLink} href='/popular-jokes'>Popular Jokes</Link>
      </Flex>
      <LogBtn />
    </Box>
  )
}
