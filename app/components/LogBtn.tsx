'use client'
import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useAuth, useClerk } from "@clerk/nextjs";

export default function LogBtn() {
  const { userId } = useAuth()
  const { signOut } = useClerk()
  if(!userId){
    return <Link href='/sign-in' textTransform="uppercase" color="white" bg="teal.500" _hover={{ bg: 'teal.700' }} p="2" rounded="lg">Sign In</Link>
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
