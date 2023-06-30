import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import './PersonaForm.css';

const PersonaForm = () => {
  const {
    showPersonaForm,
    handlePersonaCloseClick,
    personaForm,
    setPersonaForm,
    handleSubmitPersona,
    handlePersonaListButtonClick,
  } = useContext(MyContext);
  
  return (
    <>
      {showPersonaForm && (
        <div className="form-persona-container div-shadow">
          <div className="close" onClick={handlePersonaCloseClick}>
            x
          </div>
          <span>Crie ou</span><button className="button-persona-form" onClick={handlePersonaListButtonClick}><span>Edite</span></button><span>um personagem</span>
          <form className="form-persona" onSubmit={handleSubmitPersona}>            
            <input
              type="text"
              value={personaForm.personaName}
              onChange={(event) => setPersonaForm({ ...personaForm, personaName: event.target.value })}
              placeholder='Nome, ex: Gandalf'
              required
            />
            <input
              type="text"
              value={personaForm.profession}
              onChange={(event) => setPersonaForm({ ...personaForm, profession: event.target.value })}
              placeholder='Oque ele é ou faz, ex: Mago'
              required
            />
            <input
              type="text"
              value={personaForm.humor}
              onChange={(event) => setPersonaForm({ ...personaForm, humor: event.target.value })}
              placeholder='Humor, ex: Alegre'
            />
            <input
              type="text"
              value={personaForm.local}
              onChange={(event) => setPersonaForm({ ...personaForm, local: event.target.value })}
              placeholder='Aonde ele está?, ex: Minas Tirith'
            />
            <input
              type="text"
              value={personaForm.descriptionPersona}
              onChange={(event) => setPersonaForm({ ...personaForm, descriptionPersona: event.target.value })}
              placeholder='Descrição do personagem, ex: Gandalf é um poderoso mago, sábio e guerreiro, conhecido por seu chapéu cinzento.'
              required
           />
            <button className="button-persona-form" type="submit">
              <span>Send persona</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PersonaForm;
