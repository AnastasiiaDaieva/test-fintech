import AllUsersCard from './AllUsersCard';

function AllUsers({ onSelect, allUsers, showDetails }) {
  return (
    <>
      <h2>All Users</h2>
      <ul>
        {allUsers.map(user => (
          <AllUsersCard
            key={user.id}
            user={user}
            onSelect={() => onSelect(user)}
            showDetails={() => showDetails}
          />
        ))}
      </ul>
    </>
  );
}

export default AllUsers;
