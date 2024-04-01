import "./Login.css";
import { useRef } from "react";
import { auth } from "../src/config-firebase/data";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const Login = () => {
  const containerRef = useRef<any>(null);
  const handleLogin = () => {
    containerRef.current?.classList.add("active");
  };

  const handleRegister = () => {
    containerRef.current?.classList.remove("active");
  };

  //login google
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // setUser(user);
        console.log(user);
        alert("đăng nhập thành công");
      })
      .catch((error) => {
        console.log("error", error);
      });

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("đăng xuất thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='body'>
        <div className='container' id='container' ref={containerRef}>
          <div className='form-container sign-up'>
            <form>
              <h1>Create Account</h1>
              <div className='social-icons'>
                <a onClick={handleGoogleSignIn} className='icon'>
                  <i className='fa-brands fa-google-plus-g' />
                </a>
                <a onClick={handleGoogleSignOut} className='icon'>
                  <i className='fas fa-sign-out-alt'></i>
                </a>
                <a href='#' className='icon'>
                  <i className='fa-brands fa-facebook-f' />
                </a>
                <a href='#' className='icon'>
                  <i className='fa-brands fa-github' />
                </a>
                <a href='#' className='icon'>
                  <i className='fa-brands fa-linkedin-in' />
                </a>
              </div>
              <span>or use your email for registeration</span>
              <input type='text' placeholder='Name' />
              <input type='email' placeholder='Email' />
              <input type='password' placeholder='Password' />
              <button>Sign Up</button>
            </form>
          </div>
          <div className='form-container sign-in'>
            <form>
              <h1>Sign In</h1>
              <div className='social-icons'>
                <a onClick={handleGoogleSignIn} className='icon'>
                  <i className='fa-brands fa-google-plus-g' />
                </a>
                <a onClick={handleGoogleSignOut} className='icon'>
                  <i className='fas fa-sign-out-alt'></i>
                </a>
                <a href='#' className='icon'>
                  <i className='fa-brands fa-facebook-f' />
                </a>
                <a href='#' className='icon'>
                  <i className='fa-brands fa-github' />
                </a>
                <a href='#' className='icon'></a>
                <i className='fa-brands fa-linkedin-in' />
                </a>
              </div>
              <span>or use your email password</span>
              <input type='email' placeholder='Email' />
              <input type='password' placeholder='Password' />
              <a href='#'>Forget Your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className='toggle-container'>
            <div className='toggle'>
              <div className='toggle-panel toggle-left'>
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className='hidden' id='login' onClick={handleRegister}>
                  Sign In
                </button>
              </div>
              <div className='toggle-panel toggle-right'>
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button className='hidden' id='register' onClick={handleLogin}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;