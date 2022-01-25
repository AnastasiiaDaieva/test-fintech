import AllUsersCard from './AllUsersCard';
import s from './AllUsers.module.scss';

function AllUsers({ onSelect, allUsers }) {
  return (
    <div className={s.AllUsers}>
      <h2>All Users</h2>
      <ul className={s.AllUsers__list}>
        {allUsers.map(user => (
          <AllUsersCard
            key={user.id}
            user={user}
            onSelect={() => onSelect(user)}
          />
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
