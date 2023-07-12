
interface CardProps {
    size?: 'small' | 'medium' | 'large';
    children?: React.ReactNode;
    className?: string;
}

export const Card = ({size,children,className}:CardProps) => {

    const sizeClass = size === 'small' ? 'w-1/4' : size === 'medium' ? 'w-1/2' : 'w-full';

    return (
        <div className={`${sizeClass} bg-white min-h-[320px] w-full min-[800px]:w-[320px] h-full border-color-100 border-1 px-6 py-4 rounded-xl flex flex-col gap-2 justify-between ${className}`}>
            {children}
        </div>
    )
}