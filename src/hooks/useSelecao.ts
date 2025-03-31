import { useState } from "react";

export default function useSelecao(initialValue: string = "") {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    handleChange,
    setValue,
    reset,
  };
}
