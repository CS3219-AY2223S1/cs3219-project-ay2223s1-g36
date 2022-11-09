import { useState } from 'react';

// Forces a component to rerender
export default function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}
