import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";

export default function Navbar() {
  const { user, logOut } = useAuth();
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>React Template</a>
      </div>
      <div className='flex-none gap-2'>
        {user && <Avatar user={user} logOut={logOut}/>}
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
