"use client";

import { Toaster } from "react-hot-toast";

// Because it depends on user activity, the toaster needs to be client side. In order for Layout.tsx to use it, it needs to be wrapped in a client component.
function ClientProvider() {
  return (
    <>
      <Toaster position="top-right" />
    </>
  );
}

export default ClientProvider;
