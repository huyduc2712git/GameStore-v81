import React from "react";
import { StoreProvider } from "./src/contexts/StoreContext";
import { AppNavigator } from "@navigation/AppNavigator";

export default function App() {

  return (
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  );
}
