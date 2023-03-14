import React from 'react';
import TopBar from '../components/TopBar'
import styles from '../../styles/home/Home.module.css'
const Layout = ({ children }) => {
    return (
        
        <div>
            <div className={styles.big_container}>
                <TopBar/>
                {children}
            </div>
            
            
        </div>
    );
}

export default Layout;