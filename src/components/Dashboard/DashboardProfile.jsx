import { useContext } from "react";
import {UserContext} from "../../context/userContext";

export default function DProfile() {

    const { user } = useContext(UserContext);
    return (
        <>
            <div className="dashboard-modal-box__content-heading">
                <h3>PROFILE</h3>
            </div>
            <div className="dashboard-modal-box__content__items" id="dashboard-profile-modal">
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        NAME
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.name}
                    </div>
                </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        EMAIL
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.email}
                    </div>
                    </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        MOBILE
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.mobile}
                    </div>
                </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        SF-ID
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.sf_id}
                    </div>
                </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        CITY
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.city}
                    </div>
                </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        COLLEGE
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.college}
                    </div>
                </div>
                <div className="dashboard-modal-box__content__items-list-item">
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        PAYMENT STATUS
                    </div>
                    <div className="dashboard-modal-box__content__items-list-item__name">
                        {user.payment_status? "Paid" : "Not Paid"}
                    </div>
                </div>
            </div>
        </>
    )
}