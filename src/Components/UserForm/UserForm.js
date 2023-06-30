import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import ClosedCaption from '../ClosedCaption/ClosedCaption';
import './UserForm.css';

const UserForm = () => {
  const {
    showUserForm,
    handleUserCloseClick,
    userName,
    savedUser,
    setUserName,
    handleSubmitUser,
    userKey,
    savedKey,
    setUserKey,
    handleSubmitKey,
    showError,
    errorMessage,
    handleErrorCloseClick,
  } = useContext(MyContext);

  return (
    <>
      {showUserForm && (
        <div className="form-user-container">
          <div className="close" onClick={handleUserCloseClick}>
            x
          </div>
          <form className="form-user-name" onSubmit={handleSubmitUser}>
            <label>
              <strong>User Name</strong>
            </label>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder={savedUser}
              required
            />
            <button className="button-user" type="submit">
              <span>Send user name</span>
            </button>
          </form>
          <form className="form-user-key" onSubmit={handleSubmitKey}>
            <label className="user-key">
              <ClosedCaption text="" />
              <a
                href="https://platform.openai.com/account/api-keys"
                target="blank"
              >
                <strong>User Key</strong>
              </a>
              <ClosedCaption text="Click no link e gere sua key, será salva em local storage, não compartilhe com ninguém, se tiver com problemas na key gera uma nova no link e atualize aqui" />
            </label>
            <input
              type="text"
              value={userKey}
              onChange={(event) => setUserKey(event.target.value)}
              placeholder={savedKey}
              required
            />
            <button className="button-user" type="submit">
              <span>Send user key</span>
            </button>
          </form>
        </div>
      )}
      {showError && (
        <div className="error-container">
          <div className="close" onClick={handleErrorCloseClick}>
            x
          </div>
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default UserForm;
