import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react"

function Authenticate() {

	const {isAuthenticated} = useAuth0()
	// let isAuthenticated = true;
	// if (localStorage.getItem("username") !== null) {
	//   isAuthenticated = false;
	// }
  return isAuthenticated ?<Navigate to="/" /> : <Outlet />;
}

export default Authenticate