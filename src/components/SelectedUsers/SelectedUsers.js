import { useEffect } from 'react';

function SelectedUsers({ selected, onDelete, showDetails, onClear }) {
  useEffect(() => {
    window.localStorage.setItem('users', JSON.stringify(selected));
  });

  return (
    <>
      <h2>Selected Users</h2>
      {selected.length > 0 && <button onClick={onClear}>Clear All</button>}
      {selected.map(({ id, login, avatar_url }) => (
        <li key={id}>
          <button onClick={() => onDelete(id)}>Delete user</button>
          <div onClick={() => showDetails(login)}>
            {login}
            <img src={avatar_url} alt={`user ${login}`} width="100" />
          </div>
        </li>
      ))}
    </>
  );
}

export default SelectedUsers;
