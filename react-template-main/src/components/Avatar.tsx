import { User } from "firebase/auth";
import { Link } from "react-router-dom";

type AvatarProps = {
  user: User;
  logOut: () => Promise<void>;
};

export default function Avatar({ user, logOut }: AvatarProps) {
  const photoUrl = user
    ? user.photoURL || "https://www.svgrepo.com/show/514283/user.svg"
    : "https://www.svgrepo.com/show/514283/user.svg";

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
        <div className='w-10 rounded-full'>
          <img src={photoUrl} alt='User Avatar' />
        </div>
      </label>
      <ul
        tabIndex={0}
        className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box'
      >
        <li>
          <a style={{ display: "block", width: "100%" }}>
            <p>Logged in as</p>
            <p>
              <b>{user.email}</b>
            </p>
          </a>
        </li>
        <div className='divider' style={{ margin: "0.1em 0" }}></div>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
        <li>
          <a onClick={logOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
