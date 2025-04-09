import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login";
import { useRouter } from "next/router";
import { loginUser } from "@/utils/api";

// Declare mockPush at the top
let mockPush;

// Mock `loginUser` function and `useRouter` from Next.js
jest.mock("@/utils/api", () => ({
  loginUser: jest.fn(), // Ensure loginUser is a mock function
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  // Reset mocks between each test
  mockPush = jest.fn();
  useRouter.mockReturnValue({
    push: mockPush,
  });

  // Mock localStorage.setItem
  jest.spyOn(localStorage, "setItem");
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders login form", () => {
  render(<Login />);

  // Verify that all form fields and buttons are rendered
  expect(screen.getByLabelText(/Användarnamn/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Lösenord/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Logga in/i })).toBeInTheDocument();
});

test("successful login redirects to home page", async () => {
  // Mock loginUser to return a user object
  loginUser.mockResolvedValue({
    userId: "12345",
    otp: "67890",
  });

  render(<Login />);

  // Fill in form fields
  fireEvent.change(screen.getByLabelText(/Användarnamn/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText(/Lösenord/i), {
    target: { value: "password" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

  // Wait for router.push to be called
  await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/"));

  // Check that the correct data is stored in localStorage
  expect(localStorage.setItem).toHaveBeenCalledWith("userId", "12345");
  expect(localStorage.setItem).toHaveBeenCalledWith("otp", "67890");
  expect(localStorage.setItem).toHaveBeenCalledWith("username", "testuser");
});

test("fails to login with invalid credentials", async () => {
  // Mock loginUser to return null for invalid login credentials
  loginUser.mockResolvedValue(null);

  render(<Login />);

  // Fill in form fields
  fireEvent.change(screen.getByLabelText(/Användarnamn/i), {
    target: { value: "wronguser" },
  });
  fireEvent.change(screen.getByLabelText(/Lösenord/i), {
    target: { value: "wrongpassword" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

  // Wait for nothing to happen (router.push should not be called)
  await waitFor(() => expect(mockPush).not.toHaveBeenCalled());
});
