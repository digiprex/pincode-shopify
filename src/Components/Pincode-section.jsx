import '../css/Pincode-section.css'
import Amazon from "../images/amazon.png";
import "react-responsive-modal/styles.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const PincodeSection = ({pincode,delivery_date,status_code,clicked,link,SetPincode,SetClicked,verifyPincodeDeliveribility,popup}) => {
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
                            value={pincode}
                            name="pincode"
                            onChange={(e) => SetPincode(e.target.value)}
                            onKeyDown={isValidInput}
                            autoComplete='off'
                        />
                        <div
                            className={
                                (pincode > 100000)
                                    ? "submit-button submit-button-active"
                                    : "submit-button"
                            }
                            id="pincode-submit"
                            onClick={
                                () => {SetClicked(true) ;verifyPincodeDeliveribility()}
                            }
                        >
                            {clicked ? <span>
                                Change  
                            </span> : <span>Submit</span>}
                        </div>
                     </div>
                     { (pincode>10000 && clicked && status_code == "200") && <div className="estimated-days">
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
                            {delivery_date}
                        </span>
                    </div>
                  }
                     { (popup && status_code == "200") ? 
                     <div className={"proceed-button"} >
                      <span>Proceed</span>
                    </div> : null }
                    { (pincode>100000 && clicked && status_code == "404") &&
                      <div>
                      <div className="estimated-days">
                          <div
                              style={{ display: "flex" }}
                          >
                              <div className="estimated-days-start">
                                  *
                              </div>
                              <div className="days-estimation non-servicable-pin">
                                  {/* {
                                      this.state.serviceableData.text.split(
                                          "\n"
                                      )[0]
                                  } */}
                                  We are currently not operating in this location
                                  <br />
                                  Try another pincode.
                              </div>
                          </div>
                      </div>
                      <div className="available-in-amazon">
                              <div className="amazon-info">
                                  { process.env.REACT_APP_BRAND == 'Mars' ? 
                                    <div className="message-div">
                                    But you can buy our products from mars by ghc store on Amazon
                                    </div> : 
                                    <div className="message-div">
                                    But you can buy our products from saturn by ghc store on Amazon
                                    </div>}
                                  <div className="buy-button">
                                      <a
                                          href={link}
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