import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const Checkout = () => {
  return (
    <>
      {" "}
      <h2>
        Dilivary address is our shop! if you can delivery this product in your
        home , so in present we're not capable
      </h2>
      <div className="flex">
        <div className="left bg-amber-100 w-[20vw] min-h-screen">
          <ul>
            
            <li>OrderSummery</li>
            <li>Payment Option</li>
          </ul>
        </div>
        <div className="righ flex justify-center items-center">
          {/* <ProgressBar percent={50}>
            <Step>
        {({ accomplished }) => (
          <div style={{ color: accomplished ? "green" : "gray" }}>Step 1</div>
        )}
      </Step>
      <Step>
        {({ accomplished }) => (
          <div style={{ color: accomplished ? "green" : "gray" }}>Step 2</div>
        )}
      </Step>
    </ProgressBar> */}
          working....
        </div>
      </div>
    </>
  );
};

export default Checkout;
