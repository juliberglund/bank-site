import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "./utils/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    await registerUser(username, password);
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-pink-400">
      <div className="flex items-center justify-center py-10">
        <div className=" p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Skapa användare
          </h2>
          <form onSubmit={handleRegister} className="space-y-6 ">
            <div>
              <label className="block text-gray-700 font-medium">
                Användarnamn
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Lösenord
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Skapa användare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
