import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";

import { useAppState } from "../state";
import { OverlaySpinner } from "./components/OverlaySpinner";
import { SignInForm } from "./components/SignInForm";
import { Todos } from "./components/Todos";
import { SignOutBar } from "./components/SignOutBar";

export default function Home() {
  const { user, getMe, signOut } = useAppState();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    getMe()
      .catch(console.error)
      .finally(() => setPending(false));
  }, [setPending, getMe]);

  return (
    <>
      <OverlaySpinner render={pending} />
      <div>
        <Container component="main" maxWidth="xs">
          {user ? (
            <>
              <Todos />
              <SignOutBar user={user} signOut={signOut} />
            </>
          ) : (
            <SignInForm />
          )}
        </Container>
      </div>
    </>
  );
}
