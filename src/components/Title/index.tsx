import React from 'react'
import styles from './styles.module.scss';

interface IProps {
    title: string;
}

const Title = ({ title }: IProps) => {
    return (
        <h2 className={styles.title}>{title}</h2>
    )
}

export default Title;