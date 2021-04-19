import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../lib/auth";
import NextImage from "next/image";
import { useState } from "react";

function Login() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      p={8}
    >
      <NextImage src="/monkey-icon.png" width={100} height={100} />

      <Heading size="2xl">monkeywhere</Heading>
      <Text textAlign="center" fontSize="lg">
        Help us find out where they are!
      </Text>
      <Button
        colorScheme="teal"
        mt={4}
        size="lg"
        isLoading={isLoading}
        onClick={(e) => {
          setIsLoading(true);
          auth.signinWithGoogle();
        }}
      >
        Sign in
      </Button>
      <Text
        position="absolute"
        bottom="0"
        right="0"
        width="70vw"
        p={8}
        fontSize={16}
        fontWeight="bold"
        textAlign="right"
      >
        Have feedback? <br />
        Telegram me{" "}
        <Link color="telegram.400" href="https://t.me/oxxymoronn">
          @oxxymoronn
        </Link>
      </Text>
    </Flex>
  );
}

export default Login;
