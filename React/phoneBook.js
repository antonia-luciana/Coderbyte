import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

const initialEntryState = {
  userFirstname: "Coder",
  userLastname: "Byte",
  userPhone: "8885559999",
};
const resetEntryState = {
  userFirstname: "",
  userLastname: "",
  userPhone: "",
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  let [entry, setEntry] = useState(initialEntryState);

  const handleChange = e => {
      setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    addEntryToPhoneBook(entry);
    setEntry(resetEntryState);
  }
  
  return (
    <form onSubmit={onSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        value={entry.userFirstname}
        onChange={handleChange}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        value={entry.userLastname}
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        value={entry.userPhone}
        onChange={handleChange}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable({entries}) {
  console.log("DISPLAY", entries);
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
          { entries.map(({userFirstname, userLastname, userPhone}, index) => 
            <tr key={index}>
              <td style={style.tableCell}>{userFirstname}</td>
              <td style={style.tableCell}>{userLastname}</td>
              <td style={style.tableCell}>{userPhone}</td>
            </tr>)
          }
        </tbody> 
    </table>
  );
}

function Application(props) {
  const [entries, setEntries] = useState([]);

  const addEntryToPhoneBook = (entry) => {
    const newEntries = [
      ...entries,
      entry,
    ].sort((a, b) => {
            const userLastnameA = a.userLastname.toLowerCase()
            const userLastnameB = b.userLastname.toLowerCase()
            return userLastnameA < userLastnameB
                ? -1
                : userLastnameA > userLastnameB
                ? 1
                : 0
        }
    );
    setEntries(newEntries);
    console.log("HERE", newEntries, entries);
  }
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook}/>
      <InformationTable entries={entries}/>
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);