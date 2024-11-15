import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Label } from "../ui/label.jsx";
import { Button } from "../ui/button.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  navigate("/login");
};

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);
  return (
    <div className={styles.nav_box}>
      <Label className="mx-4">{username}</Label>
      <Button
        onClick={() => {
          Logout(navigate);
        }}
        className="mx-4"
      >
        Logout
      </Button>
      {/* <div className={styles.nav_container}>
      </div> */}
    </div>
  );
};

export default Navbar;
