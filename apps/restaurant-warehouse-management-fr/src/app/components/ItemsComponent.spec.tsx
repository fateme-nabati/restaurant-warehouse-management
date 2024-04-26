import { render } from '@testing-library/react';

import ItemsComponent from './ItemsComponent';

describe('ItemsComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemsComponent />);
    expect(baseElement).toBeTruthy();
  });
});
