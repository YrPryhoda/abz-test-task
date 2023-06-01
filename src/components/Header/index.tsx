import React from "react";

import logoImg from "../../assets/images/Logo.svg";
import ScrollIntoView from "react-scroll-into-view";
import Button from "../Button";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <img
            alt="Testtask logo"
            src={logoImg}
            className={styles.header__logo}
          />
        </div>
        <div className={styles.header__btns}>
          <ScrollIntoView selector="#users">
            <Button title="Users" />
          </ScrollIntoView>
          <ScrollIntoView selector="#sign-up">
            <Button title="Sign up" />
          </ScrollIntoView>
        </div>
      </div>
    </header>
  );
};

export default Header;
