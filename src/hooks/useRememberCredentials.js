import { useState, useEffect } from 'react';

const useRememberCredentials = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberedUsername, setRememberedUsername] = useState('');
  const [rememberedPassword, setRememberedPassword] = useState('');

  // Fetch remembered credentials from localStorage on hook initialization
  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe');
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedRememberMe) setRememberMe(true);
    if (storedUsername) setRememberedUsername(storedUsername);
    if (storedPassword) setRememberedPassword(storedPassword);
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const saveRememberedCredentials = (username, password) => {
    if (rememberMe) {
      localStorage.setItem('rememberedUsername', username);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }
    localStorage.setItem('rememberMe', rememberMe);
  };

  return {
    rememberMe,
    rememberedUsername,
    rememberedPassword,
    handleRememberMe,
    saveRememberedCredentials
  };
};

export default useRememberCredentials;
