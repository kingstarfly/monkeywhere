import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../lib/auth";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import theme from "../styles/theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [innerHeight, setH] = React.useState(
    typeof window !== "undefined" ? window.innerHeight : 100
  );

  function windowResizeHandler() {
    if (window !== undefined) {
      setH(window.innerHeight);
    }
  }

  React.useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", windowResizeHandler);
      return () => {
        window.removeEventListener("resize", windowResizeHandler);
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
