import '../styles/Dashboard.css';
import { useState, useContext } from 'react';
import Modal from '../components/Dashboard/DashBoardModal';
import DProfile from '../components/Dashboard/DashboardProfile';
import Event from '../components/Dashboard/DashboardEvents';
import DComplain from '../components/Dashboard/DashboardComplain';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import createToast from '../utils/createToast';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PaymentIndividual from '../components/PaymentIndividual/PaymentIndividual';


export default function DTesting() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const { user, setUser, setSignupdata, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const modalHandler = (content) => {
        if (content === 'profile' || content === 'events' || content === 'complain')
            setModalContent(content)
        setIsModalOpen(!isModalOpen)
    }

    const showSocial = () => {
        const cardSocial = document.getElementById('card-social');

        if (cardSocial.classList.contains('dashboard-animation')) {
            cardSocial.classList.add('dashboard-down-animation');

            setTimeout(() => {
                cardSocial.classList.remove('dashboard-down-animation');
            }, 1000);
        }

        cardSocial.classList.toggle('dashboard-animation');
    }


    const logOut = async () => {

        localStorage.removeItem("userData");

        setIsLoggedIn(false);
        setSignupdata([]);
        setUser([]);

        createToast("Logged Out Successfully", "success");
    }

    return (
        <>
            <div className="dashboard-body-container">
                {isLoggedIn ? (
                    <div className="dashboard-container">
                        <Link to="/" className="back-button">
                            {/* <img src={back} alt="back" /> */}
                            <ChevronLeftIcon style={{
                                fontSize: '3rem',
                                color: '#fff',
                                cursor: 'pointer'

                            }} />
                        </Link>
                        <div className="dashboard-card">
                            <div className="dashboard-card__border">
                                {user.gender === 'M' ? (
                                    <img src="./images/ProfileMalePhoto.jpg" alt="profile" className="dashboard-card__img" />
                                ) : (
                                    <img src="./images/ProfileFemalePhoto.jpg" alt="profile" className="dashboard-card__img" />
                                )}
                            </div>

                            <h3 className="dashboard-card__name">{user && user.name ? user.name.toUpperCase() : "No Name"}</h3>
                            <h3 className="dashboard-card__profession">{user.sf_id.toUpperCase()}</h3>

                            <div className="dashboard-card__social" id="card-social"onClick={() => showSocial()}>
                                <div className="dashboard-card__social-control">

                                    <div className="dashboard-card__social-toggle" id="card-toggle" >
                                        <PlusCircleFill />
                                    </div>

                                    <span className="dashboard-card__social-text">Dashboard</span>

                                    <ul className="dashboard-card__social-list">
                                        <li target="_blank" className="dashboard-card__social-link" onClick={() => modalHandler('profile')}>
                                            <img src="./images/Profile.png" alt="profile icon" />
                                        </li>

                                        <li target="_blank" className="dashboard-card__social-link" onClick={() => modalHandler('events')}>
                                            <img src="./images/RegisteredEvents.png" alt="profile icon" />
                                        </li>
                                        <li target="_blank" className="dashboard-card__social-link" onClick={() => modalHandler('complain')}>
                                            <img src="./images/ReportIssueIcon.png" alt="profile icon" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='dashboard-lower-links'>
                            <Link 
                             to="/dashboard/payment" 
                             className="dashboard-pay-button">
                                 {user && !user.payment_status ? "Pay Now" : "Paid"}
                            </Link>
                            <Link to="/" className="dashboard-logout-button" onClick={logOut} >
                                Log Out
                            </Link>
                        </div>
                    </div>
                ) :
                    // Redirecting to Landing Page
                    window.location.href = "/"
                }
            </div>
            {isModalOpen && (
                <>
                    <Modal modalToggleFunction={modalHandler}>
                        {modalContent === 'profile' && <DProfile />}
                        {modalContent === 'events' && <Event />}
                        {modalContent === 'complain' && <DComplain />}
                        {modalContent === 'payment' && <PaymentIndividual /> }
                    </Modal>
                </>
            )}
        </>
    )
}