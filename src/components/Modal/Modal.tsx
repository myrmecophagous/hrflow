import Image from 'next/image';
import { useCallback, useEffect, useRef, KeyboardEvent } from 'react';

import styles from './Modal.module.scss';
import type { Job } from '@/components/JobList/JobList';
import { useClickOutside } from '@/hooks/useClickOutside';
import { dateToHumanReadable } from '@/utils/utils';


interface ModalProps {
  job: Job;
  onClose: () => void;
};

const CLOSE_IMAGE_SIZE = 20;

export default function Modal({job, onClose}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
    return document.removeEventListener('keyup', (e) => handleKeyUp(e as unknown as KeyboardEvent));
  }, [handleKeyUp]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={ref}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <Image
            alt=""
            height={CLOSE_IMAGE_SIZE}
            role="presentation"
            src="/images/icons/close.svg"
            width={CLOSE_IMAGE_SIZE}
          />
        </button>
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
    </div>
  );
}
