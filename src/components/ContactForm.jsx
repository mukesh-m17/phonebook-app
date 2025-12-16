import { useEffect, useState } from "react";

function ContactForm({ onSave, editingContact, onCancel, onAdd}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

useEffect(() => {
  if (!editingContact) return;

  setName(editingContact.name || "");
  setPhone(editingContact.phone || "");
}, [editingContact]);
 const handleSubmit = () => {
    onAdd({ name, phone });
  };


  const submit = () => {
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      id: editingContact?.id,
      name,
      phone,
    });

    setName("");
    setPhone("");
  };

  return (
    <div className="formdiv">
      <h3>{editingContact ? "Edit Contact" : "Add Contact"}</h3><br></br>

      <input
  type="text"
  placeholder="Name"
  className="form-input"
  value={name}
  onChange={(e) => setName(e.target.value)}
/><br></br>

<input
  type="tel"
  placeholder="Phone Number"
  className="form-input"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
      <button onClick={submit} className="btn">
        {editingContact ? "Update" : "Add"}
      </button>

      {editingContact && (
        <button onClick={onCancel} className="btn">Cancel</button>
      )}
    </div>
  );
}

export default ContactForm;
