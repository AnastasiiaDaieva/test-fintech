import s from './AddInfo.module.scss';

function AddInfo(user) {
  const {
    followers,
    following,
    location,
    name,
    public_repos,
    blog,
    created_at,
  } = user;
  return (
    <>
      <div className={s.AddInfo__followers}>
        <span>{`Followers: ${followers}`}</span>{' '}
        <span>{`Following: ${following}`}</span>
      </div>
    </>
  );
}

export default AddInfo;
