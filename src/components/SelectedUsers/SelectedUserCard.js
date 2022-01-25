import s from './SelectedUserCard.module.scss';

function SelectedUserCard({ id, login, photo, onDelete }) {
  return (
    <li key={id} className={s.SelectedUserCard__item}>
      <div className={s.SelecteduserCard__main}>
        {login}
        <img
          src={photo}
          alt={`user ${login}`}
          className={s.SelectedUserCard__photo}
        />
      </div>
      <button
        onClick={() => onDelete(id)}
        className={s.SelectedUserCard__delete}
      >
        Delete user
      </button>
    </li>
  );
}

export default SelectedUserCard;
