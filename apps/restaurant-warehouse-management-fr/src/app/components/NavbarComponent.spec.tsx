import { render } from '@testing-library/react';

import NavbarComponent from './NavbarComponent';

describe('NavbarComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavbarComponent />);
    expect(baseElement).toBeTruthy();
  });
});
