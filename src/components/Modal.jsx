import '../styles/modal.css';

const Modal = (props) => {

    const notCloseModal = (e) => {
        e.stopPropagation();
    }

    return (
        <>
            <div className="dashboard-modal" onClick={props.modalToggleFunction}>
                <div className="dashboard-modal-box" onClick={notCloseModal}>
                    <div className="dashboard-modal-box__close" onClick={props.modalToggleFunction}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                    </div>
                    <div className="dashboard-modal-box__content">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;