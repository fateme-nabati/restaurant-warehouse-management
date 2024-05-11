import { render } from '@testing-library/react';

import WarehouseComponent from './WarehouseComponent';

describe('WarehouseComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WarehouseComponent />);
    expect(baseElement).toBeTruthy();
  });
});
