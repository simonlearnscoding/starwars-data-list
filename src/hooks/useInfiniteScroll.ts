import { useEffect, RefObject } from 'react';
interface UseInfiniteScrollOptions extends IntersectionObserverInit {}

/***
 This is a custom hook I wrote that will trigger a callback function
  when the element is scrolled into view.

  I wrote this hook because I wanted to implement infinite scrolling
  so that when the user scrolls to the bottom of the page,
  more data is fetched and displayed.
 ***/

const useInfiniteScroll = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  options: UseInfiniteScrollOptions = { threshold: 0.1 },
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, callback, options]);
};

export default useInfiniteScroll;
