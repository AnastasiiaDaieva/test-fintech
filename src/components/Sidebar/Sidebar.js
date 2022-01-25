import s from './Sidebar.module.scss';

function Sidebar({ switchTab }) {
  return (
    <div className={s.Sidebar}>
      <button
        type="button"
        id="all"
        onClick={switchTab}
        className={s.Sidebar__all}
      >
        All Users
      </button>
      <button
        type="button"
        id="selected"
        onClick={switchTab}
        className={s.Sidebar__select}
      >
        Selected Users
      </button>
    </div>
  );
}

export default Sidebar;
