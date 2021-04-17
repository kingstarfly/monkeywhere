import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import ReportModal from "../components/ReportModal";
import mockdata from "../lib/mockdata"; // todo: change to getting data from firestore
const MonkeyMap = dynamic(() => import("../components/MonkeyMap"), {
  ssr: false,
});

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Box w="100vw" h="100vh">
        <Box h="90%" w="100%">
          <MonkeyMap monkeyData={mockdata} />
        </Box>
        <Flex
          h="10%"
          bg="burlywood"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Spot a monkey? Long press on the map to report it!</Text>
        </Flex>
        <ReportModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </ChakraProvider>
  );
}

export default Home;
