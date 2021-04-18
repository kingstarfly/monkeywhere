import {
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "../lib/auth";
import Login from "../components/Login";

function Home() {
  const auth = useAuth();
  const router = useRouter();

  // if cookie is there, redirect to map
  if (document.cookie && document.cookie.includes("monkeywhere-auth")) {
    router.push("/map");
  }
  // if loading, show loading screen
  if (auth.loading) {
    return <Skeleton height="100vh" />;
  }

  // if not loading and user is true, then redirect to map
  return <Login />;
}

export default Home;
