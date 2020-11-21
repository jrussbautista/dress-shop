import styles from './CartSkeleton.module.css';

const CartSkeleton: React.FC = () => {
  return (
    <>
      <div className={styles.skeletonContainer}>
        <div className={styles.pageHeading}></div>
        {[...Array(3)].map((_, i) => (
          <div className="container" key={i}>
            <div style={{ display: 'flex', width: '20rem' }}>
              <div className={styles.box}></div>
            </div>
            <div className={styles.right}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        ))}
        <div className={styles.bottom}>
          <div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSkeleton;
