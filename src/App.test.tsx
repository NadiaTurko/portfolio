import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

test("renders portfolio hero name", () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const nameElement = screen.getByText(/Nadia Romanchuk/i);
  expect(nameElement).toBeInTheDocument();
});
