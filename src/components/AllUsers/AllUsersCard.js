import axios from 'axios';
import { BASE } from '../../api/api';
import { useEffect, useState } from 'react';
import AddInfo from '../AddInfo/AddInfo';
import timeSince from '../../functions/timeSince';

function AllUsersCard({ user, onSelect, showDetails }) {
  const [currentUser, setCurrentUser] = useState(null);
  //   useEffect(() => {
  //     axios
  //       .get(`${BASE}/${login}`)
  //       .then(response => setCurrentUser(response.data));
  //     console.log(currentUser);
  //   }, []);

  const selectUser = user => {
    console.log(user);
    // selectedUsers.push(id);
    // console.log('before:', selectedUsers);
    onSelect(user);
    // console.log('after:', selectedUsers);
  };

  const getCurrentUser = user => {
    axios
      .get(`${BASE}/${user.login}`)
      .then(response =>
        setCurrentUser(prevCurrentUser =>
          prevCurrentUser?.id === response.data.id
            ? setCurrentUser(null)
            : setCurrentUser(response.data),
        ),
      );
    console.log(currentUser);
  };

  return (
    <li>
      <button onClick={() => selectUser(user)}>Select user</button>
      <div onClick={() => getCurrentUser(user)}>
        <p>{user.login}</p>
        <img src={user.avatar_url} alt={`user ${user.login}`} width="100" />
      </div>
      {currentUser && (
        <div>
          <p>{currentUser.name}</p>
          <span>{`Followers: ${currentUser.followers}`}</span>
          <span>{`Following: ${currentUser.following}`}</span>
          <p>{`From: ${currentUser.location}`}</p> public_repos,{' '}
          <p>
            Blog:
            <a href={currentUser.blog}>{`${currentUser.blog}`}</a>
          </p>
        </div>
      )}
    </li>
  );
}

export default AllUsersCard;
