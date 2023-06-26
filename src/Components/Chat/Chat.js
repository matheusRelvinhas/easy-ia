import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import ClosedCaption from '../ClosedCaption/ClosedCaption';
import Loading from '../Loading/Loading';
import './Chat.css';

const Chat = () => {
  const {
    chatMessages,
    loading,
    handleSubmit,
    handleInputChange,
    prompt,
    showMessage,
    handleKeyDown,
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
    handleErrorCloseClick
  } = useContext(MyContext);

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-messages">
          {chatMessages.map((message, index) => {
            const isChatBotMessage = message.startsWith('ChatBot');
            const messageContainerClass = isChatBotMessage
              ? 'chat-message-container chat-box-message-container'
              : 'chat-message-container';
            const messageClass = isChatBotMessage
              ? 'chat-message chat-bot-message'
              : 'chat-message';
            return (
              <div className={messageContainerClass} key={index}>
                <pre className={messageClass}>{message}</pre>
              </div>
            );
          })}
        </div>
        {loading && (
          <>
            <Loading />
          </>
        )}
      </div>
      <form className="chat-input-container" onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={prompt}
          onKeyDown={handleKeyDown}
          placeholder="send message"
          required
          onChange={handleInputChange}
        />
        <div className="sidebar"></div>
        <button type="submit" className="btn">
          <strong>Send</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      </form>
      {showMessage && (
        <div className="message-container">
          <div className="message-text">Escreva algo</div>
        </div>
      )}
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
            <button className="btn-header" type="submit">
              <strong>Send user name</strong>
              <div id="container-stars-header">
                <div id="stars-header"></div>
              </div>
              <div id="glow-header">
                <div className="circle-header"></div>
                <div className="circle-header"></div>
              </div>
            </button>
          </form>
          <form className="form-user-key" onSubmit={handleSubmitKey}>
            <label className='user-key'>
              <ClosedCaption text="" />
              <a
                href="https://platform.openai.com/account/api-keys"
                target="blank"
              >
                <strong>User Key</strong>
              </a>
              <ClosedCaption text='Click no link e gere sua key, será salva em local storage, não compartilhe com ninguém, se tiver com problemas na key gera uma nova no link e atualize aqui'/>
            </label>
            <input
              type="text"
              value={userKey}
              onChange={(event) => setUserKey(event.target.value)}
              placeholder={savedKey}
              required
            />
            <button className="btn-header" type="submit">
              <strong>Send user key</strong>
              <div id="container-stars-header">
                <div id="stars-header"></div>
              </div>
              <div id="glow-header">
                <div className="circle-header"></div>
                <div className="circle-header"></div>
              </div>
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
    </div>
  );
};

export default Chat;
