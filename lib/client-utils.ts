import { useState, useEffect } from "react";

export const useDebouncedInput = (initialValue = "", delay = 400) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return [value, debouncedValue, handleChange];
};
