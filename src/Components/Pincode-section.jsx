import '../css/Pincode-section.css'
import Amazon from "../images/amazon.png";
import "react-responsive-modal/styles.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const PincodeSection = ({pincode_value,delivery_date_check,status_code_check,clicked_check,
    link_check,SetPincode_check,SetClicked_check,verifyPincodeDeliveribility_check,popup_check,
    from_add_to_cart,from_buy_now,buyNow,addToCart
}) => {

  const brand = process.env.REACT_APP_BRAND == 'Mars' ? 'mars':'saturn'
  const redirect = () => {
    if(from_add_to_cart) {
        addToCart();
    } 
    if(from_buy_now){
        buyNow();
    }
  }
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
          <div className="cart-body-right-container">
              <div className="right-upper">
                  <div className="deliver-details">
                      <span className="map-icon">
                          <FaMapMarkerAlt className="fa-map-icon" /> 
                      </span>
                      <span>
                          Delivery Details <span>*</span>
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
                            value={pincode_value}
                            name="pincode"
                            onChange={(e) => SetPincode_check(e.target.value)}
                            onKeyDown={isValidInput}
                            autoComplete='off'
                            id="pin-input"
                        />
                        <div
                            className={
                                (pincode_value > 100000)
                                    ? "submit-button submit-button-active"
                                    : "submit-button"
                            }
                            id="pincode-submit"
                            onClick={
                                () => {SetClicked_check(true) ;verifyPincodeDeliveribility_check(pincode_value,status_code_check,popup_check)}
                            }
                        >
                            {/* {(clicked_check && pincode_value.length==6)?  */}
                            {/* <span>Change</span> :  */}
                            <span>Submit</span>
                        </div>
                     </div>
                     { (pincode_value>100000 && clicked_check && status_code_check == "200") && <div className="estimated-days">
                        <div style={{ display: "flex" }}>
                            <div className="estimated-days-start">
                                *
                            </div>
                            <div className="days-estimation">
                                Eligible for free delivery
                                by
                            </div>
                        </div>

                        <span className="estimation-date">
                            {delivery_date_check}
                        </span>
                    </div>
                  }
                     { (popup_check && status_code_check == '200') ? 
                     <div className="proceed-button" onClick={() => redirect()}>
                      <span>Proceed</span>
                    </div> : null }
                    { (pincode_value>100000 && clicked_check && status_code_check == "404") &&
                      <div>
                      <div className="estimated-days">
                          <div
                              style={{ display: "flex" }}
                          >
                              <div className="estimated-days-start">
                                  *
                              </div>
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
                     
                  </div>
                </div>
          </div>
      </div>
      </div>
  )
    
}

export default PincodeSection;