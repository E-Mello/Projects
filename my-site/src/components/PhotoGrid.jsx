import styles from './PhotoGrid.module.css';
import { useState } from 'react';

export function PhotoGrid() {
    
    const stopMovie = (e) => {
    e.target.pause();
    // console.log('off');
  }
  
  const playMovie = (e) => {
    e.target.play();
    // console.log('on');
  }

    return (
        <section className={styles.section02}>

        <div className={styles.photoGridHeader}>
            <h1 className={styles.photoGridH1}>Other Project</h1>
            <p className={styles.photoGridP}>Examples</p>
        </div>

        {/* Photo Grid */}
            <div className={styles.photoGrid}>
                <div className={styles.photoGridList}>
                    <div className={styles.photoGridItem}>
                        <video poster="../public/love-heart-dark.jpg" src="../public/Darling.mp4" onMouseOver={playMovie} onMouseOut={stopMovie} preload='none' loop/>
                        <video poster="../public/love-heart-dark.jpg" src="../public/Darling.mp4" onMouseOver={playMovie} onMouseOut={stopMovie} preload='none' loop/>
                    </div>
                    <div className={styles.photoGridItem}>
                        <video poster="../public/love-heart-dark.jpg" src="../public/Darling.mp4" onMouseOver={playMovie} onMouseOut={stopMovie} preload='none' loop/>
                        <video poster="../public/love-heart-dark.jpg" src="../public/Darling.mp4" onMouseOver={playMovie} onMouseOut={stopMovie} preload='none' loop/>
                    </div>
                </div>        
            </div>
    </section>
    );
}