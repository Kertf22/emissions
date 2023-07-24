import { MdLockOutline } from "react-icons/md";
import useGlobalStore from "../../infra/store";

interface CardProps {
    size?: 'small' | 'medium' | 'large';
    children?: React.ReactNode;
    className?: string;
}

export const Card = ({ size, children, className  }: CardProps) => {

    const sizeClass = size === 'small' ? 'w-1/4' : size === 'medium' ? 'w-1/2' : 'w-full';

    const { user } = useGlobalStore();

    return (<>
        <div className={`${sizeClass} 
        bg-white min-h-[320px] 
         w-full min-[800px]:w-[320px]
         h-full 
         rounded-xl 
         relative
         transition
         ${className}`} >

            <div className="flex flex-col gap-2 px-6 py-4 justify-between h-full w-full">
                <div className={`flex flex-col gap-2 justify-between h-full w-full ${!user ? "opacity-60" : ""}`}>
                    {children}
                </div>
            </div>

            {!user && (
                <div className="top-0 absolute bg-[rgba(0,0,0,0.27)] h-full w-full text-white rounded-xl cursor-not-allowed z-1000">
                    <div className="flex flex-row justify-center items-center h-full w-fullt text-4xl z-100">
                        <MdLockOutline className="bg-blue" />
                    </div>
                </div>
            )}
        </div>

    </>

    )
}