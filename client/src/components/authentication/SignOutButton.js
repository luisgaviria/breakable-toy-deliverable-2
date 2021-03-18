import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const signOut = (event) => {
    event.preventDefault();
    fetch("/api/v1/user-sessions", {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then(() => {
          setShouldRedirect(true);
          return { status: "ok" };
        });
      } else {
        const errorMessage = `${resp.status} (${resp.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <Button variant="outline-secondary" className="ml-auto" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
