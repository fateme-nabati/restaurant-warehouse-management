import { render } from '@testing-library/react';

import DateInfoComponent from './DateInfoComponent';

describe('DateInfoComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateInfoComponent />);
    expect(baseElement).toBeTruthy();
  });
});
