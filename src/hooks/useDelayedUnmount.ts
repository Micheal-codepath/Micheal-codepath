import { useState, useEffect } from 'react';

/**
 * Keep a closing overlay mounted long enough for its exit transition.
 * Returns whether to render at all, and whether it should look "open".
 */
export function useDelayedUnmount(open: boolean, delay = 250) {
  const [render, setRender] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
    setVisible(false);
    const t = setTimeout(() => setRender(false), delay);
    return () => clearTimeout(t);
  }, [open, delay]);

  return { shouldRender: render, visible };
}
