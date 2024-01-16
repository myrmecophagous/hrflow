import { fireEvent, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './Card';


const onOpenMock = jest.fn();
const onDragStartMock = jest.fn();
const onDragEndMock = jest.fn();
const onDragOverMock = jest.fn();

const cardProps = {
  name: 'test',
  id: 1,
  created_at: '',
  hover: false,
  onDragEnd: onDragEndMock,
  onDragOver: onDragOverMock,
  onDragStart: onDragStartMock,
  onOpen: onOpenMock,
};

afterEach(cleanup);

describe('Card', () => {
  it('should open modal when clicked', () => {
    const card = render(<Card {...cardProps} />);
    fireEvent.click(card.baseElement.querySelector('article')!);
    expect(onOpenMock).toHaveBeenCalled();
  });

  it('should open modal on Enter press', () => {
    const card = render(<Card {...cardProps} />);
    const article = card.baseElement.querySelector('article')!;
    fireEvent.keyUp(article, { key: 'Enter' });
    expect(onOpenMock).toHaveBeenCalled();
  });

  xit('should fire drag events on mouse down / move / up', () => {
    const card = render(<div className="container"><Card {...cardProps} /></div>);
    console.log(card)
    const article = card.baseElement.querySelector('article')!;
    fireEvent.mouseDown(article, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(article, {clientX: 50, clientY: 100});
    fireEvent.mouseUp(article);
    expect(onDragStartMock).toHaveBeenCalled();
    expect(onDragEndMock).toHaveBeenCalled();
    expect(onDragOverMock).toHaveBeenCalled();
  });
});
