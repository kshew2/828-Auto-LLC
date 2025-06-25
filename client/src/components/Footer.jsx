import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import DOMPurify from 'dompurify';
import L from 'leaflet';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { FaFacebook } from 'react-icons/fa';
import MapLibreMap from './MapLibreMap';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Footer = () => {
  // Mini contact form state (exact replica of Contact.jsx)
  const [miniFormData, setMiniFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    time:''
  });

  const handleMiniChange = (e) => {
    const { name, value } = e.target;
    setMiniFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9\b]+$/;
    return re.test(phone);
  };

  const handleMiniSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(miniFormData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(miniFormData.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }
    
    const sanitizedData = {
      name: DOMPurify.sanitize(miniFormData.name),
      email: DOMPurify.sanitize(miniFormData.email),
      phone: DOMPurify.sanitize(miniFormData.phone),
      message: DOMPurify.sanitize(miniFormData.message),
      time: new Date().toLocaleString(), // Add timestamp
    };

    // Send contact email
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      sanitizedData,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('Contact email sent!', response.status, response.text);
      // Send auto-reply email
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
        sanitizedData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((res) => {
        console.log('Auto-reply sent!', res.status, res.text);
      })
      .catch((err) => {
        console.error('Failed auto-reply...', err);
      });
      alert('Message sent successfully!');
      setMiniFormData({ name: '', email: '', phone: '', message: '' });
    })
    .catch((err) => {
      console.error('Failed contact email...', err);
      alert('Failed to send message. Please try again later.');
    });
  };

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
        {/* Content Container */}
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

          {/* Contact & Hours Container with a slightly darker background */}
          <div className="w-full mx-auto bg-[#0E1315] text-white py-6 rounded-xl">
            <div className="mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-8">
              {/* Column 1 - Company Info */}
              <div className="text-center mx-auto md:w-1/3 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-secondary mb-6">
                  Company Info
                </h2>
                <div className="mt-6 flex justify-center gap-10">
                  {[
                    {
                      icon: <HiLocationMarker />,
                      link:
                        "https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/@35.8752307,-81.5918467,17z/data=!3m1!4b1!4m6!3m5!1s0x8850d94e1760b347:0xb9f8f5a45a1cc6df!8m2!3d35.8752307!4d-81.5918467!16s%2Fg%2F11j7lwyc8f?entry=ttu&g_ep=EgoyMDI1MDQyOS4wIKXMDSoASAFQAw%3D%3D",
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

              {/* Column 2 - Business Hours */}
              <div className="text-center mx-auto w-full sm:w-1/3 flex flex-col items-center">
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

              {/* Column 3 - Mini Contact Form (Exact Replica with modifications) */}
              <div className="text-center mx-auto w-full md:w-1/3 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-secondary mb-6">
                  Contact Us
                </h2>
                <form className="w-full space-y-6" onSubmit={handleMiniSubmit}>
                  {/* Name and Phone on the same line */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <label htmlFor="name" className="block text-left text-lg font-medium text-white">
                        Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={miniFormData.name}
                        onChange={handleMiniChange}
                        className="mt-1 block w-full border border-gray-300 text-bgdark rounded-md py-2 px-3 focus:ring-secondary focus:border-secondary"
                        required
                        maxLength="100"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label htmlFor="phone" className="block text-left text-lg font-medium text-white">
                        Phone<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={miniFormData.phone}
                        onChange={handleMiniChange}
                        className="mt-1 block w-full border border-gray-300 text-bgdark rounded-md py-2 px-3 focus:ring-secondary focus:border-secondary"
                        required
                        maxLength="15"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-left text-lg font-medium text-white">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={miniFormData.email}
                      onChange={handleMiniChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-bgdark focus:ring-secondary focus:border-secondary"
                      required
                      maxLength="100"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-left text-lg font-medium text-white">
                      Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={miniFormData.message}
                      onChange={handleMiniChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-bgdark focus:ring-secondary focus:border-secondary"
                      required
                      maxLength="1000"
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-primary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;