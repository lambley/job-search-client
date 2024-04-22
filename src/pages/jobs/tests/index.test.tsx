import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Jobs from '../index';
import * as api from '@lib/api';
import { emptyJobsResponse } from "@lib/emptyResponses";

describe('Jobs component', () => {
  it('renders without crashing', () => {
    render(<Jobs jobs={[]} />);
    expect(screen.getByText('Jobs Page')).toBeInTheDocument();
  });

  // TODO need to fix how jobs are mocked
  // it('displays recent jobs correctly', async () => {
  //   const mockRecentJobs = jest.fn().mockResolvedValue([emptyJobsResponse]);

  //   jest.spyOn(api, 'recentJobs').mockImplementation(mockRecentJobs);

  //   render(<Jobs jobs={mockRecentJobs} />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Job 1')).toBeInTheDocument();
  //     expect(screen.getByText('Job 2')).toBeInTheDocument();
  //     expect(screen.getByText('Job 3')).toBeInTheDocument();
  //   });
  // });

  it('refreshes jobs when button is clicked', async () => {
    const mockRefreshJobs = jest.fn().mockResolvedValue({});

    jest.spyOn(api, 'refreshJobs').mockImplementation(mockRefreshJobs);

    render(<Jobs jobs={[]} />);

    fireEvent.click(screen.getByText('Refresh Jobs'));

    await waitFor(() => {
      expect(mockRefreshJobs).toHaveBeenCalled();
    });
  });
});
