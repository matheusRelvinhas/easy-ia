import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import MyContext from '../../Context/MyContext';
import Loading from '../Loading/Loading';
import './Chat.css';

const Chat = () => {
  const {
    prompt,
    chatMessages,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    loading,
    showMessage,
    handlePersonaButtonClick,
    personaBot,
    dataCss
  } = useContext(MyContext);

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-messages">
          {chatMessages.map((message, index) => {
            const isChatBotMessage = message.startsWith(personaBot.personaName);
            const messageContainerClass = isChatBotMessage
              ? 'chat-message-container chat-box-message-container'
              : 'chat-message-container';
            const messageClass = isChatBotMessage
              ? 'chat-message chat-bot-message'
              : 'chat-message';
            if (message.startsWith(personaBot.personaName)) {
              message = message.substring(`${personaBot.personaName}:`.length);
            }
            return (
              <div className={messageContainerClass} key={index}>
                <pre className={messageClass}>
                  <ReactMarkdown>{message}</ReactMarkdown>
                </pre>
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
          style={{boxShadow: dataCss.boxShadowFooter}}
          type="text"
          value={prompt}
          onKeyDown={handleKeyDown}
          placeholder="send message"
          required
          onChange={handleInputChange}
        />
        <div className="button-chat-container" >
          <button
            className="button-persona"
            type="button"
            onClick={handlePersonaButtonClick}
            style={{boxShadow: dataCss.boxShadowFooter}}
          >
            <span>Persona</span>
          </button>
          <button className="button-chat" type="submit">
            <span>Send</span>
          </button>
        </div>
      </form>
      {showMessage && (
        <div className="message-container">
          <div className="message-text">Escreva algo</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
