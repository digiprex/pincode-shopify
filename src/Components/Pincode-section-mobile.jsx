import "../css/Pincode-section.css";
import PincodeSectionPopup from "./Pincode-section-popup";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useState } from "react";
import { useEffect } from "react";

const PincodeSection = ({
  pincode_value,
  modal_pincode,
  delivery_date_check,
  delivery_date_check_modal,
  status_code_check,
  clicked_check,
  link_check,
  SetPincode_check,
  SetClicked_check,
  verifyPincodeDeliveribility_check,
  popup_check,
  Set_delivery_date,
  isLoading
}) => {
  const [clicked, Set_clicked] = useState(false);
  const [buttonName, Set_buttonName] = useState("Submit");
  const [sheetOpen,Set_sheetOpen] = useState(false);

	const closeMobileModal = () => {
    Set_sheetOpen(false);
    // SetPincode(modal_pincode);
    // SetModalPincode("");
  }

  // const SetClicked = (value) => {
  //   Set_clicked(value)
  // }

  // const SetModalPincode = (value) => {
  //   Set_modal_pincode(value)
  // }

  // const SetModalClicked = (value) => {
  //   Set_modal_clicked(value)
  // }

  const OpenBottomSheet = () => {
    Set_sheetOpen(true);
  }

	const closeSheet = () => {
		Set_sheetOpen(false);
    if(status_code_check == 200){
      verifyPincodeDeliveribility_check(modal_pincode,200,false);
    }
 	}

  useEffect(() => {
    const buttonChangedName = (pincode_value || modal_pincode) ? "Change" : "Enter pincode";
    Set_buttonName(buttonChangedName);
  }, [modal_pincode]);

  useEffect(() => {
    Set_clicked(false);
    const buttonChangedName = (pincode_value || modal_pincode) ? "Change" : "Enter pincode";
    Set_buttonName(buttonChangedName);
    if (pincode_value) {
      Set_clicked(true);
    }
  }, []);

  const brand = process.env.REACT_APP_BRAND == "Mars" ? "mars" : "saturn";
  return (
    <>
    <div className="pincode-secton-main-container">
      <div className="cart-body-right">
        <div className="cart-body-right-container">
          <div className="right-upper">
            <div className="pincode">
              <div className="pin-input">
                <div className="delivery-details-mobile">
                { 
                    // (pincode_value>100000 && clicked && status_code =='200') 
                    pincode_value ?
                    <div>
                     <div className="estimated-days-mobile">
                            <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                    Deliver to: {pincode_value} 
                                </div>
                            </div>
                      </div>
                     <div className="estimated-days-mobile">
                            <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                    Free delivery by  <span className="estimation-date"> {delivery_date_check} </span>
                                </div>
                            </div>
                      </div>
                    </div> :
                    <div>
                      <div className="estimated-days-mobile">
                            <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                  Find a partner that delivers to you
                                </div>
                            </div>
                      </div>
                    </div>
                }
                </div>
                <div
                  className="submit-button submit-button-active"
                  id="pincode-submit-1"
                  onClick={() => {
										Set_sheetOpen(true);
                  }}
                >
                  <span>{buttonName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <BottomSheet open={sheetOpen} onDismiss={closeSheet}>
        <PincodeSectionPopup pincode_value={pincode_value} modal_pincode={modal_pincode} delivery_date_check={delivery_date_check}
        delivery_date_check_modal={delivery_date_check_modal} status_code_check={status_code_check} 
        clicked_check={clicked_check} link_check={link_check} SetPincode_check={SetPincode_check} SetClicked_check={SetClicked_check}
        verifyPincodeDeliveribility_check={verifyPincodeDeliveribility_check} popup_check={true} isLoading={isLoading} />
    </BottomSheet>
    </>
  );
};

export default PincodeSection;
