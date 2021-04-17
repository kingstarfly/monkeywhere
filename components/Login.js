import { Button } from "@chakra-ui/button";
import { useAuth } from "../lib/auth";

export default function Login() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      {auth?.user?.email}

      {auth.user ? (
        <>
          <Button mt={4} size="sm" onClick={(e) => auth.signout()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGoogle()}>
          Sign in
        </Button>
      )}
    </div>
  );
}
