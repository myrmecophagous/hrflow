import JobList from '@/components/JobList/JobList';
import { Job } from '@/components/JobList/JobList';
import { getJobs, getCatogories } from '@/app/actions';


export default async function Wrapper() {

  const jobs: Job[] = await getJobs();
  const categories: string[] = await getCatogories();

  return (
    <JobList jobs={jobs} categories={categories} />
  );
}
