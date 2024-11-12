"use client";
import { useRef } from "react";
import TawkMessengerReact, {
  TawkMessenger,
} from "@tawk.to/tawk-messenger-react";

const TawkMessengerComponent = () => {
  const customStyle = {
    visibility: {
      mobile: {
        xOffset: 10,
        yOffset: 70,
        position: "tr"
      },
    },
  };

  const tawkMessengerRef = useRef<TawkMessenger>(null);

  return (
    <div>
      <TawkMessengerReact
      customStyle={ customStyle }
        propertyId="655381bacec6a912820fc8a3"
        widgetId="1hf735gcu"
        ref={tawkMessengerRef}
      />
    </div>
  );
};

export default TawkMessengerComponent;
