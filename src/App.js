import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyContext from './Context/MyContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Test from './Pages/Test/Test';

function BodyComponent({ backgroundColor, color }) {
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = color;
  return null;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [context, setContext] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.0);
  const [frequency, setFrequency] = useState(0.0);
  const [presence, setPresence] = useState(0.0);
  const [isAnswerEnabled, setIsAnswerEnabled] = useState(false);
  const [answerValue, setAnswerValue] = useState(null);
  const [isTokensEnabled, setIsTokensEnabled] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [contextPrompt, setContextPrompt] = useState('');
  const [showUserForm, setshowUserForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userKey, setUserKey] = useState();
  const [savedUser, setSavedUser] = useState('user');
  const [savedKey, setSavedKey] = useState('clique em User Key e gere sua key e não compatilhe');
  const [showError, setshowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const [showPersonaList, setShowPersonaList] = useState(false);
  const [personaForm, setPersonaForm] = useState({
    personaName: '',
    profession: '',
    humor: '',
    local: '',
    descriptionPersona: ''
  })
  const personaBot = {
    personaName: 'Easy IA',
    profession: 'é um chatbot',
    humor: '',
    local: '',
    descriptionPersona: 'Eu sou um chatbot, sou uma ferramenta de integração ao uso de Inteligência Artificial, facilitando de forma intuitiva a vida do usuário no uso de IA no dia à dia ',
  };
  const [personaList, setPersonaList] = useState([]);
  
  const keyUser = `Bearer ${savedKey}`;
  const systemContent = `Você é ${personaBot.personaName}`
  
  const [persona, setPersona] = useState(personaBot)

  const promptPersona = `responda inicialmente com o seguinte padrão abaixo,
      'Nome o personagem' : 'Fala do personagem'
       exemplo: ${persona.personaName} : Oi tudo bem?
    Com base nessas informações sobre o personagem ${persona.personaName}, que é ${persona.profession}, e também nas informações que vc tem no seu banco de dados desse personagem, simule uma resposta desse personagem, seja fiel ao personagem.
    Informações do personagem: ${persona.descriptionPersona}
    Por favor chat, simula uma resposta para essa pergunta, leve em consideração que, ${persona.humor} , ${persona.local}.`

  const dataCss = {
    primaryColor: '#212121',
    secundaryColor: '#bfbfbf',
    fontColor: '#f0f0f0',
    logoImage: [
      './img/easy-ia-logo.png',
      './img/easy-ia-logo.webp',
      'https://i.postimg.cc/gkryRqsX/easy-ia-logo.png',
      'https://i.postimg.cc/pVsYp1fM/easy-ia-logo.webp',
    ],
  };

  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 1000);
    }
    // Recupera o usuário salvo no Local Storage
    const storedKey = localStorage.getItem('userKey');
    if (storedKey) {
      setSavedKey(storedKey);
    }
    // Recupera o usuário salvo no Local Storage
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setSavedUser(storedUser);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);
  

// funções do chat, butão de envio
  const sendMessage = async () => {
    setLoading(true);
    try {
      const initialPrompt = [
        ...context,
        { role: 'system', content: systemContent },
        { role: 'user', content: promptPersona },
        { role: 'user', content: contextPrompt },
        { role: 'user', content: prompt },
      ];
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: initialPrompt,
          max_tokens: tokenValue,
          n: answerValue,
          frequency_penalty: frequency,
          presence_penalty: presence,
          temperature: temperature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: keyUser,
          },
        }
      );
      const responses = response.data.choices.map((choice) => {
        const responseContent = choice.message.content;
        setContext([
          ...context,
          { role: 'assistant', content: responseContent },
        ]);
        return `${personaBot.personaName}: ${responseContent}`;
      });

      setChatMessages([
        ...chatMessages,
        `${savedUser}: ${prompt}`,
        ...responses,
      ]);
    } catch (error) {
      setshowError(true);
      if (error.response) {
        setErrorMessage(
          `Response status: ${error.response.status}, Response data: ${error.response.data.error.code}`
        );
      } else {
        setErrorMessage(`Error message: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatMessages([...chatMessages, `${savedUser}: ${prompt}`]);
    sendMessage();
    setPrompt('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (prompt.trim() === '') {
        setShowMessage(true);
        event.preventDefault();
      } else {
        handleSubmit(event);
      }
    }
  };

// Funções configuração do chat, temperatura, frequencia, presença, respostas, tokens
  const handleFrequencyChange = (event) => {
    const newFrequency = parseFloat(event.target.value);
    setFrequency(newFrequency);
  };

  const handlePresenceChange = (event) => {
    const newPresence = parseFloat(event.target.value);
    setPresence(newPresence);
  };

  const handleTemperatureChange = (event) => {
    const newTemperature = parseFloat(event.target.value);
    setTemperature(newTemperature);
  };

  const handleAnswerCheckboxChange = () => {
    setIsAnswerEnabled(!isAnswerEnabled);
    if (!isAnswerEnabled) {
      setAnswerValue(null);
    }
  };

  const handleAnswerInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 10) {
      setAnswerValue(10);
    } else if (value < 1) {
      setAnswerValue(1);
    } else {
      setAnswerValue(value);
    }
  };

  const handleTokensCheckboxChange = () => {
    setIsTokensEnabled(!isTokensEnabled);
    if (!isTokensEnabled) {
      setTokenValue(null);
    }
  };

  const handleTokensInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 9999) {
      setTokenValue(9999);
    } else if (value < 1) {
      setTokenValue(1);
    } else {
      setTokenValue(value);
    }
  };

  const handleInputContextChange = (event) => {
    setContextPrompt(event.target.value);
  };
  
  // funções tela User, user e key
  const handleUserButtonClick = () => {
    setshowUserForm(true);
  };

  const handleUserCloseClick = () => {
    setshowUserForm(false);
  };

  const handleSubmitUser = (event) => {
    event.preventDefault();
    // Armazena o nome do usuário no Local Storage
    localStorage.setItem('userName', userName);
    // Atualiza o estado com o nome do usuário
    setSavedUser(userName);
    // Limpa o campo do formulário
    setUserName('');
  };

  const handleSubmitKey = (event) => {
    event.preventDefault();
    // Armazena a key no Local Storage
    localStorage.setItem('userKey', userKey);
    // Atualiza o estado com a key
    setSavedKey(userKey);
    setshowUserForm(false);
    setUserKey('');
  };

  const handleErrorCloseClick = () => {
    setshowError(false);
  };

// funções persona, name, descrição, humor, local, obs
const handlePersonaButtonClick = () => {
  if(showPersonaForm) {
    setShowPersonaForm(false)
  } else if (!showPersonaForm) {
    setShowPersonaForm(true)
  }
};

const handlePersonaCloseClick = () => {
  setShowPersonaForm(false);
};

const handleSubmitPersona = (event) => {
  event.preventDefault();
  const newPersona = {
    personaName: personaForm.personaName,
    profession: personaForm.profession,
    humor: personaForm.humor,
    local: personaForm.local,
    descriptionPersona: personaForm.descriptionPersona,
  };
  setPersonaList([...personaList, newPersona]);
  setPersonaForm({
    personaName: '',
    profession: '',
    humor: '',
    local: '',
    descriptionPersona: ''
  });
  localStorage.setItem('personaList', JSON.stringify([...personaList, newPersona]));
  handlePersonaCloseClick();
};

const handlePersonaListButtonClick = () => {
  setShowPersonaList(true);
};

const handlePersonaListCloseClick = () => {
  setShowPersonaList(false);
};

const handleDeletePersona = (index) => {
  const updatedPersonaList = [...personaList];
  updatedPersonaList.splice(index, 1);
  setPersonaList(updatedPersonaList);
  localStorage.setItem('personaList', JSON.stringify(updatedPersonaList));
};

const handleChosenPersona = (index, isPersonaBot) => {
  const selectedPersona = personaList[index];
  isPersonaBot ? setPersona(personaBot) : setPersona(selectedPersona);
  setShowPersonaForm(false);
  setShowPersonaList(false);
};

const handleEditPersona = (index) => {
  const selectedPersona = personaList[index];
  setPersonaForm(selectedPersona)
  setShowPersonaList(false);
};

useEffect(() => {
  const storedPersonaList = localStorage.getItem('personaList');
  if (storedPersonaList) {
    setPersonaList(JSON.parse(storedPersonaList));
  }
}, []);


  const sharedData = {
    dataCss,
    prompt,
    contextPrompt,
    loading,
    chatMessages,
    context,
    frequency,
    presence,
    answerValue,
    isAnswerEnabled,
    temperature,
    isTokensEnabled,
    tokenValue,
    showMessage,
    showUserForm,
    userName,
    savedUser,
    userKey,
    savedKey,
    showError,
    errorMessage,
    showPersonaForm,
    personaBot,
    personaForm,
    personaList,
    showPersonaList,
    setUserKey,
    setUserName,
    sendMessage,
    setPersonaForm,
    setPersona,
    setShowPersonaList,
    handlePersonaButtonClick,
    handlePersonaCloseClick,
    handleInputChange,
    handleInputContextChange,
    handleSubmit,
    handleFrequencyChange,
    handlePresenceChange,
    handleAnswerCheckboxChange,
    handleAnswerInputChange,
    handleTemperatureChange,
    handleTokensCheckboxChange,
    handleTokensInputChange,
    handleKeyDown,
    handleUserButtonClick,
    handleUserCloseClick,
    handleSubmitUser,
    handleSubmitKey,
    handleErrorCloseClick,
    handleSubmitPersona,
    handlePersonaListButtonClick,
    handlePersonaListCloseClick,
    handleDeletePersona,
    handleChosenPersona,
    handleEditPersona
  };

  return (
    <Router>
      <MyContext.Provider value={sharedData}>
        <BodyComponent
          backgroundColor={dataCss.secundaryColor}
          color={dataCss.fontColor}
        />
        <Routes>
          <Route path="/easy-ia" element={<HomePage />} />
          <Route path="/easy-ia/test" element={<Test />} />
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
