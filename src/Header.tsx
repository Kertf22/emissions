import { RxAvatar } from "react-icons/rx"
import { Button } from "./components/button"
import useGlobalStore from "./infra/store"
import { User } from "./App";

const UserInfo = ({ user, logOut }: { user: User, logOut: () => void }) => {
    if (!user) return null;


    return (<>
        <div className="flex flex-row gap-4 items-center justify-start">
            <div className="flex flex-row gap-2 p-2 px-4 bg-gray-600  rounded-xl text-white items-center justify-start  min-w-[160px]">
                <RxAvatar />
                {user.username}

            </div>
            <Button onClick={logOut} className="bg-red-700 hover:bg-red-500">Logoff</Button>
        </div>

    </>
    )
}

const Header = ({ logOut }: { logOut: () => void }) => {
    const { user, setData } = useGlobalStore();
    return (
        <div className="top-0 r-0 fixed bg-[rgb(0,0,0,0.099)] w-full z-10 flex items-center justify-end p-3 ">
            {!user && (
                <div className="flex flex-row gap-2">
                    <Button className="bg-gray-900 hover:bg-gray-700 " onClick={() => setData({ value: "", type: "login" })}>
                        Logon
                    </Button>
                    <Button className="bg-gray-400 hover:bg-gray-600 text-black" onClick={() => setData({ value: "", type: "register" })}>
                        SignUp
                    </Button>
                </div>
            )}
            <UserInfo user={user} logOut={logOut} />
        </div>
    )
}

export default Header;