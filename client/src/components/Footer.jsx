import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";



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

  const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default size
    iconAnchor: [12, 41], // Anchor point
    popupAnchor: [1, -34], // Popup position
    shadowSize: [41, 41], // Shadow size
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="w-full h-full bg-bgdark flex flex-col items-center justify-center text-center py-10">
      <div className="w-full h-full mx-auto">
        <h1 className="font-primary text-primary text-7xl font-semibold py-6">
          Come visit us!
        </h1>
        <p className="text-xl text-accent pb-6">
          AND DRIVE AWAY WITH YOUR NEW CAR!
        </p>
        <div className="bg-tertiary-accent text-white p-8 rounded-2xl shadow-lg max-w-xl sm:mx-auto mx-10 text-center">
  <h2 className="text-4xl font-bold text-secondary">Contact us!</h2>
  {/* <p className="text-lg mt-2 text-gray-300">AND DRIVE AWAY WITH YOUR NEW CAR!</p> */}

   <div className="mt-6 space-y-4 md:w-8/12 sm:w-6/12 w-12/12 mx-auto whitespace-nowrap">
    {[
      { icon: <HiLocationMarker />, text: "2788 Morganton Blvd SW", link: "https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/@35.8752307,-81.5918467,17z/data=!3m1!4b1!4m6!3m5!1s0x8850d94e1760b347:0xb9f8f5a45a1cc6df!8m2!3d35.8752307!4d-81.5918467!16s%2Fg%2F11j7lwyc8f?entry=ttu&g_ep=EgoyMDI1MDIxNy4wIKXMDSoASAFQAw%3D%3D" },
      { icon: <HiMail />, text: "828autollc@mail.com", link: "mailto:828autollc@mail.com" },
      { icon: <HiPhone />, text: "(828) 238-4020", link: "tel:+18282384020" },
      { icon: <FaFacebook />, text: "Facebook", link: "https://www.facebook.com/profile.php?id=61557949206009" }
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-x-4">
        <div className="text-primary text-2xl w-8 flex justify-center">{item.icon}</div>
        <a href={item.link} className="text-gray-300 text-lg hover:text-primary transition duration-300">{item.text}</a>
      </div>
    ))}
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
