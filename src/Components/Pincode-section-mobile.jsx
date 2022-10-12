import "../css/Pincode-section.css";
import PincodeSectionMobile from "./Pincode-section-popup";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useState } from "react";
import { useEffect } from "react";

const PincodeSection = ({
  pincode_value,
  delivery_date_check,
  status_code_check,
  clicked_check,
  link_check,
  SetPincode_check,
  SetClicked_check,
  verifyPincodeDeliveribility_check,
  popup_check,
  Set_delivery_date,
  status_code,
}) => {
  const [clicked, Set_clicked] = useState(false);
  const [buttonName, Set_buttonName] = useState("Submit");
  const [sheetOpen,Set_sheetOpen] = useState(false);
  const [modal_pincode,Set_modal_pincode] = useState("");
  const [modal_delivery_date,Set_modal_delivery_date]=useState("");
  const [modal_status_code,Set_modal_status_code]= useState("");
  const [modal_clicked,Set_modal_clicked] = useState(false);
  const [modal_link,Set_modal_link] = useState("");

	const closeMobileModal = () => {
    Set_sheetOpen(false);
    // SetPincode(modal_pincode);
    SetModalPincode("");
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

  const OpenBottomSheet = () => {
    Set_sheetOpen(true);
  }

	const closeSheet = () => {
		Set_sheetOpen(false);
	}

  useEffect(() => {
    const buttonChangedName = pincode_value ? "Change" : "Enter pincode";
    Set_buttonName(buttonChangedName);
  }, [clicked]);

  useEffect(() => {
    Set_clicked(false);
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
                    true
                    && <div className="estimated-days-mobile">
                            <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                    Deliver to: {pincode_value} 
                                </div>
                            </div>
                        </div>
                    }
                { 
                    // (pincode_value>100000 && clicked && status_code =='200') 
                    true
                    && <div className="estimated-days-mobile">
                            <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                    Free delivery by  <span className="estimation-date"> {delivery_date_check} </span>
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
        <PincodeSectionMobile pincode_value={modal_pincode} delivery_date_check={modal_delivery_date} status_code_check={modal_status_code} 
        clicked_check={modal_clicked} link_check={modal_link} SetPincode_check={SetModalPincode} SetClicked_check={SetModalClicked}
        verifyPincodeDeliveribility_check={verifyPincodeDeliveribility_check} popup_check={true} />
    </BottomSheet>
    </>
  );
};

export default PincodeSection;
