import {
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  forwardRef,
  useState,
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

  const [offset, setOffset] = useState<Position>({x: 0, y: 0});

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onOpen();
    }
  };

  const handleDragStart = (e: MouseEvent) => {
    if (ref && (ref as RefObject<HTMLDivElement>).current) {
      const {x, y, width, height} = (ref as RefObject<HTMLDivElement>).current.getBoundingClientRect();
      setOffset({
        x: e.clientX - (x + width / 2),
        y: e.clientY - (y + height / 2),
      });
    }
  }

  const handleDragEnd = (e: MouseEvent) => {
    onDragEnd(id, {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  return (
    <div
      className={styles.card}
      draggable="true"
      onClick={onOpen}
      onDragStart={handleDragStart}
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
