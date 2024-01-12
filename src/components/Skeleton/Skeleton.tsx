import styles from './Skeleton.module.css';


interface SkeletonProps {
  length?: number;
};

export default function Skeleton({length = 10}: SkeletonProps) {
  return (
    <>
      <div className={styles.toolBarSkeleton}></div>
      <div className={styles.jobListSkeleton}>
        {
          Array.from({ length: length }).map((_, i) => (<div className={styles.card} key={i}></div>))
        }
      </div>
      <div className={styles.paginationSkeleton}></div>
    </>
  );
}
