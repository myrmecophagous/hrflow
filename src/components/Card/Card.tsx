import {
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
} from 'react';

import styles from './Card.module.css';
import { Job } from '@/components/JobList/JobList';
import { dateToHumanReadable } from '@/utils/utils';


export interface Position {
  x: number;
  y: number;
};

interface CardProps extends Job {
  onDragEnd: (id: number, pos: Position) => void;
  onOpen: () => void;
};

const Card = forwardRef(function Card({
  created_at,
  id,
  name,
  onDragEnd,
  onOpen,
}: CardProps, ref: ForwardedRef<HTMLDivElement>) {

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onOpen();
    }
  };

  const handleDragEnd = (e: MouseEvent) => {
    onDragEnd(id, {
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className={styles.card}
      draggable="true"
      onClick={onOpen}
      onDragEnd={handleDragEnd}
      onKeyUp={handleKeyUp}
      ref={ref}
      role='document'
      tabIndex={0}
    >
      <h1 className={styles.header}>{name}</h1>
      <div className={styles.date}>{dateToHumanReadable(created_at)}</div>
    </div>
  );
});


export default Card;
