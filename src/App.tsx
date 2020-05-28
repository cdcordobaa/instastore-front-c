import React from "react";
import { Counter } from "./containers/counter/Counter";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes/theme";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Counter></Counter>
      </div>
    </ThemeProvider>
  );
};

export default App;
