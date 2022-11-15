import './App.css';
import './css/Pincode-section.css'
import {useEffect, useState} from 'react';
import axios from "axios";
import PincodeSection from './Components/Pincode-section';
import PincodeSectionMobile from './Components/Pincode-section-mobile';
import "react-spring-bottom-sheet/dist/style.css";
import posthog from 'posthog-js';

const App = () => {
  const [pincode,Set_pincode] =  useState(window.localStorage.getItem('pincode') || "");
  const [delivery_date,Set_delivery_date]=useState(window.localStorage.getItem('delivery_date') || "");
  const [status_code,Set_status_code]= useState("");
  const [clicked,Set_clicked] = useState(false);
  const [link,Set_link] = useState("");
  const [modal_pincode,Set_modal_pincode] = useState(window.localStorage.getItem('pincode') || "");
  const [modal_delivery_date,Set_modal_delivery_date]=useState("");
  const [modal_status_code,Set_modal_status_code]= useState("");
  const [modal_clicked,Set_modal_clicked] = useState(false);
  const [modal_link,Set_modal_link] = useState("");
  const [isLoading,Set_isLoading] = useState(false);
  const [sheetOpen, Set_sheetOpen] = useState(false);

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

  const verifyPincodeDeliveribility = async (pincode_to_test,status_code_check,popup_check,from_sheet=false) => {
      Set_isLoading(true);
      let data = JSON.stringify({
        "pincode": pincode_to_test,
        "brand": process.env.REACT_APP_BRAND
      });
  
      let config = {
        method: 'post',
        url: `${process.env.REACT_APP_GET_DELIVERY_DETAILS_URL}/device/pincode`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
  
      try{
        const response = await axios(config);
        Set_isLoading(false);
        if(popup_check){
          Set_modal_status_code(response.data.message.status);
        } else {
          Set_status_code(response.data.message.status);
        }
        if(response.data.message.status == 200) {
          let delivery_date_array = response.data.message.data.available_courier_companies; 
          if(popup_check){
            window.localStorage.setItem('pincode',pincode_to_test);
            Set_modal_delivery_date(response.data.message.data.available_courier_companies[delivery_date_array.length-1].etd);
            Set_delivery_date(response.data.message.data.available_courier_companies[delivery_date_array.length-1].etd)
            SetPincode(modal_pincode);
            if(from_sheet){
              setTimeout(() => {
                Set_sheetOpen(false);
              }, 3000);
            }
          } else {
            window.localStorage.setItem('pincode',pincode_to_test);
            Set_delivery_date(response.data.message.data.available_courier_companies[delivery_date_array.length-1].etd);
          }
        } else {
          if(popup_check) {
            Set_modal_link(response.data.message.link);
          } else {
            Set_link(response.data.message.link);
          }
        }
      } catch(error) {
        console.log(error);
      }
  }

  useEffect(()=>{
    posthog.init(process.env.REACT_APP_POSTHOG_KEY, { api_host: 'https://app.posthog.com' })
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

    if(pincode){
      verifyPincodeDeliveribility(modal_pincode,200,true);
      verifyPincodeDeliveribility(pincode,200,false);
    }

  },[]);

  return (
    <>
    <div className="App">
      <div className='pincode-main-section'>
        <PincodeSection pincode_value={pincode} delivery_date_check={delivery_date} status_code_check={status_code} 
          clicked_check={clicked} link_check={link} SetPincode_check={SetPincode} SetClicked_check={SetClicked}
          verifyPincodeDeliveribility_check={verifyPincodeDeliveribility} popup_check={false} Set_delivery_date={Set_delivery_date}
          status_code={status_code} isLoading={isLoading}/>
      </div>
      <div className='mobile-pincode-main-section'>
        <PincodeSectionMobile pincode_value={pincode}  delivery_date_check={delivery_date} delivery_date_check_modal={modal_delivery_date} status_code_check={modal_status_code}
          modal_pincode={modal_pincode} clicked_check={modal_clicked} link_check={modal_link} SetPincode_check={SetModalPincode} SetClicked_check={SetModalClicked}
          verifyPincodeDeliveribility_check={verifyPincodeDeliveribility} popup_check={true} Set_delivery_date={Set_modal_delivery_date}
          status_code={status_code} isLoading={isLoading} sheetOpen={sheetOpen} Set_sheetOpen={Set_sheetOpen}/>
      </div>
    </div>
    <div>
    </div>
    </>
  );
}

export default App;
