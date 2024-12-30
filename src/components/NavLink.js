import React from "react";

function NavLink({ name, navigateTo }) {
  return (
    <a
      href={navigateTo}
      className="text-gray-800 p-2 border rounded-sm border-white transition-all hover:border-gray-400 hover:bg-gray-300"
    >
      {name}
    </a>
  );
}

export default NavLink;
