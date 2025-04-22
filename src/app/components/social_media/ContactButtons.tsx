import React from "react";

const contactMethods = [
  {
    name: "Chat on WhatsApp",
    url: (
      number: string | number | boolean,
      message: string | number | boolean
    ) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    number: "+916377871603", // Replace with your WhatsApp number
    message: "Hello, I would like to chat!", // Replace with your message
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    name: "Message on Instagram",
    url: (username: string | number | boolean) =>
      `https://instagram.com/${username}`,
    username: "yourusername", // Replace with your Instagram username
    color: "bg-pink-600",
    hoverColor: "hover:bg-pink-700",
  },
  {
    name: "Message on Facebook",
    url: (pageId: string | number | boolean) => `https://m.me/${pageId}`,
    pageId: "your_facebook_page_id", // Replace with your Facebook Page ID or username
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
];

const ContactButtons = () => {
  return (
    <div className="flex space-x-4 justify-center">
      {contactMethods.map(
        ({
          name,
          url,
          number,
          message,
          username,
          pageId,
          color,
          hoverColor,
        }) => (
          <a
            key={name}
            href={url(number || username || pageId || "", message || "")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`px-4 py-2 ${color} text-white rounded ${hoverColor} transition`}
            >
              {name}
            </button>
          </a>
        )
      )}
    </div>
  );
};

export default ContactButtons;
