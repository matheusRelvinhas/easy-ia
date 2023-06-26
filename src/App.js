import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyContext from './Context/MyContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';

function BodyComponent({ backgroundColor, color }) {
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = color;
  return null; // Como este componente não possui conteúdo a ser renderizado, retornamos null
}

function App() {
  
  const [prompt, setPrompt] = useState('');
  const [contextPrompt, setContextPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [context, setContext] = useState([]);
  const [frequency, setFrequency] = useState(0.0);
  const [presence, setPresence] = useState(0.0);
  const [temperature, setTemperature] = useState(0.0);
  const [isAnswerEnabled, setIsAnswerEnabled] = useState(false);
  const [answerValue, setAnswerValue] = useState(null);
  const [isTokensEnabled, setIsTokensEnabled] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showUserForm, setshowUserForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [savedUser, setSavedUser] = useState('user');
  const [userKey, setUserKey] = useState('');
  const [savedKey, setSavedKey] = useState('clique em User Key e gere sua key e não compatilhe' );
  const [showError, setshowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  const keyUser = `Bearer ${savedKey}`

  const dataCss =  { // cor principal de fundo, header(banner) e footer 
    primaryColor: '#212121',
    secundaryColor: '#bfbfbf',
    fontColor: '#f0f0f0',
    logoImage: ['./img/easy-ia-logo.png', './img/easy-ia-logo.webp', 'https://i.postimg.cc/d31GghxF/easy-ia-logo.png', 'https://i.postimg.cc/bJLQ6xLL/easy-ia-logo.webp']
  };
  
  const sendMessage = async () => {
    setLoading(true); // Define o estado de carregamento como true

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...context,
            { role: 'system', content: 'Você é um chatbot' },
            { role: 'user', content: contextPrompt },
            { role: 'user', content: prompt },
          ],
          max_tokens: tokenValue, // Número máximo de tokens para cada resposta
          n: answerValue, // Obtenha n respostas do modelo null valor padrao do chatgpt, 1
          frequency_penalty: frequency, //aumenta frequencia de palavras que vc passou comp parametro
          presence_penalty: presence, // aumenta frequencia de palavras diferentes
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
        //const htmlResponse = responseContent.replace(/\n/g, '<br>');
        const regexCode = /```([\s\S]*?)```/g;
        const highlightedText = responseContent.replace(
          regexCode,
          `<div className='code-block'>$1</div>`
        );
        //const regex = /<div className='code-block'>([\s\S]*?)<\/div>/g;
        return `ChatBot: ${highlightedText}`;
      });

      setChatMessages([...chatMessages, `${savedUser}: ${prompt}`, ...responses]);
    } catch (error) {
      setshowError(true)
      if (error.response) {
        setErrorMessage(`Response status: ${error.response.status}, Response data: ${error.response.data.error.code}`)
      } else {
        setErrorMessage(`Error message: ${error.message}`);
      }
    } finally {
      setLoading(false); // Define o estado de carregamento como false após a resposta ou erro
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleInputContextChange = (event) => {
    setContextPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatMessages([...chatMessages, `${savedUser}: ${prompt}`]);
    sendMessage();
    setPrompt('');
  };

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
      setAnswerValue(1)
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
      setTokenValue(9999)
    } else if (value < 1) {
      setTokenValue(1)
    } else {
      setTokenValue(value);
    }
  };

  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

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

  const handleUserButtonClick = () => {
    setshowUserForm(true)
  }

  const handleUserCloseClick = () => {
    setshowUserForm(false)
  }

  useEffect(() => {
    // Recupera o usuário salvo no Local Storage
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setSavedUser(storedUser);
    }
  }, []);

  const handleSubmitUser = (event) => {
    event.preventDefault();
    // Armazena o nome do usuário no Local Storage
    localStorage.setItem('userName', userName);
    // Atualiza o estado com o nome do usuário
    setSavedUser(userName);
    // Limpa o campo do formulário
    setUserName('');
  };

  useEffect(() => {
    // Recupera o usuário salvo no Local Storage
    const storedKey = localStorage.getItem('userKey');
    if (storedKey) {
      setSavedKey(storedKey);
    }
  }, []);

  const handleSubmitKey = (event) => {
    setshowUserForm(false);
    event.preventDefault();
    // Armazena a key no Local Storage
    localStorage.setItem('userKey', userKey);
    // Atualiza o estado com a key
    setSavedKey(userKey);
    
    setUserKey('');
  };

  const handleErrorCloseClick = () => {
    setshowError(false)
  }

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
    setUserKey,
    setUserName,
    sendMessage,
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
    handleErrorCloseClick
  };

  return (
    <Router>
      <MyContext.Provider value={sharedData}>
        <BodyComponent backgroundColor={dataCss.secundaryColor} color={dataCss.fontColor} />
        <Routes>
          <Route path='/easy-ia' element={<HomePage />}/>
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
