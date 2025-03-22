import * as React from 'react';
import { render } from '@testing-library/react-native';
import { IconSymbol } from '../ui/IconSymbol';

describe('IconSymbol', () => {
  it('renders home icon correctly', () => {
    const { toJSON } = render(
      <IconSymbol 
        name="house.fill"
        size={24}
        color="black"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom size', () => {
    const { toJSON } = render(
      <IconSymbol 
        name="paperplane.fill"
        size={32}
        color="blue"
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom style', () => {
    const { toJSON } = render(
      <IconSymbol 
        name="chevron.right"
        color="red"
        style={{ marginLeft: 10 }}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
}); 