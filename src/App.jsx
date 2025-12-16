import { useEffect, useState } from "react";
import API from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactItem from "./components/ContactItem"

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);
  const loadContacts = async () => {
  try {
    const res = await API.get("/contacts");

    const sortedContacts = res.data.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    setContacts(sortedContacts);
  } catch (error) {
    console.error(error);
  }
};
const addContact = async (contact) => {
  // normalize values
  const name = contact.name.trim().toLowerCase();
  const phone = contact.phone.trim();

  // check duplicate
  const exists = contacts.some(
    c =>
      c.name.trim().toLowerCase() === name &&
      c.phone.trim() === phone
  );

  if (exists) {
    alert("⚠️ Contact already exists");
    return;
  }

  // add if not duplicate
  const res = await API.post("/contacts", {
    ...contact,
    blocked: false,
  });

  const sorted = [...contacts, res.data].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  setContacts(sorted);
};
  const saveContact = (contact) => {
    if (contact.id) {
      API.put(`/contacts/${contact.id}`, contact)
        .then(loadContacts);
    } else {
      API.post("/contacts", contact)
        .then(loadContacts);
    }
    setEditing(null);
  };

  const deleteContact = (id) => {
    if (!window.confirm("Delete contact?")) return;
    API.delete(`/contacts/${id}`)
      .then(loadContacts);
  };

const handleBlock = (contact) => {
  setContacts((prev) =>
    prev.map((c) =>
      c.id === contact.id
        ? { ...c, blocked: !c.blocked }
        : c
    )
  );
};

  return (
    <div className="app">
      <h1>📞 Phone Book</h1>

      <input className="search-input"
        placeholder="Search by name or phone"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ContactForm
        onSave={saveContact}
        onAdd={addContact}
        editingContact={editing}
        onCancel={() => setEditing(null)}
      />

      {contacts.map((contact) => (
        <ContactItem
        key={contact.id}
        contact={contact}
        onEdit={setEditing}
        onDelete={deleteContact}
        onBlock={handleBlock} 
  />
))}
    </div>
  );
}

export default App;