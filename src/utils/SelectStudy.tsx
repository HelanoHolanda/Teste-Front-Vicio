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
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full border p-2 rounded bg-purple-200 focus:outline-none">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent className="bg-purple-200">
          <SelectGroup className="bg-purple-200">
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
