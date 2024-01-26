import { dateToHumanReadable, getDistance, getPaginationList } from './utils';


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

  describe('getPaginationList', () => {
    const configs = [
      {current: 1, span: 2, length: 5, expected: [1, 2, 3, 4, 5]},
      {current: 1, span: 2, length: 10, expected: [1, 2, 3, 4, 5]},
      {current: 2, span: 2, length: 10, expected: [1, 2, 3, 4, 5]},
      {current: 5, span: 2, length: 10, expected: [3, 4, 5, 6, 7]},
      {current: 5, span: 3, length: 10, expected: [2, 3, 4, 5, 6, 7, 8]},
      {current: 10, span: 2, length: 10, expected: [6, 7, 8, 9, 10]},
    ];
    configs.forEach(({ current, span, length, expected }) => {
      const result = getPaginationList(current, length, span);
      expect(result).toEqual(expected);
    });
  });
});
