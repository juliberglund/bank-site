import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const data = await loginUser(username, password);

    if (!data) {
      return;
    }

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("otp", data.otp);
    localStorage.setItem("username", username);

    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Välkommen att logga in
          </h2>
          <form className="mt-4" onSubmit={handleLogin}>
            <label htmlFor="username" className="block text-gray-700">
              Användarnamn
            </label>
            <input
              id="username"
              className="w-full px-4 py-2 border rounded-md text-gray-900"
              required
              type="text"
              value={username} // Bind value to the username state
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            />

            <label htmlFor="password" className="block text-gray-700 mt-4">
              Lösenord
            </label>
            <input
              id="password"
              className="w-full px-4 py-2 border rounded-md text-gray-900"
              required
              type="password"
              value={password} // Bind value to the password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            />

            <button
              className="mt-6 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-300"
              type="submit"
            >
              Logga in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
