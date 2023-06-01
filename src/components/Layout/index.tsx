import React from 'react'
import 'react-tooltip/dist/react-tooltip.css';

import styles from './styles.module.scss';
import Header from '../Header';

interface IProps {
    children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
    return (
        <main>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
        </main>
    )
}

export default Layout;