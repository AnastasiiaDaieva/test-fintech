import { useEffect } from 'react';
import SelectedUserCard from './SelectedUserCard';
import s from './SelectedUsers.module.scss';

function SelectedUsers({ selected, onDelete, onClear }) {
  useEffect(() => {
    window.localStorage.setItem('users', JSON.stringify(selected));
  });

  return (
    <>
      {selected?.length > 0 ? (
        <div className={s.SelectedUsers}>
          <h2>Selected Users</h2>
          {selected.length > 0 && (
            <button onClick={onClear} className={s.SelectedUsers__clear}>
              Clear All
            </button>
          )}
          <ul className={s.SelectedUsers__list}>
            {selected.map(({ id, login, avatar_url }) => (
              <SelectedUserCard
                key={id}
                id={id}
                login={login}
                photo={avatar_url}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className={s.SelectedUsers__notification}>No selected users yet</p>
      )}
    </>
  );
}

export default SelectedUsers;
