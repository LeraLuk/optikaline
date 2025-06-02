import style from "./Account.module.scss";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import { useState, useEffect } from "react";
import PersonAcc from "./PersonAcc/PersonAcc";

function Account() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegisterSuccess = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowRegister(false);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (isLoggedIn && currentUser) {
    return (
      <section className={style.Account}>
        <PersonAcc
          user={currentUser}
          setUser={setCurrentUser}
          onLogout={handleLogout}
        />
      </section>
    );
  }
  return (
    <section className={style.account}>
      {!showRegister ? (
        <>
          <Login onLogin={handleLogin} />
          <button onClick={() => setShowRegister(true)}>
            Зарегистрироваться
          </button>
        </>
      ) : (
        <>
          <Registration
            onRegisterSuccess={handleRegisterSuccess}
            onCancel={() => setShowRegister(false)}
          />
        </>
      )}
    </section>
  );
}

export default Account;
