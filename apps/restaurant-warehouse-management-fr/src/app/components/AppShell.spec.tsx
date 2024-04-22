import { render } from '@testing-library/react';

import {AppShellComponent} from './AppShell';

describe('AppShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppShellComponent />);
    expect(baseElement).toBeTruthy();
  });
});
