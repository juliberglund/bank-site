import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login";
import { useRouter } from "next/router";
import { loginUser } from "@/utils/api";

// Mocka `loginUser`-funktionen och `useRouter` från Next.js
jest.mock("@/utils/api", () => ({
  loginUser: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  let mockPush;

  beforeEach(() => {
    // Reset mocks mellan varje test
    mockPush = jest.fn();

    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  test("renders login form", () => {
    render(<Login />);

    // Verifiera att alla formulärfält och knappar är renderade
    expect(screen.getByLabelText(/Användarnamn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lösenord/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Logga in/i })
    ).toBeInTheDocument();
  });

  test("successful login redirects to home page", async () => {
    // Mocka loginUser så att den returnerar ett användarobjekt
    loginUser.mockResolvedValue({
      userId: "12345",
      otp: "67890",
    });

    render(<Login />);

    // Fyll i formulärfält
    fireEvent.change(screen.getByLabelText(/Användarnamn/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Lösenord/i), {
      target: { value: "password" },
    });

    // Skicka formuläret
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    // Vänta på att router.push ska kallas
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/"));

    // Kontrollera att rätt data lagras i localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith("userId", "12345");
    expect(localStorage.setItem).toHaveBeenCalledWith("otp", "67890");
    expect(localStorage.setItem).toHaveBeenCalledWith("username", "testuser");
  });

  test("fails to login with invalid credentials", async () => {
    // Mocka loginUser så att den returnerar null för ogiltiga inloggningsuppgifter
    loginUser.mockResolvedValue(null);

    render(<Login />);

    // Fyll i formulärfält
    fireEvent.change(screen.getByLabelText(/Användarnamn/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/Lösenord/i), {
      target: { value: "wrongpassword" },
    });

    // Skicka formuläret
    fireEvent.click(screen.getByRole("button", { name: /Logga in/i }));

    // Vänta på att inget skall ske (router.push bör inte anropas)
    await waitFor(() => expect(mockPush).not.toHaveBeenCalled());
  });
});
