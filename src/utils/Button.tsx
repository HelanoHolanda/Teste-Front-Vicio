import { Button } from "@/components/ui/button";

interface ButtonProps {
  value: string;
  onClick?: () => void;
}

export const ButtonUtils = ({ value, onClick }: ButtonProps) => {
  return (
    <div>
      <Button
        onClick={onClick}
        className="bg-white hover:bg-purple-200 text-black rounded p-2"
      >
        {value}
      </Button>
    </div>
  );
};
