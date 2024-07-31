import React from 'react';
import Exit from '../../src/ui/Exit';
import { render } from 'ink-testing-library';

describe('Exit.tsx component', () => {
  test('is delicious', () => {
    const { lastFrame, rerender } = render(<Exit code={1} />);
    expect(lastFrame()).toEqual('🤡 Thanks for using GBkill! 🤡');
    rerender(<Exit code={0} />);
    expect(lastFrame()).toEqual('🤡 Thanks for using GBkill! 🤡');
  });
});
