import React, { useState } from "react";
import "./orderTracker.css";
import { CheckIcon, CheckCircleIcon} from '@heroicons/react/20/solid';

const OrderTracker = ({status}) => {
  const steps = ["Order Placed", "Shipped", "Dispatched", "Delivered"];
  const [currentStep, setCurrentStep] = useState( status === 'Pending' ? 2 : status === 'Shipped' ? 3 : status === 'Dispatched' ? 4 : status === 'Delivered' ? 5 : 0);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <CheckCircleIcon className="w-8 h-8" /> : <span className="absolute text-center rounded-full w-2.5 h-2.5 bg-white"></span>}
            </div>
            <p className="text-sm sm:text-base text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
        <button
          className="text-white bg-gray-600 rounded-md py-2 px-3 my-5"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
        status === 'Pending' ? 1 : status === 'Shipped' ? 2 : status === 'Dispatched' ? 3 : status === 'Delivered' ? 4 : -1
      )} */}
    </>
  );
};

export default OrderTracker;