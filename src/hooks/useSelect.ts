import { useState } from "react";

export function useSelect(initialValue: string = "") {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    reset,
  };
}
