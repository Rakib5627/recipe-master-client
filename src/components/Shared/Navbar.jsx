import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user?.photoURL)

    const { signInWithGoogle } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log('User signed in:', result.user);
                // Handle successful login if needed
            })
            .catch(error => {
                console.error('Error during Google sign-in:', error);
                // Handle login error if needed
            });
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('User logged out successfully');
                // Optionally, perform any cleanup or navigation after logout
            })
            .catch(error => {
                console.error('Error during logout:', error);
                // Handle logout error if needed
            });
    };

    const navLinksLoggedOut = <>
        <li className=""><NavLink to="/">Home</NavLink></li>
        <li className=""><NavLink to="/recipes">Recipes</NavLink></li>
        <li className=""><button onClick={handleGoogleLogin}>Google Login</button></li>
    </>;

    const navLinksLoggedIn = <>
        <li className=""><NavLink to="/">Home</NavLink></li>
        <li className=""><NavLink to="/recipes">Recipes</NavLink></li>
        <li className=""><NavLink to="/add-recipes">Add Recipes</NavLink></li>
        <li className=""><NavLink to="/coins">Coins</NavLink></li>
        <li className=""><button onClick={handleLogout}>Logout</button></li>
    </>;

    return (
        <div className="navbar bg-my-pink rounded-b-lg text-my-blue">
            <div className="navbar-start">
                <Link className="normal-case text-base md:text-3xl font-bold">Recipe Master</Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="lg:hidden">
                        {
                            user ?
                            <> <img src={user?.photoURL} alt="User" className="w-8 h-8 rounded-full" /></> :
                                <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg></> 
                                
                        }
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {user ? navLinksLoggedIn : navLinksLoggedOut}
                    </ul>
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {user ?
                            <> {navLinksLoggedIn}
                                <img src={user?.photoURL} alt="User" className="w-8 h-8 rounded-full" />


                            </>
                            : navLinksLoggedOut}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;