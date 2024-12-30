import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleTask = () => {
    navigate("/task");
  };

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e border-black dark:border-gray-400 font-mono bg-white dark:bg-dark dark:text-grey-300">
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <span
            onClick={handleHome}
            className="grid h-12 w-12 place-content-center rounded-lg bg-gray-100 dark:bg-grey-700 dark:text-grey-300 text-xs font-semibold text-gray-600 border-2 border-gray-600"
          >
            Tasky
          </span>
        </div>

        <div className="border-t border-black dark:border-gray-400">
          <div className="px-2">
            <div className="py-4">
              <button
                onClick={handleTask}
                className="t group relative flex justify-center rounded bg-blue-50 dark:bg-blue-600/40 px-2 py-1.5 text-blue-700 dark:text-blue-400 dark:border-blue-300/30 border border-blue-700/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
                <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100" style={{ zIndex: 1 }}>
                  Tasks
                </span>
              </button>
            </div>


          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-black bg-white dark:bg-dark dark:border-gray-400 p-2">
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100" style={{ zIndex: 1 }}>
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
