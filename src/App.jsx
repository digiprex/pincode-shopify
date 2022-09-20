import './App.css';
import './css/Pincode-section.css'
import {useEffect, useState} from 'react';
import axios from "axios";
import { Modal } from "react-responsive-modal";
import PincodeSection from './Components/Pincode-section';
import "react-responsive-modal/styles.css";

const App = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [pincode,Set_pincode] = useState("");
  const [delivery_date,Set_delivery_date]=useState("");
  const [status_code,Set_status_code]= useState("");
  const [clicked,Set_clicked] = useState(false);
  const [link,Set_link] = useState("");
  const [modal_pincode,Set_modal_pincode] = useState("");
  const [modal_delivery_date,Set_modal_delivery_date]=useState("");
  const [modal_status_code,Set_modal_status_code]= useState("");
  const [modal_clicked,Set_modal_clicked] = useState(false);
  const [modal_link,Set_modal_link] = useState("");

  const closeDesktopModal = () => {
    setIsOpen(false);
    SetPincode(modal_pincode);
    SetModalPincode("");
  }

  const SetPincode = (value) => {
    Set_pincode(value)
  }

  const SetClicked = (value) => {
    Set_clicked(value)
  }

  const SetModalPincode = (value) => {
    Set_modal_pincode(value)
  }

  const SetModalClicked = (value) => {
    Set_modal_clicked(value)
  }

  const verifyPincodeDeliveribility = async (pincode) => {
    let data = JSON.stringify({
      "pincode": pincode,
      "brand": process.env.REACT_APP_BRAND
    });

    let config = {
      method: 'post',
      url: `${process.env.REACT_APP_GET_DELIVERY_DETAILS_URL}/pincode/checkPincode`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try{
      const response = await axios(config);
      Set_status_code(response.data.status);
      if(response.data.status == "200") {
        Set_delivery_date(response.data.data.available_courier_companies[0].etd)
      } else {
        Set_link(response.data.link);
      }
    } catch(error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    document.documentElement.style.setProperty(
        "--color-dark",
        process.env.REACT_APP_COLOR_DARK
    );
    document.documentElement.style.setProperty(
        "--color-lighest",
        process.env.REACT_APP_COLOR_LIGHEST
    ); 
    document.documentElement.style.setProperty(
        "--color-light",
        process.env.REACT_APP_COLOR_LIGHT
    );
  },[])


  return (
    <>
    <div className="App">
    <PincodeSection pincode={pincode} delivery_date={delivery_date} status_code={status_code} 
        clicked={clicked} link={link} SetPincode={SetPincode} SetClicked={SetClicked}
        verifyPincodeDeliveribility={() => verifyPincodeDeliveribility(pincode)} popup="false"/>
      <button className="product__submit__add" onClick={() => {
        if(!pincode){
          setIsOpen(true)
        }
        }} >
          Add to cart
      </button>
      <button id="buyNowCustomId" onClick={() => {
        if(!pincode){
          setIsOpen(true)
        }
        }}>
          Buy now
      </button>
    </div>
    <div>
    <Modal
        center
        open={modalIsOpen}
        onClose={closeDesktopModal}
        classNames={{
            modal: 'custom-modal-redeem',
        }}
      >
    
        <PincodeSection pincode={modal_pincode} delivery_date={modal_delivery_date} status_code={modal_status_code} 
        clicked={modal_clicked} link={modal_link} SetPincode={SetModalPincode} SetClicked={SetModalClicked}
        verifyPincodeDeliveribility={() => verifyPincodeDeliveribility(modal_pincode)} popup="true"/>
      </Modal>
    </div>
    </>
  );
}

export default App;
