import React from 'react';
import ContactItem from './ContactItem';


export default function ContactList({ contacts, onEdit, onDelete }) {
if (!contacts || contacts.length === 0) {
return <div className="empty">No contacts found. Add one!</div>;
}


return (
<div className="list card">
{contacts.map((c) => (
<ContactItem key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} />
))}
</div>
);
}