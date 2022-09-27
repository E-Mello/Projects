import React from 'react';
import {PhotoGrid} from './PhotoGrid';
import { Footer } from './Footer';
import {useRef, useEffect} from 'react';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import styles from './Header.module.css';

export function Header() {
    window.addEventListener('load', () => {

    const stars = document.getElementById('stars');
    const moon = document.getElementById('moon');
    const mountainsB = document.getElementById('mountainsB');
    const text = document.getElementById('text');
    const btn = document.getElementById('btn');
    const mountainsF = document.getElementById('mountainsF');
    const header = document.querySelector('header');

    
    
    window.addEventListener('scroll', () => {
        const value = window.scrollY;

        stars.style.left = value * 0.05 + 'rem';
        moon.style.top = value * 0.04 + 'rem';
        mountainsB.style.top = value * 0.05 + 'rem';
        mountainsF.style.top = value * 0 + 'rem';
        text.style.marginRight = value * 0.15 + 'rem';
        text.style.rotate = value * 0.01 + 'deg';
        text.style.marginTop = value * 0.02 + 'rem';
        btn.style.marginTop = value * 0.06 + 'rem';
        header.style.top = value * 0.05 + 'rem';

    })

});
  
    return (
        <div>
        <header className={styles.header}>
            <a href="#logo" className={styles.logo} id="logo">Logo</a>

            <ul>
                <li><a href="#" className={styles.active}>Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Work</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </header>
        <section className={styles.section}>
            <img src="stars.png" className={styles.stars} id="stars"></img>
            <img src="moon.png" className={styles.moon} id="moon"></img>
            <img src="mountains_behind.png" className={styles.mountainsB} id="mountainsB"></img>
            <h2 className={styles.text} id="text">Mello's Home</h2>
            <a href="#sec" className={styles.btn} id="btn">Explorer</a>
            <img src="mountains_front.png" className={styles.mountainsF} id="mountainsF"></img>
        </section>
        <div className={styles.sec} id="sec" >
        <br></br>
            <h2>Scrolling Effects</h2>
            <br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo, earum totam eveniet vero 
                exercitationem autem id incidunt? Illo tenetur natus numquam reiciendis excepturi enim dolore officiis,
                quibusdam explicabo odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis
                quisquam natus dolores laborum. Earum deleniti quo itaque natus saepe, omnis quos rerum fuga repellendus
                cupiditate beatae fugit rem odio.
                <br></br><br></br>
            </p>
        </div>
        <PhotoGrid />
        <Footer />
        </div>
    );
}

