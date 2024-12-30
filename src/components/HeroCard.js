import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function HeroCard({ title, subtitle, buttons }) {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleAuth0 = async () => {
    await loginWithRedirect();
  };

  return (
    <div className="flex flex-col md:flex-row border border-black rounded-lg bg-gray-100 justify-start items-start">
      <img
        className="md:-translate-y-3 md:drop-shadow-lg md:scale-150 m-0 -ml-3"
        src={process.env.PUBLIC_URL + "/hero-img.png"}
        alt="Hero Image"
      />

      <div className="flex flex-col h-full justify-center space-y-3 m-5">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        <p className="text-2xl ml-2 text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
        {buttons && (
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 my-7">
            <button
              onClick={handleAuth0}
              className="bg-gray-900 hover:bg-gray-700 text-white border-white border-2  font-bold py-2 px-4 rounded"
            >
              Get Started With Auth0
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-gray-300 hover:bg-gray-700 hover:text-white  border-black border text-gray-700 font-bold py-2 px-4 rounded"
            >
              Continue with Username
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroCard;
