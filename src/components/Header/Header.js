import Sidebar from '../Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import AllUsers from '../AllUsers/AllUsers';
import SelectedUsers from '../SelectedUsers/SelectedUsers';
import axios from 'axios';
import { BASE } from '../../api/api';
import s from './Header.module.scss';

function Header() {
  const [allIsActiveTab, setActiveTab] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useLocalStorage('users', []);
  const [filter, setFilter] = useState('');

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

  const clearAll = () => {
    setSelectedUsers([]);
  };

  const getVisibleUsers = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    if (allIsActiveTab) {
      return allUsers.filter(
        user =>
          user.login.toLowerCase().includes(normalizedFilter) ||
          user.id.toString().includes(filter.trim()),
      );
    } else {
      return selectedUsers.filter(
        user =>
          user.login.toLowerCase().includes(normalizedFilter) ||
          user.id.toString().includes(filter.trim()),
      );
    }
  };

  const visibleUsers = getVisibleUsers();

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <>
      <header className={s.Header}>
        <input
          type="text"
          placeholder="Filter..."
          onChange={changeFilter}
          className={s.Header__filter}
        />
      </header>
      <main className={s.Main}>
        <Sidebar switchTab={switchTab} />
        {allIsActiveTab ? (
          <AllUsers allUsers={visibleUsers} onSelect={onSelect} />
        ) : (
          <SelectedUsers
            selected={visibleUsers}
            onDelete={onDelete}
            onClear={clearAll}
          />
        )}
      </main>
    </>
  );
}

export default Header;
