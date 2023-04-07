import { useRef, useEffect } from 'react';

export default function useInfiniteScroll({ onLoadMore }) {
  const ref = useRef(null);

  const handleObserver = (entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      onLoadMore();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: '0.5',
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}
