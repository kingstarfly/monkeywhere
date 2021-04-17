import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import ReportModal from "../components/ReportModal";
import { useAuth } from "../lib/auth";
// import mockdata from "../lib/mockdata"; // todo: change to getting data from firestore
import { SignOutIcon } from "../styles/theme";

const MonkeyMap = dynamic(() => import("../components/MonkeyMap"), {
  ssr: false,
});

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();

  if (!auth?.user) {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
      >
        <Text fontSize="2xl">Sign in is required</Text>
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

  return (
    <Box w="100vw" h="100vh">
      <Box h="90%" w="100%">
        <MonkeyMap />
      </Box>
      <Flex
        h="10%"
        bg="burlywood"
        justifyContent="space-around"
        alignItems="center"
        px={4}
      >
        <Button
          leftIcon={<SignOutIcon />}
          size="lg"
          onClick={(e) => auth.signout()}
        >
          Sign Out
        </Button>
        <Box ml={4}>
          <Text fontSize="md">
            Spot a monkey? Long press on the map to report it!
          </Text>
        </Box>
      </Flex>
      <ReportModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Home;
