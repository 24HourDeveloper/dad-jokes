"use client";
import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

export default function Answer({ answer }: { answer: string }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Button
      onClick={() => setShowAnswer(true)}
      bg={showAnswer ? "white" : "orange.100"}
      _hover={{
        color: showAnswer ? "black" : "white",
        bg: showAnswer ? "white" : "orange.500",
      }}
    >
      {showAnswer ? (
        <Text fontSize="xl">{answer}</Text>
      ) : (
        <Text>{"Click to see answer"}</Text>
      )}
    </Button>
  );
}
