'use client'
import React, { useState } from 'react'
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardHeader, Text, Flex, Input, Button, AbsoluteCenter } from '@chakra-ui/react'

export default function page() {
  const [verifying, setVerifying] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false)
  const router = useRouter()
  const { signIn, isLoaded: isLoadedSignIn, setActive: signInSetActive } = useSignIn()
  const { signUp, isLoaded: isLoadedSignUp, setActive } = useSignUp()
  const { register, handleSubmit, formState: { errors } } = useForm<{email: string, code: string}>();

  const onSubmit: SubmitHandler<{email: string}> = async(data) => {
    if (!isLoadedSignUp || !isLoadedSignIn) return;

    try {
      await signUp.create({
        emailAddress: data.email
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })

      setVerifying(true);
    } catch (err: any) {
      if (err.errors.some((e: any) => e.code === "form_identifier_exists")) {
        try {
          const signInAttempt = await signIn.create({
            identifier: data.email,
          });

          const emailAddressId = signInAttempt.supportedFirstFactors.find(factor => factor.strategy === "email_code")

          if(emailAddressId) {
            await signIn.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: emailAddressId.emailAddressId
            })

            setVerifying(true);
            setIsSignIn(true)
            signInSetActive({ session: signInAttempt.createdSessionId })
          } else {
            throw new Error("Email address ID not found");
          }
        } catch (error) {
          console.error("Sign-in error:", error);
        }
      }
    }
  }

  const handleVerify: SubmitHandler<{code: string}> = async(data) => {
    if (!isLoadedSignUp || !isLoadedSignIn) return;

    try {
      const completeAuthentication = isSignIn ? await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: data.code
      }) : await signUp.attemptEmailAddressVerification({
        code: data.code
      })

      if(completeAuthentication.status === 'complete') {
        await setActive({ session: completeAuthentication.createdSessionId})
        if(isSignIn === false && 'emailAddress' in completeAuthentication){
          try {
            await fetch("/api/inngest-create-user", {
              method: 'POST',
              body: JSON.stringify({
                email: completeAuthentication.emailAddress,
                id: completeAuthentication.createdUserId
              })
            })
          } catch (error) {
            console.log('INNGEST ERROR: ', error)
          }
        }
        router.push("/")
      } else {
        console.error(JSON.stringify(completeAuthentication, null, 2));
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  const onSubmitSocialSignup = async() => {
    if (!isLoadedSignUp || !isLoadedSignIn) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sign-up/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (error) {
      
    }
  }

  if (verifying) {
    return (
      <Flex justifyContent="center">
        <Card w={["95%", "65%", "40%"]} p="4" mt="4" bg="transparent">
          <CardHeader color="white">Verify your email</CardHeader>
          <form onSubmit={handleSubmit(handleVerify)}>
            <Flex flexDirection="column" gap="4">
              <Input
                focusBorderColor='teal.600'
                color="white"
                placeholder='Enter Code' {...register("code")}
              />
              <Button textTransform="uppercase" colorScheme='teal' type='submit'>
                Verify
              </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center">
      <Card w={["95%", "65%", "40%"]} p="4" mt="4" bg="transparent">
        <CardHeader color="white">
          Sign In
        </CardHeader>
        <Flex flexDirection="column" gap="4">
        <Button textTransform="uppercase" colorScheme='teal' variant="outline" onClick={onSubmitSocialSignup}>
          Google
        </Button>
          <Text color="white" textAlign="center">OR</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column" gap="4">
              <Input focusBorderColor='teal.600' color="white" placeholder='Enter Email' {...register("email")}/>
              <Button textTransform="uppercase" colorScheme='teal' type='submit'>Sign In</Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  )
}
