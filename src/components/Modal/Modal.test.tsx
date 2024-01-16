import { render, cleanup, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Modal from './Modal';
import type { Job } from '../JobList/JobList';


const job: Job = {
  created_at: '2024/01/01',
  id: 1,
  name: 'test',
};

const onCloseMock = jest.fn();

afterEach(cleanup);

describe('Modal', () => {
  it('should render', () => {
    const job: Job = {
      created_at: '2024-01-01',
      id: 1,
      languages: [{
        name: 'klingon',
      }],
      location: {
        text: 'underground',
      },
      name: 'test',
      sections: [{
        name: 'section one',
        description: null,
        title: '',
      }],
      skills: [{
        name: 'base jumping',
      }],
      summary: 'this is a summary',
      tags: [{
        name: 'category',
        value: 'AI',
      }],
      tasks: [{
        name: 'tidy everything up',
        value: null,
      }],
    }
    const modal = render(<Modal job={job} onClose={onCloseMock} />);
    expect(modal).toBeTruthy();
  });
  it('should trigger onClose when clicking on the close button', () => {
    const modal = render(<Modal job={job} onClose={onCloseMock} />);
    const closeButton = modal.getByLabelText('Close');
    closeButton.click();
    expect(onCloseMock).toHaveBeenCalled();
  });
  it('should trigger onClose when clicking outside the modal', () => {
    const container = render(<div className="container">
      <Modal job={job} onClose={onCloseMock} />
    </div>);
    fireEvent.click(container.baseElement.querySelector('.container') as Element);
    expect(onCloseMock).toHaveBeenCalled();
  });
  it('should trigger onClose when pressing the escape key', async () => {
    const modal = render(<Modal job={job} onClose={onCloseMock} />);
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    expect(onCloseMock).toHaveBeenCalled();
  });
});
