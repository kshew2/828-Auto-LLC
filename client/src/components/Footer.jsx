import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import "leaflet/dist/leaflet.css";


const Footer = () => {
  const markerRef = useRef(null);

  // Handle mouse over to show popup
  const handleMouseOver = () => {
    markerRef.current?.openPopup();
  };

  // Handle mouse out to close popup
  const handleMouseOut = () => {
    markerRef.current?.closePopup();
  };

  // Handle the marker click to navigate to another page
  const handleMarkerClick = () => {
    window.location.href =
      "https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/@35.8752307,-81.5944216,17z/data=!3m1!4b1!4m6!3m5!1s0x8850d94e1760b347:0xb9f8f5a45a1cc6df!8m2!3d35.8752307!4d-81.5918467!16s%2Fg%2F11j7lwyc8f?entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoASAFQAw%3D%3D"; // Replace with your desired URL
  };

  return (
    <div className="w-full h-full bg-bgdark flex flex-col items-center justify-center text-center py-10">
      <div className="w-full h-full mx-auto">
        <h1 className="font-primary text-primary text-7xl font-semibold py-6">
          Come visit us!
        </h1>
        <p className="text-xl text-accent pb-6">
          AND DRIVE AWAY WITH YOUR NEW CAR!
        </p>
        <div className="flex flex-row items-center justify-center gap-9">
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="mt-1 text-accent text-lg">
              <HiMail />
            </div>
            <div className="text-secondary-accent text-lg"><a href="mailto:828autollc@mail.com">828autollc@mail.com</a></div>
          </div>
          {/* <div className="flex flex-row items-center justify-center gap-2">
            <div className="mt-1 text-accent text-lg">
              <HiLocationMarker />
            </div>
            <div className="text-secondary-accent text-lg"><a href="">Lenoir, NC</a></div>
          </div> */}
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="mt-1 text-accent text-lg">
              <HiPhone />
            </div>
            <div className="text-secondary-accent text-lg"><a href="tel:+18282384020">(828) 238-4020</a></div>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="mt-1 text-accent text-lg">
              <FaFacebook />
            </div>
            <div className="text-secondary-accent text-lg"><a href="https://www.facebook.com/profile.php?id=61557949206009">Facebook</a></div>
          </div>
        </div>
        <div className="h-full w-full pt-10 py-20 px-10 flex flex-col items-center justify-center mx-auto">
          <MapContainer
            center={[35.87544, -81.5921]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "400px", borderRadius: "10px" }} // Add border radius here
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[35.87544, -81.5921]}
              ref={markerRef}
              eventHandlers={{
                mouseover: handleMouseOver,
                mouseout: handleMouseOut,
                click: handleMarkerClick,
              }}
            >
              <Popup>
                <a
                  href="https://www.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For directions to 828 Auto LLC click marker
                </a>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
