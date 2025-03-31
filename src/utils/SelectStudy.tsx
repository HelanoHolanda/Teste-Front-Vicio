"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
  value?: string;
}

export function SelectStudy({ options, label, onChange, value }: SelectProps) {
  const handleValueChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-14">
      <label className="block mb-2 text-sm font-semibold text-white">
        {label}
      </label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full border p-2 rounded bg-white focus:outline-none text-left">
          <span className="truncate">
            <SelectValue placeholder="Selecione uma opção" />
          </span>
        </SelectTrigger>

        <SelectContent
          className="bg-white z-50"
          position="popper"
          style={{ position: "absolute", zIndex: 50 }}
        >
          <SelectGroup>
            <SelectLabel>Opções</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
