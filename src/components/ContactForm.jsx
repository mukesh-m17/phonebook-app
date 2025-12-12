import React, { useState } from "react";

const empty = { name: "", phone: "" };

export default function ContactForm({ onSave, editingContact, onCancel }) {
  // initialiser uses editingContact only at mount (remount when key changes)
  const [form, setForm] = useState(() => {
    return editingContact
      ? { name: editingContact.name || "", phone: editingContact.phone || "", id: editingContact.id }
      : empty;
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.name.trim()) return alert('Name is required');
  if (!form.phone.trim()) return alert('Phone is required');

  const payload = {
    ...form,
    name: form.name.trim(),
    phone: form.phone.trim(),
    id: editingContact?.id || Date.now(), // <-- important fix
  };

  onSave(payload);
  setForm(empty);
};


  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>{editingContact ? "Edit Contact" : "Add Contact"}</h3>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
      </label>

      <label>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" />
      </label>

      <div className="form-actions">
        <button type="submit">{editingContact ? "Save" : "Add"}</button>
        {editingContact && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
