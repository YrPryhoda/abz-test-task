import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";

import avatarImg from "../../assets/images/photo-cover.svg";
import styles from "./styles.module.scss";
import { User } from "../../../types";

interface IProps {
  user: User;
}

const Card = ({ user }: IProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handlerImagePreview = () => {
    if (!imgRef.current) {
      return;
    }

    imgRef.current.setAttribute("src", avatarImg);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__avatar}>
        <img
          onError={handlerImagePreview}
          ref={imgRef}
          alt={user.name}
          src={user.photo}
          className={styles.card__img}
        />
      </div>
      <p
        className={`${styles.card__field} ${styles.card__item}`}
        data-tooltip-id="name"
        data-tooltip-content={user.name}
        data-tooltip-place="bottom"
      >
        {user.name}
      </p>
      <Tooltip id="name" />
      <div className={styles.card__field}>
        <p
          className={styles.card__item}
          data-tooltip-id="position"
          data-tooltip-content={user.position}
          data-tooltip-place="bottom"
        >
          {user.position}
        </p>
        <Tooltip id="position" />
        <p
          className={styles.card__item}
          data-tooltip-id="email"
          data-tooltip-content={user.email}
          data-tooltip-place="bottom"
        >
          {user.email}
        </p>
        <Tooltip id="email" />
        <p
          className={styles.card__item}
          data-tooltip-id="phone"
          data-tooltip-content={user.phone}
          data-tooltip-place="bottom"
        >
          {user.phone}
        </p>
        <Tooltip id="phone" />
      </div>
    </div>
  );
};

export default Card;
