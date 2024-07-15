import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import LogBtn from './LogBtn';

export default function Header() {
  return (
    <Box bg="orange.100" p="4" as='nav' display="flex" justifyContent="space-between" alignItems="center" shadow="md" borderBottom="2px" borderColor="orange">
      <Heading size="xl" textTransform="uppercase" sx={{WebkitTextStroke: 1.5, WebkitTextFillColor: 'transparent'}}>Dad Jokes</Heading>
      <LogBtn />
    </Box>
  )
}
