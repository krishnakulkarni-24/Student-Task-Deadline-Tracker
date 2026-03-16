import { useState, useEffect } from "react";

function Navbar() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">

      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Task Dashboard
      </h1>

      <div className="flex items-center gap-4">

        {/* Theme Toggle */}

        <div className="flex items-center gap-2">

          <span className="text-yellow-400">☀️</span>

          <div
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer transition"
          >

            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                darkMode ? "translate-x-7" : ""
              }`}
            ></div>

          </div>

          <span className="text-gray-400">🌙</span>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;