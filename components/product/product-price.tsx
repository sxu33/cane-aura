import { cn } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
  const [intValue, floatValue] = value.toFixed(2).split(".");

  return (
    <p className={cn("text-xl font-sans tracking-tight", className)}>
      <span className="text-xs align-super mr-0.5 opacity-80">$</span>
      <span>{intValue}</span>
      <span className="text-[10px] opacity-80">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
