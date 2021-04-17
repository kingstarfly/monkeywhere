import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../lib/auth";

function Login() {
  const auth = useAuth();
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      p={8}
    >
      <Heading size="2xl">monkeywhere</Heading>
      <Text textAlign="center" fontSize="lg">
        Help us find out where they are!
      </Text>
      <Button
        colorScheme="teal"
        mt={4}
        size="lg"
        onClick={(e) => auth.signinWithGoogle()}
      >
        Sign in
      </Button>
    </Flex>
  );
}

export default Login;
