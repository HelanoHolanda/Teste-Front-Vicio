import { Button } from "@/components/ui/button";

interface ButtonProps {
  value: string;
  onClick?: () => void;
}

export const ButtonUtils = ({ value, onClick }: ButtonProps) => {
  return (
    <div>
      <Button onClick={onClick} className="bg-gray-700 rounded p-2">
        {value}
      </Button>
    </div>
  );
};
