import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import DOMPurify from 'dompurify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Sanitize input
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      phone: DOMPurify.sanitize(formData.phone),
      message: DOMPurify.sanitize(formData.message),
    };

    // Send contact email
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      sanitizedData,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('Contact email sent successfully!', response.status, response.text);

      // Send auto-reply email
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
        sanitizedData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log('Auto-reply email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send auto-reply email...', err);
      });

      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    })
    .catch((err) => {
      console.error('Failed to send contact email...', err);
      alert('Failed to send message. Please try again later.');
    });
  };

  return (
    <div className="py-10 bg-bgdark min-h-screen px-5">
      <div className="max-w-screen-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-bgdark font-primary text-center">
          Contact Info
        </h2>
        <div className="mt-2">
          {/* <h3 className="text-2xl font-semibold mb-4 text-bgdark font-primary">
            Our Contact Information
          </h3> */}
          <p className="text-lg text-gray-700 my-3">
            <strong>Company Name:</strong> 828 Auto LLC
          </p>
          <p className="text-lg text-gray-700 my-3">
            <strong>Address:</strong> 2788 Morganton Blvd SW, Lenoir, NC
          </p>
          <p className="text-lg text-gray-700 my-3">
            <strong>Phone:</strong> (828) 238-4020
          </p>
          <p className="text-lg text-gray-700 my-3">
            <strong>Email:</strong> 828autollc@mail.com
          </p>
        </div>
        <hr className="my-4 border-gray-300" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-secondary focus:border-secondary"
              required
              maxLength="100"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-secondary focus:border-secondary"
              required
              maxLength="100"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-secondary focus:border-secondary"
              required
              maxLength="15"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-secondary focus:border-secondary"
              required
              maxLength="1000"
            ></textarea>
          </div>
          <div className="text-center">
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
  );
};

export default Contact;