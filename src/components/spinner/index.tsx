
type SpinnerProps = {
    show: boolean;
}

const Spinner = ({show}: SpinnerProps) => {
    return (
        show &&
        <div id="backdrop">
        <div className="text-center loading">
            <div className="spinner-border" role="status">
                
            </div>
        </div>
      </div>
    )
}

export default Spinner;