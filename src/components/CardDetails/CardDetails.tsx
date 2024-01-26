import styles from './CardDetails.module.scss';
import type { Job } from '@/components/JobList/JobList';
import { dateToHumanReadable } from '@/utils/utils';


export default function CardDetails({job}: {job: Job}) {
  return (
    <div className={styles.details}>
      <h1>{job.name}</h1>
      <div className={styles.tags}>
        {
          job.tags && job.tags.map((tag) => (<div className={styles.tag} key={tag.name}>
              {tag.name}: {tag.value}
            </div>))
        }
      </div>
      <div>Job posted: {dateToHumanReadable(job.created_at)}</div>
      {
        job.location && <div>Location: {job.location?.text}</div>
      }

      <div>
        <h2 className={styles.h2}>Summary</h2>
        <div>{job.summary}</div>
      </div>

      {
        job.sections && job.sections.length > 0 && (<>{
          job.sections.map((section, index) => (
            <div key={index}>
              {
                section.name && <h2 className={styles.h2}>{section.name}</h2>
              }
              <div>{section.description}</div>
            </div>
          ))
        }</>)
      }

      {
        job.skills && job.skills.length > 0 && (<>
          <h2 className={styles.h2}>Skills</h2>
          <ul>
            {
              job.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))
            }
          </ul>
        </>)
      }
      {
        job.tasks && job.tasks.length > 0 && (<>
          <h2 className={styles.h2}>Tasks</h2>
          <ul>
            {
              job.tasks.map((task, index) => (
                <li key={index}>{task.name}</li>
              ))
            }
          </ul>
        </>)
      }
      {
        job.languages && job.languages.length > 0 && (<>
          <h2 className={styles.h2}>Languages</h2>
          <ul>
            {
              job.languages.map((language, index) => (
                <li key={index}>{language.name}</li>
              ))
            }
          </ul>
        </>)
      }
    </div>
  );
}
