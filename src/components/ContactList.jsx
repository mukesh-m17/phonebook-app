import ContactItem from "./ContactItem";

function ContactList({ contacts, onEdit, onDelete, onBlock }) {
  if (contacts.length === 0) {
    return <p>No contacts found</p>;
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ContactList;
