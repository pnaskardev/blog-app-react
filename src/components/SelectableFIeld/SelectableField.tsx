import React, { useId } from "react";

interface SelectableFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  //   className: string;
  options: { key: string; value: string; label: string }[];
}

const SelectableField = React.forwardRef<
  HTMLSelectElement,
  SelectableFieldProps
>(({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        name=""
        id={id}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectableField;
