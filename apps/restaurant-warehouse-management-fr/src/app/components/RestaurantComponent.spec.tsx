import { render } from '@testing-library/react';

import RestaurantComponent from './RestaurantComponent';

describe('RestaurantComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RestaurantComponent />);
    expect(baseElement).toBeTruthy();
  });
});
