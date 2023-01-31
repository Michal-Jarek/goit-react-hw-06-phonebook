import { useState } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import SignForm from './SignForm/SignForm';
import UserList from './UserList/UserList';
import Filter from './Filter/Filter';
import { setFilter } from 'redux/contactsSlice';
import { useDispatch } from 'react-redux';


const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, handleContacts] = useState(
    JSON.parse(localStorage.getItem('Contacts')) || [...INITIAL_CONTACTS]
  );

  // ********************* Refactored Methods **************
 const dispatch = useDispatch();
  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleSubmit = ({ name, number }) => {
    const contactCopy = [...contacts];
    if (
      contactCopy.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    contactCopy.push({
      name: name,
      number: number,
      id: nanoid(),
    });
    handleContacts([...contactCopy]);
    console.log(`Signed up as: ${name}`);
  };

  // ********************* End Methods **************

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
        alignItems: 'flex-start',
        fontSize: 40,
        color: '#010101',
        backgroundColor: '#e6e3e3',
      }}
    >
      <Section title="Phonebook">
        <SignForm handleSubmit={handleSubmit} />
      </Section>

      <Section title="Contacts">
        <UserList>
          <Filter handleChange={handleChange} />
        </UserList>
      </Section>
    </div>
  );
};
