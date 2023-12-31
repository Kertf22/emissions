interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = ({children,...props}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`py-2 px-3 bg-gray-800 text-white text-sm font-semibold rounded-md shadow focus:outline-none hover:bg-gray-600 ${props.className} flex justify-center items-center `}
    >
      {children}
    </button>
  );
};
