import { useState, useEffect } from 'react';
import AllUsers from '../AllUsers/AllUsers';
import SelectedUsers from '../SelectedUsers/SelectedUsers';
import useLocalStorage from '../../hooks/useLocalStorage';

import axios from 'axios';
import { BASE } from '../../api/api';

function Sidebar() {
  const [allIsActiveTab, setActiveTab] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useLocalStorage('users', []);

  useEffect(() => {
    axios.get(BASE).then(response => setAllUsers(response.data));
  }, []);

  const switchTab = e => {
    setActiveTab(`${e.target.id}`);
    e.target.id === 'all' ? setActiveTab(true) : setActiveTab(false);
  };

  const onSelect = user => {
    setSelectedUsers(prev => {
      const newArray = prev.some(id => id === user.id)
        ? [...prev.filter(id => id !== user.id)]
        : [...prev, user];

      return newArray.filter(
        (value, index) => newArray.indexOf(value) === index,
      );
    });

    return selectedUsers;
  };

  const onDelete = userId => {
    setSelectedUsers(prevUsers => prevUsers.filter(({ id }) => id !== userId));
  };

  const clearAll = array => {
    setSelectedUsers([]);
  };

  const showDetails = login => {
    console.log(login);
  };

  return (
    <>
      <aside>
        <h2>Sidebar</h2>
        <ul>
          <button type="button" onClick={switchTab}>
            <li id="all">All Users</li>
          </button>
          <button type="button" onClick={switchTab}>
            <li id="selected">Selected Users</li>
          </button>
        </ul>
      </aside>
      {allIsActiveTab ? (
        <AllUsers
          allUsers={allUsers}
          onSelect={onSelect}
          showDetails={showDetails}
        />
      ) : (
        <SelectedUsers
          selected={selectedUsers}
          onDelete={onDelete}
          onClear={clearAll}
          showDetails={showDetails}
        />
      )}
    </>
  );
}

export default Sidebar;
