import "../css/Pincode-section.css";
import posthog from 'posthog-js'
import Amazon from "../images/amazon.png";
import delivery_mars from "../images/truck_mars.png";
import delivery_saturn from "../images/truck_saturn.png";
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
  from_add_to_cart,
  from_buy_now,
  buyNow,
  addToCart,
  Set_delivery_date,
  status_code,
  isLoading,
}) => {
  const [clicked, Set_clicked] = useState(false);
  const [buttonName, Set_buttonName] = useState("Submit");
  const [brand, Set_brand] = useState("");
  const [online, Set_online] = useState(true);

  useEffect(() => {
    const buttonChangedName = pincode_value ? "Change" : "Submit";
    Set_buttonName(buttonChangedName);
  }, [clicked]);

  useEffect(() => {
    const brand_name =
      process.env.REACT_APP_BRAND == "Mars" ? "mars" : "saturn";
    Set_brand(brand_name);
    Set_clicked(false);
    if (pincode_value) {
      Set_clicked(true);
    }
  }, []);

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
  };

  return (
    <div className="pincode-section-container">
      <div className="pincode-secton-main-container">
        <div className="cart-body-right">
          <div className="delivery-symbol">
            <div className="delivery-image-div">
              <img
                src={brand == "mars" ? delivery_mars : delivery_saturn}
                className="delivery-image"
                alt=""
                srcset=""
              />
            </div>
            <div className="delivery-image-text">Delivery:</div>
          </div>
          <div className="cart-body-right-container">
            <div className="right-upper">
              <div className="deliver-details">
                <span>Use pincode to check delivery details</span>
              </div>
              <div className="pincode">
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
                    autoComplete="off"
                    id="pin-input"
                    readOnly={clicked}
                  />
                  <button
                    className={
                      pincode_value >= 100000
                        ? "submit-button submit-button-active"
                        : "submit-button"
                    }
                    id={`pincode-submit-web-${process.env.REACT_APP_BRAND}`}
                    onClick={() => {
                      if (!clicked) {
                        posthog.capture(`pincode-submit-web-${process.env.REACT_APP_BRAND}`, { property: `pincode-submit-web-${process.env.REACT_APP_BRAND}` })
                        if (navigator.onLine) {
                          Set_online(true);
                          Set_clicked((prevState) => !prevState);
                          verifyPincodeDeliveribility_check(
                            pincode_value,
                            status_code_check,
                            false
                          );
                        } else {
                          Set_online(false);
                        }
                      } else {
                        Set_clicked((prevState) => !prevState);
                        SetPincode_check("");
                        Set_delivery_date("");
                        document.getElementById("pin-input").focus();
                        Set_online(true);
                      }
                    }}
                    disabled={pincode_value < 100000 || isLoading}
                  >
                    {!isLoading ? (
                      <span>{buttonName}</span>
                    ) : (
                      <span>Fetching... </span>
                    )}
                  </button>
                </div>
                {online ? (
                  <div>
                    {!isLoading ? (
                      <div>
                        {pincode_value > 100000 &&
                          clicked &&
                          status_code == "200" && (
                            <div className="estimated-days">
                              <div style={{ display: "flex" }}>
                                <div className="days-estimation">
                                  Free delivery by{" "}
                                  <span className="estimation-date">
                                    {" "}
                                    {delivery_date_check}{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="estimated-days">
                    <div style={{ display: "flex" }}>
                      <div className="days-estimation">
                        Something went wrong... please try again later
                      </div>
                    </div>
                  </div>
                )}

                {/* { (popup_check && status_code_check == '200') ? 
                     <div className="proceed-button" onClick={() => redirect()}>
                      <span>Proceed</span>
                    </div> : null } */}

                {/* {online ? (
                  <div> */}
                    {!isLoading ? (
                      <div>
                        {pincode_value > 100000 &&
                          clicked &&
                          status_code_check == "404" && (
                            <div>
                              <div className="estimated-days">
                                <div style={{ display: "flex" }}>
                                  <div className="days-estimation non-servicable-pin">
                                    We are currently not operating in this
                                    location. Try another pincode.
                                  </div>
                                </div>
                              </div>
                              <div className="available-in-amazon">
                                <div className="amazon-info">
                                  <div className="message-div">
                                    But you can buy our products from {brand} by
                                    GHC store on Amazon
                                  </div>
                                  <div className="buy-button">
                                    <a
                                      href={link_check}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      <span>Buy Now on </span>
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
                          )}
                      </div>
                    ) : null}
                  </div>
                {/* ) : (
                  <div className="estimated-days">
                    <div style={{ display: "flex" }}>
                      <div className="days-estimation">
                        Something went wrong...
                      </div>
                    </div>
                  </div>
                )} */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PincodeSection;
