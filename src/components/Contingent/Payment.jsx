import axios from "axios";
import createToast from "../../utils/createToast";

export default async function Payment(paymentDetails) {
  const payment_url = "https://acco.springfest.in/api/payment/initiate";
   
  if(new Date(paymentDetails.check_in)===""){
    createToast("Enter Check In Date","error");
    return;

  }
  if(new Date(paymentDetails.check_out)===""){
    createToast("Enter Check out Date","error");
    return;

  }

  if(!paymentDetails.check_in){
    createToast("Enter Check In Date","error");
    return;
  }

  if(!paymentDetails.check_out){
    createToast("Enter Check out Date","error");
    return;
  }
  

  if (new Date(paymentDetails.check_out) < new Date(paymentDetails.check_in)) {
    createToast("Check-out date must be greater than or equal to check-in date", "error");
    return;
  }

  
  if (
    paymentDetails.emergency_number.length === 0 ||
    !(paymentDetails.emergency_number.length === 10 ||
      paymentDetails.emergency_number.length === 11 ||
      paymentDetails.emergency_number.length === 12)
  ) {
    createToast("Invalid Number", "error");
    return;
  }
  

  if(!paymentDetails.type_of_acco){
    createToast("Enter the Accomodation Type","error")
    return;
  }

  try {
    const paymentResponse = await axios.post(payment_url, paymentDetails);

    console.log(paymentResponse);

    if (paymentResponse.data.code === 0) {
      if (paymentResponse.data.data.redirectUrl) {
        window.open(paymentResponse.data.data.redirectUrl, "_blank");
      } else {
        createToast("Payment initiation failed", "error");
      }
    }

    else if (paymentResponse.data.code === 3) {

      createToast(paymentResponse.data.message, "error");
    }

    else {
      // createToast(paymentResponse.message, "warning");
      createToast("Payment initiation failed", "error")
    }
  } catch (error) {

    createToast("Please Log in Again", "error")
  }
}
