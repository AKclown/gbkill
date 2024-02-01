import { useEffect, useState } from 'react';
import { useStdout } from 'ink';

// ink-use-stdout-dimensions
function useStdoutDimensions(): [number, number] {
  const { stdout } = useStdout();
  const [dimensions, setDimensions] = useState<[number, number]>([
    stdout.rows,
    stdout.columns,
  ]);

  useEffect(() => {
    const handler = () => setDimensions([stdout.rows, stdout.columns]);
    stdout.on('resize', handler);
    return () => {
      stdout.off('resize', handler);
    };
  }, [stdout]);

  return dimensions;
}

export default useStdoutDimensions;
