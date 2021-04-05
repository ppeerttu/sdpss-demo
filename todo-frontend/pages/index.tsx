import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";

import { useAppState } from "../src/state";
import { OverlaySpinner } from "../src/components/OverlaySpinner";
import { SignInForm } from "../src/components/SignInForm";
import { Todos } from "../src/components/Todos";
import { SignOutBar } from "../src/components/SignOutBar";

export default function Home(): JSX.Element {
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
