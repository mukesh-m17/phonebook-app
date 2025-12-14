function ContactItem({ contact, onEdit, onDelete }) {
  const firstLetter = contact.name
    ? contact.name.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="contact-item">
      {/* AVATAR */}
      <div className="avatar">
        {firstLetter}
      </div>

      {/* INFO */}
      <div className="contact-info">
        <strong>{contact.name}</strong>
        <p>{contact.phone}</p>
      </div>

      {/* ACTIONS */}
      <div className="contact-actions">
        <a href={`tel:${contact.phone}`} className="call-btn">
          Call
        </a>

        <button className="edit-btn" onClick={() => onEdit(contact)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactItem;
