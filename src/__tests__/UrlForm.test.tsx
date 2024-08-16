import { render, screen, fireEvent } from "@testing-library/react";
import UrlForm from "../components/UrlForm";

describe("UrlForm Component", () => {
  it("should render form", () => {
    render(<UrlForm />);
    expect(screen.getByPlaceholderText("Enter your URL")).toBeInTheDocument();
  });

  it("should display error message on invalid URL", async () => {
    render(<UrlForm />);
    fireEvent.input(screen.getByPlaceholderText("Enter your URL"), {
      target: { value: "invalid-url" },
    });
    fireEvent.submit(screen.getByText("Shorten"));
    expect(
      await screen.findByText("Please enter a valid URL")
    ).toBeInTheDocument();
  });

  it("should shorten URL on valid input", async () => {
    render(<UrlForm />);
    fireEvent.input(screen.getByPlaceholderText("Enter your URL"), {
      target: { value: "https://www.example.com" },
    });
    fireEvent.submit(screen.getByText("Shorten"));
    expect(await screen.findByText(/Short URL:/)).toBeInTheDocument();
  });
});
