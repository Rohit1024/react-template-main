import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logOut } = useAuth();
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>React Template</a>
      </div>
      <div className='flex-none gap-2'>
        {user && (
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img
                  src={
                    user
                      ? user.photoURL!
                      : "https://www.svgrepo.com/show/514283/user.svg"
                  }
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box'
            >
              <li>
                <a style={{ display: 'block', width: '100%' }}>
                  <p>Logged in as</p>
                  <p>
                    <b>{user.email}</b>
                  </p>
                </a>
              </li>
              <div className="divider" style={{ margin: '0.1em 0' }}></div>
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
        )}
        {!user && (
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
