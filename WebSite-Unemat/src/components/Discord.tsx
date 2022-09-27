import styles from './Discord.module.css'

export function Discord() {
    return (
        <>
            <section className={styles.canais}>
                <h1 className={styles.title}>Canais do Discord para interação com professores</h1>
                <br></br>
                <div className={styles.chDiscord}>
                    <input className={styles.goDisc} type="text" value="">

                    </input>
                    <button className={styles.goDiscButton}><a href=""></a></button>
                </div>
            </section>
        </>
    );
}