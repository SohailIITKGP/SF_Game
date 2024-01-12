import "../../styles/DashboardModal.css";
import CloseIcon from "@mui/icons-material/Close";

const DashBoardModal = (props) => {
    const notCloseModal = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div
                className="dashboard-modal"
                onClick={props.modalToggleFunction}
            >
                <div className="dashboard-modal-box" onClick={notCloseModal}>
                    <CloseIcon
                        className="dashboard-modal-box__close"
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={props.modalToggleFunction}
                    />
                    <div className="dashboard-modal-box__content">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoardModal;
