import React from 'react';

import styles from './Footer.module.css';

import igniteLogo from '../assets/ignite-logo.svg';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={igniteLogo} alt="Logotipo do ignite" />
        </footer>
    );
}