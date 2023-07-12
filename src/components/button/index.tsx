interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button = ({children,...props}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none hover:bg-indigo-700 ${props.className} `}
    >
      {children}
    </button>
  );
};
