import { ReactQRCode } from "@lglab/react-qr-code";

import mockupHome from "../assets/mockup.png";

function DesktopMessage() {
  return (
    <div className="desktop-only">
      <div className="desktop-left">
        <img
          className="img-mobile-mockup"
          src={mockupHome}
          alt="Mobile App Mockup"
        />
      </div>
      <div className="desktop-right">
        <h1>
          Best <br />
          <span className="colored">experienced</span> <br />
          on mobile
        </h1>
        <p>
          This app was designed for smartphones. <br />
          Resize your browser or scan the QR code below.
        </p>
        <div className="qr-glass">
          <div className="scan-me">Scan me</div>

          <ReactQRCode
            dataModulesSettings={{
              color: "#ffffff",
            }}
            finderPatternOuterSettings={{
              color: "#ffffff",
            }}
            finderPatternInnerSettings={{
              color: "#ffffff",
            }}
            marginSize={2}
            size={256}
            value="https://app.maurinebasaia.ch"
          />
        </div>
      </div>
    </div>
  );
}

export default DesktopMessage;
