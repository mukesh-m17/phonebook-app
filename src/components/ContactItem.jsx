function ContactItem({ contact, onEdit, onDelete, onBlock }) {
  const isBlocked = contact.blocked;

  const callPerson = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const sendWhatsApp = () => {
    const phone = contact.phone.replace(/\D/g, "");
    const message = `Hi ${contact.name},`;
    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const sendSMS = () => {
    window.location.href = `sms:${contact.phone}`;
  };

  const handleMessage = (e) => {
    const value = e.target.value;
    if (value === "whatsapp") sendWhatsApp();
    if (value === "sms") sendSMS();
    e.target.value = ""; // reset dropdown
  };

  return (
    <div className="contact-item">
      <div className="avatar">{contact.name[0]}</div>

      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
      </div>
      <div className="contact-actions">
        <button
          disabled={isBlocked}
          onClick={callPerson}
          className="call-btn"
        >
          Call
        </button>

        <select
          disabled={isBlocked}
          onChange={handleMessage}
          className="msg-select"
        >
          <option value="">Msg </option>
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
        </select>

        <button onClick={() => onEdit(contact)} className="edit-btn" disabled={isBlocked}>
          Edit
        </button>

        <button onClick={() => onDelete(contact.id)} className="delete-btn">
         Delete
        </button>
        <div className="Blockbtn-div">
          <button
          className={isBlocked ? "unblock-btn" : "block-btn"}
          onClick={() => onBlock(contact)}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
