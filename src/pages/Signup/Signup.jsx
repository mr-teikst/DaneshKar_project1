import React from "react";
import SignupForm from "../../components/Forms/SignupForm.jsx";
import styles from "./Signup.module.scss";
import { Card } from "../../components/ui/card.jsx";


const Signup = () => {
  return (
    <div className={styles.full_screen}>
      <Card className={styles.card_style}>
        <SignupForm />
      </Card>
    </div>
  );
};

export default Signup;
