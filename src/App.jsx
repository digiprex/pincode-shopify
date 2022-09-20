import './App.css';
import './css/Pincode-section.css'
import {useEffect, useState} from 'react';
import axios from "axios";
import { Modal } from "react-responsive-modal";
import PincodeSection from './Components/Pincode-section';
import "react-responsive-modal/styles.css";

const App = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [pincode,Set_pincode] =  useState(window.localStorage.getItem('pincode') || "");
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

  const verifyPincodeDeliveribility = async (pincode_to_test,status_code_check,popup_check) => {
    console.log(status_code_check,popup_check,'clicked button');
    if(status_code_check != '404'){
      let data = JSON.stringify({
        "pincode": pincode_to_test,
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
        if(popup_check){
          Set_modal_status_code(response.data.status);
        } else {
          Set_status_code(response.data.status);
        }
        if(response.data.status == "200") {
          if(popup_check){
            Set_modal_delivery_date(response.data.data.available_courier_companies[0].etd)
          } else {
            Set_delivery_date(response.data.data.available_courier_companies[0].etd)
          }
        } else {
          if(popup_check) {
            Set_modal_link(response.data.link);
          } else {
            Set_link(response.data.link);
          }
        }
      } catch(error) {
        console.log(error)
      }
    } else {
      document.getElementById('pin-input').focus();
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

  useEffect(()=>{
    if(status_code == '200') {
      window.localStorage.setItem('pincode',pincode);
    }
  },[pincode] )


  return (
    <>
    <div className="App">
    <PincodeSection pincode_value={pincode} delivery_date_check={delivery_date} status_code_check={status_code} 
        clicked_check={clicked} link_check={link} SetPincode_check={SetPincode} SetClicked_check={SetClicked}
        verifyPincodeDeliveribility_check={verifyPincodeDeliveribility} popup_check={false}/>
    </div>
      <button className="product__submit__add"  onClick={() => {
        if(!pincode){
          setIsOpen(true)
        } else if( !status_code || status_code == '404' ){
          document.getElementById("pin-input").focus()
        } else {
          alert('add to cart')
        }
        }} >
          Add to cart
      </button>
      <br/>
      <button id="buyNowCustomId" onClick={() => {
        if(!pincode){
          setIsOpen(true)
        } else if( !status_code || status_code == '404' ){
          document.getElementById("pin-input").focus()
        } else {
          alert('buy now')
        }
        }}>
          Buy now
      </button>
    <div>
    <Modal
        center
        open={modalIsOpen}
        onClose={closeDesktopModal}
        classNames={{
            modal: 'custom-modal',
        }}
      >
    
        <PincodeSection pincode_value={modal_pincode} delivery_date_check={modal_delivery_date} status_code_check={modal_status_code} 
        clicked_check={modal_clicked} link_check={modal_link} SetPincode_check={SetModalPincode} SetClicked_check={SetModalClicked}
        verifyPincodeDeliveribility_check={verifyPincodeDeliveribility} popup_check={true}/>
      </Modal>
    </div>
    </>
  );
}

export default App;
