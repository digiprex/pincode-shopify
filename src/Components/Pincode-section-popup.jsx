import '../css/Pincode-section.css'
import Amazon from "../images/amazon.png";
import deliveryPic from '../images/tabler_truck-delivery.png';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';

const PincodeSection = ({modal_pincode,delivery_date_check_modal,status_code_check,clicked_check,
    link_check,SetPincode_check,SetClicked_check,verifyPincodeDeliveribility_check,popup_check,
    from_add_to_cart,from_buy_now,buyNow,addToCart,Set_delivery_date,isLoading
}) => {
    const [clicked,Set_clicked] = useState(false);
	const [buttonName,Set_buttonName] = useState("Submit");

	useEffect(() => {
		const buttonChangedName = clicked ? "Change" : "Submit";
		Set_buttonName(buttonChangedName);
	},[clicked]);

	useEffect(()=>{
		Set_clicked(false);
        SetPincode_check('');
    },[])

  const brand = process.env.REACT_APP_BRAND == 'Mars' ? 'mars':'saturn'
  const isValidInput = (e) => {
    
      if (e.keyCode === 13) {
        document.getElementById("pincode-submit").click();
      }

      let x = e.which || e.keyCode;
      return (x >= 48 && x <= 57) ||
          x === 8 ||
          (x >= 35 && x <= 40) ||
          x === 46 ||
          (x >= 96 && x <= 105) ||
          x === 9
          ? null
          : e.preventDefault();
  }

  return (
    <div className="pincode-secton-main-container">
      <div className="cart-body-right">
					<div className='delivery-symbol'>
						<div className='delivery-image-div'>
							<img src={deliveryPic} className="delivery-image" alt="" srcset="" />
						</div>
						<div className='delivery-image-text'>
							Delivery:
						</div>
					</div>
					<div className="cart-body-right-container">
              <div className="right-upper">
                  <div className="deliver-details">
                      <span>    
                        Use pincode to check delivery details
                      </span>
                  </div>
                  <div className='pincode'>
                     <div className="pin-input">
                        <input
                            className="pincode-validation-input"
                            type="text"
                            inputMode="numeric"
                            pattern="[1-9]{1}[0-9]{5}"
                            minLength="6"
                            maxLength="6"
                            placeholder="Enter your pincode"
                            value={modal_pincode}
                            name="pincode"
                            onChange={(e) => SetPincode_check(e.target.value)}
                            onKeyDown={isValidInput}
                            autoComplete='off'
                            id="pin-input"
                            readOnly={clicked}
                        />
                        <div
                            className={
                                (modal_pincode > 100000)
                                    ? "submit-button submit-button-active"
                                    : "submit-button"
                            }
                            id="pincode-submit"
                            onClick={
                                () => {
                                    if(!clicked){
                                        Set_clicked((prevState) => !prevState);
                                        verifyPincodeDeliveribility_check(modal_pincode,status_code_check,true)
                                    } else {
                                        Set_clicked((prevState) => !prevState);
                                        SetPincode_check('');
                                        Set_delivery_date('');
                                     }
                                    }
                            }
                        >
                            {/* {(clicked_check && modal_pincode.length==6)?  */}
                            {/* <span>Change</span> :  */}
                            { !isLoading ? <span>{buttonName}</span> : <span>Fetching details... </span> }
                        </div>
                     </div>
                    { !isLoading? <div>
                     { (modal_pincode>100000 && clicked && status_code_check =='200') && <div className="estimated-days">
                        <div style={{ display: "flex" }}>
                            <div className="days-estimation">
                                Free delivery by  <span className="estimation-date"> {delivery_date_check_modal} </span>
                            </div>
                        </div>
                    </div>
                    }
                     </div> : null }
                    
                     {/* { (popup_check && status_code_check_check == '200') ? 
                     <div className="proceed-button" onClick={() => redirect()}>
                      <span>Proceed</span>
                    </div> : null } */}
                    { !isLoading ? <div>
                        { (modal_pincode>100000 && clicked && status_code_check == "404") &&
                        <div>
                        <div className="estimated-days">
                            <div
                                style={{ display: "flex" }}
                            >
                                <div className="days-estimation non-servicable-pin">
                                    We are currently not operating in this location
                                    <br />
                                    Try another pincode.
                                </div>
                            </div>
                        </div>
                        <div className="available-in-amazon">
                                <div className="amazon-info">
                                        <div className="message-div">
                                        But you can buy our products from {brand} by ghc store on Amazon
                                        </div> 
                                    <div className="buy-button">
                                        <a
                                            href={link_check}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <span>
                                                Buy Now on{" "}
                                            </span>
                                            <img
                                                src={Amazon}
                                                alt="amazon logo"
                                                className="amazon-logo"
                                            />
                                        </a>
                                    </div>
                                </div>
                        </div>
                        </div>
                        }
                    </div> : null }
                     
                  </div>
              </div>
          </div>
      </div>
      </div>  
  )
    
}

export default PincodeSection;