import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapLibreMap from "./MapLibreMap";

const Footer = () => {
  const markerRef = useRef(null);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      <footer className="max-w-full bg-bgdark flex flex-col items-center justify-center text-center py-4 px-1">
        {/* Content Container with max width */}
        <div className="max-w-screen-xl w-full mx-auto">
          <h1 className="font-primary text-primary text-7xl font-semibold py-6">
            Come visit us!
          </h1>
          <p className="text-xl text-accent pb-6">
            AND DRIVE AWAY WITH YOUR NEW CAR!
          </p>

          {/* Map Section */}
          <div className="w-full bg-bgdark">
            <div className="max-w-screen-xl h-[400px] lg:h-[600px] px-4 bg-bgdark mx-auto">
              <MapLibreMap />
            </div>
          </div>

          {/* Contact & Hours Container - Reduced margin and top aligned */}
          <div className="w-full bg-bgdark text-white ">
            <div className="mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-8">
              {/* Contact Details */}
              <div className="text-center md:w-1/2 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-secondary mb-6">
                  828 Auto LLC
                </h2>
                <div className="mt-6 flex justify-center gap-8">
                  {[
                    {
                      icon: <HiLocationMarker />,
                      link:
                        "https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645",
                    },
                    {
                      icon: <HiMail />,
                      link: "mailto:828autollc@mail.com",
                    },
                    {
                      icon: <HiPhone />,
                      link: "tel:+18282384020",
                    },
                    {
                      icon: <FaFacebook />,
                      link:
                        "https://www.facebook.com/profile.php?id=61557949206009",
                    },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="text-primary text-4xl hover:text-secondary transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="text-center md:w-1/2 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-secondary mb-6">
                  Business Hours
                </h2>
                <div className="overflow-x-auto">
                  <table className="table-auto mx-auto text-gray-300 text-lg border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left w-1/2">Day</th>
                        <th className="px-4 py-2 text-right w-1/2">Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 text-left">Sunday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          Closed
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Monday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          9:00 AM - 6:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Tuesday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          9:00 AM - 6:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Wednesday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          9:00 AM - 6:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Thursday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          9:00 AM - 6:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Friday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          9:00 AM - 6:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-left">Saturday</td>
                        <td className="px-4 py-2 text-right whitespace-nowrap">
                          10:00 AM - 2:00 PM
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* <div className="w-full bg-bgdark">
        <div className="max-w-screen-xl h-[400px] lg:h-[600px] px-4 bg-bgdark mx-auto">
          <MapLibreMap />
        </div>
      </div> */}
    </>
  );
};

export default Footer;