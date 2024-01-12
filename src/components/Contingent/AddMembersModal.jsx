import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import CloseIcon from "@mui/icons-material/Close";
import createToast from "../../utils/createToast";
import axios from "axios";

const AddMembersModal = ({
  open,
  onClose,
  contingentmembers,
  setContingentmembers,
  setIsAddMembersModalOpen,
}) => {
  const { user } = useContext(UserContext);
  const [chosenNumberOfParticipants, setChosenNumberOfParticipants] = useState(1);
  const [newMemberId, setNewMemberId] = useState([])
  const [newMemberEmail,setNewMemberEmail]=useState([])


  const numberOfParticipantsArray = [];
  for (let i = 1; i <= 100; i++) numberOfParticipantsArray.push(i);

  const handleNewMemberIdChange = (index, value) => {
    setNewMemberId((prevIds) => {
      const updatedIds = [...prevIds];

      if (updatedIds.length === index) {
        updatedIds.push(value);
      } else {
        updatedIds[index] = value;
      }

      return updatedIds;
    });
  };

  const handleNewMemberEmailChange = (index, value) => {
    setNewMemberEmail((prevIds) => {
      const updatedIds = [...prevIds];

      if (updatedIds.length === index) {
        updatedIds.push(value);
      } else {
        updatedIds[index] = value;
      }

      return updatedIds;
    });
  };


  const handleAddMembers = async (e) => {
    e.preventDefault();

    if (contingentmembers.length === 0 || contingentmembers.every(id => !id)) {
      createToast("Please enter at least one member ID", "warning");
      return;
    }

    const addmemberobject = {
      token: user.token,
      members: newMemberId.map((id,index) => {
        let tempId = {
          sfId: id,
          email:newMemberEmail[index]
        };
        return tempId;
      }),
    };

    console.log(addmemberobject);
    try {
      const response = await axios.post(
        "https://acco.springfest.in/api/contingent/add",
        addmemberobject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }

      );

      console.log(response.data);

      if (response.data.code === 0) {
        createToast(response.data.message, "success");
        console.log(response.data);
        setIsAddMembersModalOpen(false)
        onClose();
        setContingentmembers([...newMemberId]);
      }else if(response.data.code===4){
        createToast(response.data.message,"warning");
      }else if(response.data.code===3){
        createToast(response.data.message,"warning");
      }
       else {
        createToast("Enter valid SF Ids", "warning");
      }
    } catch (err) {
      createToast("Adding Members Failed", "warning");
      console.log(err);
    }
  };



  return (
    open && (

      <div className="add-members-modal-content">
        <CloseIcon className="add-members-modal-close-icon" style={{
          position: "absolute",
          top: "1rem",
          right: "1rem"
        }}  onClick={
          () => {
            setIsAddMembersModalOpen(false)
            onClose()
          }
        } />

        <h2 className="add-members-modal-title">Add Members</h2>

        <div className="add-members-modal-inputs">
          <div className="add-members-note" >
            Enter the SF IDs of the Members
          </div>
          <select
            name="Number of Members"
            className="choose-number-of-members"

            onChange={(e) => {
              setChosenNumberOfParticipants(parseInt(e.target.value));
            }}
          >
            {numberOfParticipantsArray.map((numberOfParticipant, index) => (
              <option key={index} value={numberOfParticipant}>
                {numberOfParticipant}
              </option>
            ))}
          </select>
          {[...Array(chosenNumberOfParticipants)].map((_, index) => (
            <div className="add-member-register-modal-input" key={index}>
              <input
                type="text"
                className="add-member-register-modal-input-field"

                placeholder={`Member ${index + 1} SF ID`
                }
                value={newMemberId[index] || ""}
                onChange={(e) =>
                  handleNewMemberIdChange(index, e.target.value)
                }
              />
              <input
                type="email"
                className="add-member-register-modal-input-field"

                placeholder={`Member ${index + 1} Email ID`
                }
                value={newMemberEmail[index] || ""}
                onChange={(e) =>
                  handleNewMemberEmailChange(index, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <button
          className="add-members-modal-add-button"
          onClick={(e) => handleAddMembers(e)}
        >
          Add Members
        </button>
      </div>
    )
  );
};

export default AddMembersModal;
