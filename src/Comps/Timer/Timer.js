// Assets
import styles from "./Timer.module.css";

export default ({ seconds, running, stop, start }) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["value-container"]}>
        <p>{seconds} s</p>
      </div>
      <div className={styles["button-container"]}>
        <button onClick={() => (running ? stop() : start())}>
          {running ? "Stop!" : "Start!"}
        </button>
      </div>
    </div>
  );
};
