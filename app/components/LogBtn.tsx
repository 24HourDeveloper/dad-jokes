'use client'
import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useAuth, useClerk } from "@clerk/nextjs";

export default function LogBtn() {
  const { userId } = useAuth()
  const { signOut } = useClerk()
  if(!userId){
    return (
      <Link
        p="2"
        rounded="lg"
        href='/sign-in'
        color="white"
        bg="teal.500"
        textTransform="uppercase"
        _hover={{ bg: 'teal.700' }}
        fontSize={["sm", "lg"]}
      >
        Sign In
      </Link>
    )
  }
  return (
    <Button
      p="2"
      rounded="lg"
      colorScheme="teal"
      textTransform="uppercase"
      onClick={() => signOut({redirectUrl: "/"})}
    >Sign Out
    </Button>
  )
}
