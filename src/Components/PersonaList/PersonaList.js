import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import './PersonaList.css';

const PersonaList = () => {
  const {
    personaBot,
    personaList,
    showPersonaList,
    handlePersonaListCloseClick,
    handleDeletePersona,
    handleChosenPersona,
    handleEditPersona,
  } = useContext(MyContext);

  return (
    <>
      {showPersonaList && (
        <div className="persona-list-container">
          <div className="close" onClick={handlePersonaListCloseClick}>
            x
          </div>
          <h2 className="h2">Lista de Personagens</h2>
          <div className="persona-list">
            <div className="persona-card">
              <div className="container-persona-info">
                <div className="container-persona-name">
                  <h2>{personaBot.personaName}</h2>
                  <span>{personaBot.profession}</span>
                </div>
                <>
                  <span className="description-persona">
                    {personaBot.descriptionPersona}
                  </span>
                </>
              </div>
              <div className="container-button-persona-list">
                <button
                  className="button-persona-list"
                  onClick={() => handleChosenPersona(null, true)}
                >
                  <span>Escolher</span>
                </button>
              </div>
            </div>
            {personaList.map((persona, index) => (
              <div className="persona-card" key={index}>
                <div className="container-persona-info">
                  <div className="container-persona-name">
                    <h2>{persona.personaName}</h2>
                    <span>{persona.profession}</span>
                  </div>
                  <>
                    <span className="description-persona">
                      {persona.descriptionPersona}
                    </span>
                  </>
                </div>
                <div className="container-button-persona-list">
                  <button
                    className="button-persona-list"
                    onClick={() => handleChosenPersona(index, false)}
                  >
                    <span>Escolher</span>
                  </button>
                  <button
                    className="button-persona-list"
                    onClick={() => handleEditPersona(index)}
                  >
                    <span>Editar</span>
                  </button>
                  <button
                    className="button-persona-list"
                    onClick={() => handleDeletePersona(index, false)}
                  >
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PersonaList;
