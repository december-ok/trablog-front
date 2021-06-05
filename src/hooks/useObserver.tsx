import { useRef } from "react";

export default function useObserver(onWork: Function) {
  const targetElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const onEnd = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        onWork();
      }
    });
  };

  const setObserver = () => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(onEnd);
    }
    targetElement.current && observer.current?.observe(targetElement.current);
  };
  const unsetObserver = () => {
    targetElement.current && observer.current?.unobserve(targetElement.current);
  };

  return [targetElement, setObserver, unsetObserver] as [
    typeof targetElement,
    typeof setObserver,
    typeof unsetObserver
  ];
}
