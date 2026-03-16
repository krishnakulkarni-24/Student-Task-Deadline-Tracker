import { useState } from "react";
import { login, register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      setIsLogin(true);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-white p-10 rounded-lg shadow-2xl w-96">

        {/* Toggle */}
        <div className="flex justify-center mb-6 space-x-4 text-lg">

          <button
            className={`${isLogin ? "font-bold underline" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>

          <button
            className={`${!isLogin ? "font-bold underline" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>

        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Log in" : "Sign up"}
        </h2>

        {/* Name field (only register) */}
        {!isLogin && (
          <input
            className="w-full mb-4 p-3 border rounded shadow-md"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full mb-4 p-3 border rounded shadow-md"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 border rounded shadow-md"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        {isLogin ? (
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          >
            Let's go!
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Confirm!
          </button>
        )}

      </div>

    </div>
  );
}

export default Auth;