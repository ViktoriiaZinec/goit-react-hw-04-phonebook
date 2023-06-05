import { useEffect, useState } from 'react';
import { AddContacts } from './AddContacts/AddContacts';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filterName, setFilterName] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createUser = (name, number) => {
    const newUser = {
      name,
      number,
      id: nanoid(),
    };

    const isExist = (name, number, contacts) => {
      return contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
    };
    // console.log('contacts', contacts, typeof contacts);

    if (isExist(name, number, contacts)) {
      return alert(name + ' is already in contact list');
    }

    setContacts([...contacts, newUser]);
  };

  const deleteUser = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const createFilter = filter => {
    setFilterName(filter);
  };
  const filteredContacts =
    contacts &&
    contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(filterName.toLowerCase().trim())
    );

  return (
    <div>
      <h1>Phonebook</h1>
      <AddContacts createUser={createUser} />
      <h2>Contacts</h2>
      <Filter setFilter={createFilter} filterName={filterName} />
      <ContactsList contacts={filteredContacts} deleteUser={deleteUser} />
    </div>
  );
};
