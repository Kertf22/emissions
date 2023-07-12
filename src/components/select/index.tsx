interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  label?: string;
}

export const Select = ({ label, children, ...props }: SelectProps) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 ">
          {label}
        </label>
      )}
      <select
        {...props}
        className="bg-gray-50 border min-w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {children}
      </select>
    </div>
  );
};
