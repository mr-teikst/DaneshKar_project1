import React from "react";
import styles from "./Login.module.scss";
import { Card } from "../../components/ui/card";
import LoginForm from "../../components/Forms/LoginForm";

const Login = () => {
  return (
    <div className={styles.full_screen}>
      <Card className={styles.card_style}>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
