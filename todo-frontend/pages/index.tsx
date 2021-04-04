import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useAppState } from "../state";
import { OverlaySpinner } from "./components/OverlaySpinner";
import { SignInForm } from "./components/SignInForm";
import { Todos } from "./components/Todos";

export default function Home() {
  const { authPending, user, getMe } = useAppState();

  useEffect(() => {
    getMe().catch(console.error);
  }, []);

  return (
    <>
      <OverlaySpinner render={authPending} />
      <div>
        <Container component="main" maxWidth="xs">
          {user ? <Todos /> : <SignInForm />}
        </Container>
      </div>
    </>
  );
}
