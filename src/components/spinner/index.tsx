import { Backdrop } from "../modal";

type SpinnerProps = {
    show: boolean;
}

const Spinner = ({ show }: SpinnerProps) => {
    return (
        show &&
        <Backdrop onClick={() => null}>
            <div className="text-center loading">
                <div className="spinner-border text-indigo-300" role="status">
                </div>
            </div>
        </Backdrop>
    )
}

export default Spinner;