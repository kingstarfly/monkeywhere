import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import ReportModal from "../components/ReportModal";
import { useRequireAuth } from "../lib/auth";
import { SignOutIcon } from "../styles/theme";

const MonkeyMap = dynamic(() => import("../components/MonkeyMap"), {
  ssr: false,
});
const map = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = useRequireAuth();
  const toast = useToast();
  const id = "test-toast";

  if (auth.loading || !auth.user) {
    return <Skeleton height="100vh" />;
  }
  // Show instructions on how to add sighting
  if (!toast.isActive(id)) {
    toast({
      title: "How to use",
      description: "Spotted a monkey? Long press on the location to report it!",
      duration: 5000,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      flexDirection={["column", "column", "row-reverse"]}
    >
      <Box h={["90%", "90%", "100%"]} w={["100%", "100%", "85%"]}>
        <MonkeyMap />
      </Box>
      <Flex
        h={["10%", "10%", "100%"]}
        w={["100%", "100%", "15%"]}
        flexDirection={["row", "row", "column-reverse"]}
        bg="burlywood"
        justifyContent={["space-around", "space-around", "center"]}
        alignItems="center"
        px={4}
      >
        <Button
          leftIcon={<SignOutIcon />}
          size={"sm"}
          px="2"
          onClick={(e) => auth.signout()}
          mt={[0, 0, 8]}
        >
          Sign Out
        </Button>
        <Flex
          alignContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Heading size={["lg"]}>monkeywhere</Heading>
          <Text textAlign="center" fontSize={["md", "md", "lg"]}>
            Logged in as {auth?.user?.name}
          </Text>
        </Flex>
      </Flex>
      <ReportModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default map;
