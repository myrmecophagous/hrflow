import {
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  forwardRef,
  useRef,
  useState,
} from 'react';

import styles from './Card.module.css';
import { Job } from '@/components/JobList/JobList';
import { dateToHumanReadable } from '@/utils/utils';


const DELAY = 100; // ms

export interface Position {
  x: number;
  y: number;
};

interface CardProps extends Job {
  hover: boolean;
  onDragEnd: (id: number, pos: Position) => void;
  onDragOver: (id: number, pos: Position) => void;
  onDragStart: (id: number) => void;
  onOpen: () => void;
};

const Card = forwardRef(function Card({
  created_at,
  hover,
  id,
  name,
  onDragEnd,
  onDragOver,
  onDragStart,
  onOpen,
}: CardProps, ref: ForwardedRef<HTMLDivElement>) {

  const [offset, setOffset] = useState<Position>({x: 0, y: 0});
  const debounceId = useRef<number>(NaN);

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
      onDragStart(id);
    }
  }

  const handleDragEnd = (e: MouseEvent) => {
    onDragEnd(id, {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (debounceId.current) {
      return;
    }
    debounceId.current = window.setTimeout(() => {
      onDragOver(id, {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
      clearTimeout(debounceId.current);
      debounceId.current = NaN;
    }, DELAY);
  }

  return (
    <div
      className={styles.card}
      draggable="true"
      onClick={onOpen}
      onDragEnd={handleDragEnd}
      onDragOver={handleMouseMove}
      onDragStart={handleDragStart}
      onKeyUp={handleKeyUp}
      ref={ref}
      role='document'
      tabIndex={0}
    >
      <div className={styles.insertMarker} style={{opacity: hover ? 1 : 0}} />
      <h1 className={styles.header}>{name}</h1>
      <div className={styles.date}>{dateToHumanReadable(created_at)}</div>
    </div>
  );
});


export default Card;
