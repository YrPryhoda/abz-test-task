import React from "react";
import styles from "./styles.module.scss";
import { User } from "../../../types";
import Card from "../Card";

interface IProps {
  users: User[] | [];
}

const Cardlist = ({ users }: IProps) => {
  if (!users.length) {
    return <p className={styles.cardList__empty}>List is empty</p>;
  }

  return (
    <div className={styles.cardList}>
      {users.map((user) => (
        <div key={user.id} className={styles.cardList__item}>
          <Card user={user} />
        </div>
      ))}
    </div>
  );
};

export default Cardlist;
