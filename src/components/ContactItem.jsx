import React from 'react';

export default function ContactItem({ contact, onEdit, onDelete }) {
  const handleCallPopup = () => {
  const popup = window.open("", "CallWindow", "width=300,height=200,top=200,left=500");
  if (!popup) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }
  popup.document.write(`
    <html>
      <head>
        <title>Call ${contact.name}</title>
        <style>
          body { font-family: Arial; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; margin: 0; }
          h2 { margin-bottom: 20px; }
          a { padding: 10px 20px; background-color: #4ade80; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>Call ${contact.name}</h2>
        <a href="tel:${contact.phone}" onclick="window.close()">Call Now</a>
      </body>
    </html>
  `);
  popup.document.close();
};


  return (
    <div className="contact-item">
      <div className="left">
        <div className="avatar">{contact.name.charAt(0).toUpperCase()}</div>
        <div className="info">
          <div className="name">{contact.name}</div>
          <div className="phone">{contact.phone}</div>
        </div>
      </div>

      <div className="actions">
        <button onClick={handleCallPopup}>Call</button>
        <button onClick={() => onEdit(contact)}>Edit</button>
        <button
          onClick={() => {
            if (window.confirm('Delete contact?')) onDelete(contact.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
