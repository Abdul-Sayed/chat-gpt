"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>;
}

export default SessionProvider;
