import React, { useEffect, useState, useCallback } from 'react';

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

         // Get 2 incorrect options (random from other items, mixed FR/JA)
         const otherItems = levelItems.filter((_, idx) => idx !== currentQuestion);
         const incorrect1 = Math.random() > 0.5 ? otherItems[0].french : otherItems[0].japanese;
         const incorrect2 = Math.random() > 0.5 ? otherItems[1].french : otherItems[1].japanese;

         // Shuffle options
         const newOptions = [correctFR, correctJA, incorrect1, incorrect2].sort(() => Math.random() - 0.5);
         setOptions(newOptions);
       }, [levels, currentLevel, currentQuestion]);

       useEffect(() => {
         if (levels.length > 0 && currentLevel <= levels.length) {
           resetLives();
           generateOptions();
           setMessage('');
         }
       }, [currentLevel, currentQuestion, levels, generateOptions]);

       const handleAnswer = (selected) => {
         const item = levels[currentLevel - 1].items[currentQuestion];
         if (selected === item.french || selected === item.japanese) {
           setMessage('Correct ! / 正解！');
           nextQuestion();
         } else {
           const newLives = lives - 1;
           setLives(newLives);
           setMessage('Faux... / 間違い...');
           if (newLives === 0) {
             setGameOver(true);
           } else {
             nextQuestion();
           }
         }
       };
       const nextQuestion = () => {
         if (currentQuestion + 1 < 10) {
           setCurrentQuestion(currentQuestion + 1);
         } else {
           if (currentLevel < 10) {
             setCurrentLevel(currentLevel + 1);
             setCurrentQuestion(0);
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
         return <div>Loading... / Chargement... / 読み込み中...</div>;
       }

       if (gameOver) {
         return (
           <div style={{ textAlign: 'center', fontSize: '24px' }}>
             <h1>Game Over!</h1>
             <p>Réessayer ! / もう一度！</p>
             <button onClick={restartGame}>Restart / Recommencer / リスタート</button>
           </div>
         );
       }

       const currentItem = levels[currentLevel - 1].items[currentQuestion];

       return (
         <div style={{ textAlign: 'center', fontSize: '20px' }}>
           <h1>Jeu de quiz italien</h1>
           <p>Level {currentLevel}: {levels[currentLevel - 1].title}</p>
           <p>HP: {'❤️'.repeat(lives)}</p>
           <h2>{currentItem.italian}</h2>
           {options.map((opt, idx) => (
             <button key={idx} onClick={() => handleAnswer(opt)} style={{ display: 'block', margin: '10px auto' }}>
               {opt}
             </button>
           ))}
           <p>{message}</p>
         </div>
       );
     }

     export default App;
