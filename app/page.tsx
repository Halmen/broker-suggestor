"use client";

import { Provider } from "react-redux";
import { useMemo } from "react";
import { makeStore } from "@/redux/store";
import Home from "@/components/Home/Home";

const App = () => {
  const store = useMemo(() => {
    return makeStore();
  }, []);

  return (
    <Provider store={store}>
      <main>
        <Home />
      </main>
    </Provider>
  );
};

export default App;
