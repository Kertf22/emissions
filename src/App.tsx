import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import Spinner from "./components/spinner";
import "./App.css";
import { Button } from "./components/button";
import co2 from "./assets/bg.webp"
import { MdOutlineCo2 } from "react-icons/md";
import { useUser } from "./hooks/useUser";
import { Card } from "./components/card";
import { Questions } from "./Questions";
import { Login } from "./Login";
import { Modal } from "./components/modal";
import { Register } from "./Register";
import { RxAvatar } from "react-icons/rx"
export interface User {
  id: string;
  username: string;
  // password:string;
}


const UserInfo = ({ user }: { user: User }) => {

  if (!user) return null

  return (
    <div className="fixed top-20 right-20">
      <div className="flex flex-row gap-2 bg-gray-800 p-2 rounded-lg text-white items-center justify-center min-w-[120px]">
        <RxAvatar />
        {user.username}
      </div>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(false);


  const [user, setUser] = useState<User | null>(null)
  // const [user, setUser] = useState<User | null>({
  //   id: "21",
  //   username: "Ola"
  // })
  const [modal, setModal] = useState(null);

  const handleClose = () => setModal(null);

  return (
    <>


      <img src={co2}
        style={{
          position: "fixed",
          zIndex: -1,
          opacity: 0.9,
        }}
      />
      <div

        className="w-full h-full flex flex-col items-center justify-center py-24">
        <UserInfo user={user} />

        <p className="text-3xl font-bold">
          <MdOutlineCo2 size="100" />
        </p>

        <Spinner show={loading} />

        {!user ? (
          <div className="flex flex-row gap-4">
            <Button className="bg-blue-700" onClick={() => setModal("login")}>
              Logue
            </Button>
            <Button className="bg-green-700" onClick={() => setModal("register")}>
              Se cadastre
            </Button>
          </div>
        ) : <Questions setLoading={setLoading} loading={loading} />}
      </div>
      {
        modal && (
          <Modal open={!!modal} closeModal={handleClose}>

            {modal === "login" && <Login onComplete={setUser} setLoading={setLoading} loading={loading} />}
            {modal === "register" && <Register onComplete={setUser} setLoading={setLoading} loading={loading} />}

          </Modal>)
      }


    </>
  );
}

export default App;
