import React from 'react'
import styles from '../../styles/home/Home.module.css'
import Link from 'next/link'
function TopBar() {
    return (


        <div className={styles.topbarcont}>
            <div className={styles.left}>
                <div className={styles.logo_pic}>
                    <Link href={"home"} >
                        <img src='/Instprofile.jpg' /></Link>
                </div>
            </div>
            <div className={styles.center}>
                <ul>
                    <li> <Link href={"home"}>Home</Link></li>
                    <li> <Link href={""}> About software</Link></li>
                    <li><Link href={""}>Help on software</Link></li>
                </ul>
            </div>
            <div className={styles.right}>
                <div className={styles.profile_pic}>
                    <img src='/profi.jpg' />
                </div>

                <button>My Account</button>
            </div>
        </div>

    )
}

export default TopBar