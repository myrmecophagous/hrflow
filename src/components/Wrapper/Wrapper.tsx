import JobList from '@/components/JobList/JobList';
import { getJobs, getCatogories } from '@/app/actions';

import styles from './Wrapper.module.scss';


export default async function Wrapper() {

  const jobs = await getJobs();
  const categories: string[] = await getCatogories();

  return (
    <div className={styles.wrapper}>
      <JobList jobs={jobs} categories={categories} />
    </div>
  );
}
