import { render } from '@testing-library/react';

import ReportComponent from './ReportComponent';

describe('ReportComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReportComponent />);
    expect(baseElement).toBeTruthy();
  });
});
