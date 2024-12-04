import styles from "./TimeCounterView.module.scss";

function TimeCounterView({ seconds }: { seconds: number | null }) {
    return (
        <div className={styles.wrapper}>
            <p>Time until next update: {seconds ? seconds : 0}</p>
        </div>
    );
}

export { TimeCounterView };
