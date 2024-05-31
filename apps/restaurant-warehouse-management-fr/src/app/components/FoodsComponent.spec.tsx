import { render } from '@testing-library/react';

import FoodsComponent from './FoodsComponent';

describe('FoodsComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FoodsComponent />);
    expect(baseElement).toBeTruthy();
  });
});
