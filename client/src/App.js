import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';

function App() {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [lives, setLives] = useState(2);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/levels')
      .then(res => res.json())
      .then(data => setLevels(data))
      .catch(err => console.error('Error fetching levels:', err));
  }, []);

  const resetLives = () => setLives(2);

  const generateOptions = useCallback(() => {
    if (levels.length === 0) return;

    const levelItems = levels[currentLevel - 1].items;
    const item = levelItems[currentQuestion];
    const correctFR = item.french;
    const correctJA = item.japanese;

    // Get 3 incorrect options (random from other items, mixed FR/JA)
    const otherItems = levelItems.filter((_, idx) => idx !== currentQuestion);
    const incorrect1FR = otherItems[0].french;
    const incorrect1JA = otherItems[0].japanese;
    const incorrect2FR = otherItems[1].french;
    const incorrect2JA = otherItems[1].japanese;
    const incorrect3FR = otherItems[2].french;
    const incorrect3JA = otherItems[2].japanese;

    // Choose one correct option and three incorrect options
    const correctOption = `${correctFR} | ${correctJA}`;
    const incorrectOption1 = `${incorrect1FR} | ${incorrect1JA}`;
    const incorrectOption2 = `${incorrect2FR} | ${incorrect2JA}`;
    const incorrectOption3 = `${incorrect3FR} | ${incorrect3JA}`;

    // Shuffle options
    const newOptions = [correctOption, incorrectOption1, incorrectOption2, incorrectOption3].sort(() => Math.random() - 0.5);
    setOptions(newOptions);
  }, [levels, currentLevel, currentQuestion]);

  useEffect(() => {
    if (levels.length > 0 && currentLevel <= levels.length) {
      generateOptions();
      setMessage('');
    }
  }, [currentLevel, currentQuestion, levels, generateOptions]);

  // Watch for lives reaching zero to trigger game over
  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  const handleAnswer = (selected) => {
    const item = levels[currentLevel - 1].items[currentQuestion];
    const correctOption = `${item.french} | ${item.japanese}`;
    const reverseCorrectOption = `${item.japanese} | ${item.french}`;

    if (selected === correctOption || selected === reverseCorrectOption) {
      setMessage('Correct ! / 正解！');
      nextQuestion();
    } else {
      setLives(prevLives => prevLives - 1);
      setMessage('Faux... / 間違い...');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < 10) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentLevel < 10) {
        setCurrentLevel(currentLevel + 1);
        setCurrentQuestion(0);
        resetLives(); // Reset lives only when starting a new level
        setMessage('Niveau terminé ! / レベルクリア！');
      } else {
        setMessage('Tu as gagné ! / ゲームクリア！');
      }
    }
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setCurrentQuestion(0);
    setGameOver(false);
    resetLives();
    setMessage('');
  };

  if (levels.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        fontSize: '24px',
        color: '#f04d92',
        fontFamily: "'Special Elite', cursive",
        padding: '20px',
        animation: 'pulse 1.5s infinite'
      }}>
        Loading... / Chargement... / 読み込み中...
      </div>
    );
  }

  if (gameOver) {
    return (
      <div style={{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: "'Special Elite', cursive",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #f04d92',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
        color: '#f0f0f0',
        margin: '20px auto',
        maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '36px', color: '#f04d92', marginBottom: '10px' }}>Game Over!</h1>
        <p style={{ fontSize: '20px', color: '#d1d5db', marginBottom: '20px' }}>
          Réessayer ! / もう一度！
        </p>
        <button
          onClick={restartGame}
          className="wednesday-button"
        >
          Restart / Recommencer / リスタート
        </button>
      </div>
    );
  }

  const currentItem = levels[currentLevel - 1].items[currentQuestion];

  return (
    <div style={{
      textAlign: 'center',
      fontSize: '20px',
      fontFamily: "'Special Elite', cursive",
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #f04d92',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
      color: '#f0f0f0',
      margin: '20px auto',
      maxWidth: '500px'
    }}>
      <h1 style={{ fontSize: '30px', color: '#f04d92', marginBottom: '10px' }}>
        Jeu de quiz italien
      </h1>
      <p style={{ fontSize: '20px', color: '#d1d5db' }}>
        Level {currentLevel}: {levels[currentLevel - 1].title}
      </p>
      <p style={{ fontSize: '18px', color: '#3b82f6', marginBottom: '10px' }}>
        HP: {'🖤'.repeat(lives)}
      </p>
      <h2 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '20px' }}>
        {currentItem.italian}
      </h2>
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(opt)}
          className="wednesday-button"
        >
          {opt}
        </button>
      ))}
      <p style={{ fontSize: '18px', color: '#d1d5db', marginTop: '20px' }}>
        {message}
      </p>
    </div>
  );
}

export default App;