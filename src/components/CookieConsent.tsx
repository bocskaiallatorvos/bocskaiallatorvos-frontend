import { Weight } from "lucide-react";
import CookieConsent from "react-cookie-consent";

const CookieConsentPopup = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Elfogadom"
      declineButtonText="Elutasítom"
      enableDeclineButton
      cookieName="cookie_consent"
      style={{ background: "#1f2937" }}
      buttonStyle={{ background: "#B3C942", color: "#fff"}}
    >
      Ez az oldal sütiket használ a jobb felhasználói élmény érdekében.
    </CookieConsent>
  );
};

export default CookieConsentPopup;
