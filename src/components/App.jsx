import { useEffect, useState } from 'react';
import { AddContacts } from './AddContacts/AddContacts';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (contacts.length === 0) {
      console.log('use c', contacts);
      const newContactsJSON = localStorage.getItem('contacts');
      try {
        const newContacts = JSON.parse(newContactsJSON);
        if (newContacts !== '') {
          console.log(
            'newContacts :>> ',
            newContacts,
            typeof newContacts,
            '',
            newContacts === '""'
          );
          setContacts(newContacts);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const createUser = (name, number) => {
    const newUser = {
      name,
      number,
      id: nanoid(),
    };
    console.log('createUser', name, number);

    const isExist = (name, number, contacts) => {
      console.log(contacts);
      return contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
    };
    console.log('contacts', contacts, typeof contacts);

    if (isExist(name, number, contacts)) {
      return alert(name + ' is already in contact list');
    }

    setContacts([...contacts, newUser]);
  };

  const deleteUser = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
    console.log('id2 :>> ', id);
  };

  const createFilter = filter => {
    setFilterName(filter);
  };
  const filteredContacts =
    contacts &&
    contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(filterName.toLowerCase().trim())
    );

  // http://localhost:3000/goit-react-hw-04-phonebook
  return (
    <div>
      <h1>Phonebook</h1>
      <AddContacts createUser={createUser} />
      <h2>Contacts</h2>
      <Filter setFilter={createFilter} />
      <ContactsList contacts={filteredContacts} deleteUser={deleteUser} />
    </div>
  );
};
