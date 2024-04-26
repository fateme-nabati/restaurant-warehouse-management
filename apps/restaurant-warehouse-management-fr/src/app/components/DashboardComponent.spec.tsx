import { render } from '@testing-library/react';

import DashboardComponent from './DashboardComponent';

describe('DashboardComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardComponent />);
    expect(baseElement).toBeTruthy();
  });
});
