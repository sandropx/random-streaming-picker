import { ReactQRCode } from "@lglab/react-qr-code";

function DesktopMessage() {
  return (
    <div className="desktop-only">
      <div className="desktop-left">
        <img
          className="img-mobile-mockup"
          src="./assets/modern-black-smartphone-mockup-with-blank-screen-transparent-background_84443-26895.avif"
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
  );
}

export default DesktopMessage;
