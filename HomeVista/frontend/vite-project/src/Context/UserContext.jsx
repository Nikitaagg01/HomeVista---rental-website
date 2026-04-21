import React, { createContext, useEffect, useState, useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch current user
  const getCurrentUser = async () => {
    try {
      setLoading(true);

      const result = await axios.get(
        serverUrl + "/api/user/currentuser",
        { withCredentials: true }
      );

      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run on mount + serverUrl change
  useEffect(() => {
    if (serverUrl) {
      getCurrentUser();
    }
  }, [serverUrl]);

  // ✅ expose refresh function
  const value = {
    userData,
    setUserData,
    loading,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;