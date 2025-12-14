import { useEffect, useState } from "react";
import API from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // FETCH CONTACTS
  const loadContacts = () => {
    API.get("/contacts")
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // ADD or UPDATE
  const saveContact = (contact) => {
    if (contact.id) {
      // UPDATE
      API.put(`/contacts/${contact.id}`, contact)
        .then(loadContacts);
    } else {
      // ADD
      API.post("/contacts", contact)
        .then(loadContacts);
    }
    setEditing(null);
  };

  // DELETE
  const deleteContact = (id) => {
    if (!window.confirm("Delete contact?")) return;
    API.delete(`/contacts/${id}`)
      .then(loadContacts);
  };

const filteredContacts = contacts
  .filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )
  .sort((a, b) => a.name.localeCompare(b.name));


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
        editingContact={editing}
        onCancel={() => setEditing(null)}
      />

      <ContactList
        contacts={filteredContacts}
        onEdit={setEditing}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
