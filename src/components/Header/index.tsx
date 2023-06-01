import React from 'react'

import Button from '../Button';
import logoImg from '../../assets/images/Logo.svg';
import styles from './styles.module.scss';
import ScrollIntoView from 'react-scroll-into-view';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <div className={styles.header__logo}>
                    <img alt='Testtask logo' src={logoImg} />
                </div>
                <div className={styles.header__btns}>
                    <ScrollIntoView selector="#users">
                        <Button title='Users' />
                    </ScrollIntoView>
                    <ScrollIntoView selector="#sign-up">
                        <Button title="Sign up" />
                    </ScrollIntoView>
                </div>
            </div>
        </header>
    )
}

export default Header;