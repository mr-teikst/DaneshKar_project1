// // AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   console.log("checking token if exists");
//   const TOKEN = localStorage.getItem("token");
//   console.log("token: " + TOKEN);
//   if (TOKEN) {
//     console.log("setting setIsAuthenticated...");
//     setIsAuthenticated(true);
//   }
//   // useEffect(async () => {

//   // }, []);

//   // const login = () => setIsAuthenticated(true);
//   // const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
