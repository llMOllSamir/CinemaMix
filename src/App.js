import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ProtectedProvider from "./components/ProtectedProvider/ProtectedProvider.jsx";
import LoginProvider from "./components/LoginProvider/LoginProvider.jsx";
import "./App.css";
import jwtDecode from "jwt-decode";
import ApisContext from "./Context/ApisContext.js";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Person from "./components/Person/Person.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";
import Tv from "./components/Tv/Tv.jsx";
import DarkContext from "./Context/DarkContext.js";
import TvDetailes from "./components/TvDetailes/TvDetailes.jsx";
import PersonDetailes from "./components/PersonDetailes/PersonDetailes.jsx";

export default function App() {
  let [userdata, setUserData] = useState(null);

  let saveUser = () => {
    if (localStorage.getItem("userToken")) {
      let incodedToken = localStorage.getItem("userToken");
      let decoded = jwtDecode(incodedToken);
      setUserData(decoded);
    }
  };

  let routing = createBrowserRouter([
    {
      path: "",
      element: <LayOut userdata={userdata} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedProvider>
              <Home />
            </ProtectedProvider>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedProvider>
              <Home />
            </ProtectedProvider>
          ),
        },
        {
          path: "/movies",
          element: (
            <ProtectedProvider>
              <Movies />
            </ProtectedProvider>
          ),
        },
        {
          path: "/tvshow",
          element: (
            <ProtectedProvider>
              <Tv />
            </ProtectedProvider>
          ),
        },
        {
          path: "/people",
          element: (
            <ProtectedProvider>
              <Person />
            </ProtectedProvider>
          ),
        },
        {
          path: "/movies/:id",
          element: (
            <ProtectedProvider>
              <MovieDetails />
            </ProtectedProvider>
          ),
        },
        {
          path: "/tv/:id",
          element: (
            <ProtectedProvider>
              <TvDetailes />
            </ProtectedProvider>
          ),
        },
        {
          path: "/person/:id",
          element: (
            <ProtectedProvider>
              <PersonDetailes />
            </ProtectedProvider>
          ),
        },
        {
          path: "/login",
          element: (
            <LoginProvider>
              <Login saveUser={saveUser} />
            </LoginProvider>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginProvider>
              <Register />
            </LoginProvider>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  useEffect(() => {
    saveUser();
  }, []);
  return (
    <>
      <ApisContext>
        <DarkContext>
          <RouterProvider router={routing}></RouterProvider>
        </DarkContext>
      </ApisContext>
    </>
  );
}
