import React from 'react'
import styles from './styles.module.scss';

const Preloader = () => {
    return (
        <div className={`${styles.loader} ${styles.center}`}>
            <span></span>
        </div>
    )
}

export default Preloader