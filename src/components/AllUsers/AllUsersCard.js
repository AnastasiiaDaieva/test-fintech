import axios from 'axios';
import { BASE } from '../../api/api';
import { useState } from 'react';
import s from './AllUsersCard.module.scss';
import { BsBookmarkCheck } from 'react-icons/bs';

function AllUsersCard({ user, onSelect }) {
  const [currentUser, setCurrentUser] = useState(null);
  const selectUser = user => {
    onSelect(user);
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
  };

  return (
    <li className={s.AllUsersCard__item}>
      <div
        onClick={() => getCurrentUser(user)}
        className={s.AllUsersCard__main}
      >
        <span className={s.AllUsersCard__login}>{user.login}</span>
        <img
          src={user.avatar_url}
          alt={`user ${user.login}`}
          className={s.AllUsersCard__photo}
        />
      </div>
      {currentUser && (
        <div className={s.AllUsersCard__add}>
          {currentUser.name && <p> {currentUser.name}</p>}

          {currentUser.public_repos > 0 && (
            <p>{currentUser.public_repos} public repositories</p>
          )}

          <p>Followers: {currentUser.followers}</p>
          <p>Following: {currentUser.following}</p>
          {currentUser.location && <p>From: {currentUser.location}</p>}
          <p className={s.AllUsersCard__github}>
            <a href={currentUser.html_url}> GitHub</a>
          </p>
          {currentUser.blog && (
            <p className={s.AllUsersCard__blog}>
              <a href={currentUser.blog}>Blog</a>
            </p>
          )}
        </div>
      )}
      <button
        onClick={() => selectUser(user)}
        className={s.AllUsersCard__select}
      >
        <BsBookmarkCheck />{' '}
      </button>
    </li>
  );
}

export default AllUsersCard;
