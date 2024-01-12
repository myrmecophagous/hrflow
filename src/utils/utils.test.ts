import { getDistance, dateToHumanReadable } from './utils';


describe('utils', () => {
  describe('getDistance', () => {
    it('should return the distance between two points', () => {
      const point1 = { x: 0, y: 0 };
      const point2 = { x: 3, y: 4 };
      const distance = getDistance(point1, point2);
      expect(distance).toEqual(5);
    });
  });

  describe('dateToHumanReadable', () => {
    it('should return a human readable date', () => {
      const date = '2020-01-01T00:00:00.000Z';
      const humanReadableDate = dateToHumanReadable(date);
      expect(humanReadableDate).toEqual('Jan 1, 2020');
    });
  });
});
