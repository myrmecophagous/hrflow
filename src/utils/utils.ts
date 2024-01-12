import { Position } from '@/components/Card/Card';


const getDistance = (left: Position, right: Position) => {
  const x = right.x - left.x;
  const y = right.y - left.y;
  return Math.sqrt(x * x + y * y);
};

const dateToHumanReadable = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export {
  dateToHumanReadable,
  getDistance,
};
