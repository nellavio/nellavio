import { ProductParameterProps } from "../types";

export const ProductParameter = ({ title, value }: ProductParameterProps) => {
  return (
    <div className="flex flex-col pb-0 gap-2 h-18 md:h-16 1xl:h-18">
      <span className="text-xs lg:text-sm 2xl:text-sm text-secondaryText">
        {title}
      </span>
      <span className="text-xs lg:text-sm 2xl:text-base overflow-hidden">
        {value}
      </span>
    </div>
  );
};
