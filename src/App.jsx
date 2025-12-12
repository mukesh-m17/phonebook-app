import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactItem from "./components/ContactItem";
import './index.css';

function App() {
  const [contacts, setContacts] = useLocalStorage('pb_contacts', []);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');

  // Save or update a contact
  const handleSave = (contact) => {
    setContacts((prev) => {
      // Check if contact already exists
      const exists = prev.find((p) => p.id === contact.id);
      if (exists) {
        // Update existing contact
        return prev.map((p) => (p.id === contact.id ? contact : p));
      }
      // Add new contact
      return [contact, ...prev];
    });
    setEditing(null);
  };

  // Delete contact
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((p) => p.id !== id));
  };

  // Edit contact
  const handleEdit = (contact) => setEditing(contact);

  // Cancel editing
  const handleCancelEdit = () => setEditing(null);

  // Filter contacts based on search query

  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  // 1. Sort alphabetically by name
  const sorted = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // 2. Apply search filter
  if (!q) return sorted;

  return sorted.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
  );
}, [contacts, query]);

  return (
    <div className="app-root">
      <div className="container">
        <header className="header">
          <h1>Phone Book</h1>
          <div className="header-controls">
            <input
              placeholder="Search by name or phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="count">{contacts.length} contacts</div><br></br>
        </header>

        <main className="grid-two">
          <ContactForm
            onSave={handleSave}
            editingContact={editing}
            onCancel={handleCancelEdit}
          /><br></br><br></br><br></br>

          <div>
            <ContactList
              contacts={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
