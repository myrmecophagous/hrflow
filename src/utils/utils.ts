import { Position } from '@/components/Card/Card';


const dateToHumanReadable = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const getDistance = (left: Position, right: Position) => {
  const x = right.x - left.x;
  const y = right.y - left.y;
  return Math.sqrt(x * x + y * y);
};

const getPaginationList = (current: number, length: number, span: number): number[] => {
  let start = current > length - span - 1 ? -(span * 2 + 1) : current - span - 1;
  if (start < 0 && current <= span + 1) {
    start = 0;
  }
  const end = current <= span + 1 ? (span * 2 + 1) : current + span;
  return Array.from({ length: length }, (_, i) => i + 1).slice(start, end);
};

export {
  dateToHumanReadable,
  getDistance,
  getPaginationList,
};
