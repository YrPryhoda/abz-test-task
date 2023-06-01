import React, { useEffect, useState } from "react";
import ScrollIntoView from "react-scroll-into-view";

import { Position, User, UserForm } from "../../../types";
import { abzService } from "../../services/abz.service";

import registerImg from "../../assets/images/success-image.svg";
import Preloader from "../../components/Preloader";
import Cardlist from "../../components/CardList";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Form from "../../components/Form";
import styles from "./styles.module.scss";

const Main = () => {
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [fetchUsersLoading, setFetchUsersLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [formSent, setFormSent] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  const sendForm = async (form: UserForm, file: File) => {
    if (!form || !file) {
      return;
    }

    const body = {
      ...form,
      photo: file,
      position_id: form.position_id,
    };

    const response = await abzService.sendForm(body);

    if (!response) {
      return alert("Registration failed");
    }

    const userData = await abzService.getUserById(response.user_id);

    if (!userData) {
      return alert("Error fetch user");
    }

    setUsers((prevState) => {
      const firstPage = prevState.slice(0, 5);

      return [userData.user, ...firstPage];
    });

    setFormSent(true);
  };

  const fetchUsers = async (page: number) => {
    const data = await abzService.getUsers(page);

    if (!data) {
      return;
    }
    setLoadMore(page < data.total_pages);
    setPage(data.page);
    return data.users;
  };

  const initialLoadUsers = async () => {
    setFetchUsersLoading(true);
    const loadedUsers = await fetchUsers(page);
    setFetchUsersLoading(false);

    if (!loadedUsers) {
      return;
    }

    setUsers(loadedUsers);
  };

  const fetchMoreUsers = async () => {
    setFetchMoreLoading(true);
    const loadedUsers = await fetchUsers(page + 1);
    setFetchMoreLoading(false);

    if (!loadedUsers) {
      return;
    }

    setUsers([...users, ...loadedUsers]);
  };

  const fetchPositions = async () => {
    const data = await abzService.getPositions();

    if (!data) {
      return;
    }

    setPositions(data.positions);
  };

  useEffect(() => {
    initialLoadUsers();
    fetchPositions();
  }, []);

  const loadingMoreJSX = fetchMoreLoading ? (
    <Preloader />
  ) : (
    <Button title="Show more" onClick={fetchMoreUsers} />
  );

  return (
    <Layout>
      <div>
        <section className={styles.welcome}>
          <div className={styles.welcome__wrapper}>
            <div className={styles.welcome__content}>
              <h1 className={styles.welcome__title}>
                Test assignment for front-end developer
              </h1>
              <p className={styles.welcome__text}>
                What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User
                design thinking as they'll be building web interfaces with
                accessibility in mind. They should also be excited to learn, as
                the world of Front-End Development keeps evolving.
              </p>
              <ScrollIntoView selector="#sign-up">
                <Button title="Sign up" />
              </ScrollIntoView>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.section__wrapper} id="users">
            <Title title="Working with GET request" />
            {fetchUsersLoading ? (
              <div className={styles.section__content}>
                <Preloader />
              </div>
            ) : (
              <div className={styles.section__content}>
                <Cardlist users={users} />
                <div className={styles.section__btn}>
                  {loadMore ? loadingMoreJSX : null}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.section__wrapper} id="sign-up">
            {!formSent ? (
              <div
                className={`${styles.section__content} ${styles.section__mb100}`}
              >
                <Title title="Working with POST request" />
                <Form positions={positions} onSubmit={sendForm} />
              </div>
            ) : (
              <div
                className={`${styles.section__content} ${styles.section__mb100}`}
              >
                <Title title="User successfully registered" />
                <img alt="Registration completed" src={registerImg} className={styles.section__img}/>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Main;
