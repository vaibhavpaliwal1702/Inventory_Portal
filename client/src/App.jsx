import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getUserName } from "./Info/login";
import { APIContext, userContext } from "./context/Context";
import { getData } from "./Info/Item";
export async function loader() {
  const usrname = await getUserName();
  return usrname;
}
const App = () => {
  const data = useLoaderData();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setUserData(res);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <userContext.Provider value={data}>
        <Navbar />
        <div className="Content">
          <APIContext.Provider value={{userData,setUserData}}>
            <SubNavbar/>
            <Outlet />
          </APIContext.Provider>
        </div>
      </userContext.Provider>
    </>
  );
};

export default App;
