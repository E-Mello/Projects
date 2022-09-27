import { useState } from "react";

import { Avatar } from "./Avatar";
import { LogoUnemat } from "./LogoUnemat";


import { BsFillArrowLeftSquareFill, BsSearch, BsFillArrowRightSquareFill, BsJournalBookmarkFill, BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdDashboard, MdOutlineBuild, MdSchool } from "react-icons/md";
import { BiChat, BiLogOut, BiUser } from "react-icons/bi";
import { VscFiles } from "react-icons/vsc";

import styles from './SideNavBarLeft.module.css'

export function SideNavBarLeft() {
    const [isActive, setIsActive] = useState(true);

    function changeStateBtn() {
        setIsActive(!isActive);
        console.log(isActive);

    }

    return (
        <>
            <div className={isActive ? styles.sideMenuActive : styles.sideMenuInactive}>
                <div className={styles.topSection}>
                    <div className={styles.logo}>
                        <LogoUnemat src="../src/assets/LogoUnemat.png" />
                    </div>
                    <div className={styles.toggleMenuBtn} onClick={changeStateBtn}>
                        {isActive ?
                            <BsFillArrowLeftSquareFill className={styles.arrowLeft} size={20} style={{ transitionDelay: '0.3s' }} />
                            :
                            <BsFillArrowRightSquareFill className={styles.arrowRight} size={20} />
                        }
                    </div>
                    {/* <div className={styles.searchController}>
                        <button className={styles.searchBtn}>
                            <BsSearch className={styles.searchController} />
                        </button>

                        <input type="text" placeholder="search" />
                    </div> */}
                </div>
                <nav className={styles.opContainer}>
                    <ul className={styles.navList}>
                        <li>
                            <a href="#">
                                <i><MdDashboard /></i>
                                <span className={styles.linksName}>Dashboard</span>
                            </a>
                            <span className={styles.tooltip} >Dashboard</span>
                        </li>
                        <li>
                            <a href="#">
                                <i><MdSchool /></i>
                                <span className={styles.linksName}>TCC's Feitos</span>
                            </a>
                            <span className={styles.tooltip} >TCC's Feitos</span>
                        </li>
                        <li>
                            <a href="#">
                                <i><BsJournalBookmarkFill /></i>
                                <span className={styles.linksName}>Projetos</span>
                            </a>
                            <span className={styles.tooltip} >Projetos</span>
                        </li>
                        <li>
                            <a href="#">
                                <i><VscFiles /></i>
                                <span className={styles.linksName}>Arquivos</span>
                            </a>
                            <span className={styles.tooltip} >Arquivos</span>
                        </li>
                        <li>
                            <a href="#">
                                <i><BsFillBookmarkHeartFill /></i>
                                <span className={styles.linksName}>Mídias</span>
                            </a>
                            <span className={styles.tooltip} >Mídias</span>
                        </li>
                        <li>
                            <a href="#">
                                <i><BiUser /></i>
                                <span className={styles.linksName}>Canais Discord</span>
                            </a>
                            <span className={styles.tooltip} >Canais Discord</span>
                        </li>
                    </ul>
                    <div className={styles.profileContent}>
                        <div className={styles.profile}>
                            <div className={styles.profileDetails}>
                                <Avatar src="https://github.com/E-Mello.png" />
                                <div className={styles.nameJob}>
                                    <div className={styles.name}>Édio Melo</div>
                                    <div className={styles.job}>Web Developer</div>
                                </div>
                                <i><BiLogOut /></i>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}