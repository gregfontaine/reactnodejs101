const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Vocabulary data: 10 levels, each with 10 items
const levels = [
  {
    level: 1,
    title: 'Greetings / Salutations / 挨拶',
    items: [
      { italian: 'Ciao', french: 'Salut', japanese: 'こんにちは' },
      { italian: 'Buongiorno', french: 'Bonjour', japanese: 'おはようございます' },
      { italian: 'Buonasera', french: 'Bonsoir', japanese: 'こんばんは' },
      { italian: 'Arrivederci', french: 'Au revoir', japanese: 'さようなら' },
      { italian: 'Grazie', french: 'Merci', japanese: 'ありがとう' },
      { italian: 'Prego', french: 'De rien', japanese: 'どういたしまして' },
      { italian: 'Scusa', french: 'Excuse-moi', japanese: 'ごめんなさい' },
      { italian: 'Sì', french: 'Oui', japanese: 'はい' },
      { italian: 'No', french: 'Non', japanese: 'いいえ' },
      { italian: 'Per favore', french: 'S\'il te plaît', japanese: 'お願いします' }
    ]
  },
  {
    level: 2,
    title: 'Numbers / Nombres / 数字',
    items: [
      { italian: 'Uno', french: 'Un', japanese: '一' },
      { italian: 'Due', french: 'Deux', japanese: '二' },
      { italian: 'Tre', french: 'Trois', japanese: '三' },
      { italian: 'Quattro', french: 'Quatre', japanese: '四' },
      { italian: 'Cinque', french: 'Cinq', japanese: '五' },
      { italian: 'Sei', french: 'Six', japanese: '六' },
      { italian: 'Sette', french: 'Sept', japanese: '七' },
      { italian: 'Otto', french: 'Huit', japanese: '八' },
      { italian: 'Nove', french: 'Neuf', japanese: '九' },
      { italian: 'Dieci', french: 'Dix', japanese: '十' }
    ]
  },
  {
    level: 3,
    title: 'Colors / Couleurs / 色',
    items: [
      { italian: 'Rosso', french: 'Rouge', japanese: '赤' },
      { italian: 'Blu', french: 'Bleu', japanese: '青' },
      { italian: 'Verde', french: 'Vert', japanese: '緑' },
      { italian: 'Giallo', french: 'Jaune', japanese: '黄' },
      { italian: 'Nero', french: 'Noir', japanese: '黒' },
      { italian: 'Bianco', french: 'Blanc', japanese: '白' },
      { italian: 'Arancione', french: 'Orange', japanese: 'オレンジ' },
      { italian: 'Viola', french: 'Violet', japanese: '紫' },
      { italian: 'Rosa', french: 'Rose', japanese: 'ピンク' },
      { italian: 'Marrone', french: 'Marron', japanese: '茶色' }
    ]
  },
  {
    level: 4,
    title: 'Family / Famille / 家族',
    items: [
      { italian: 'Madre', french: 'Mère', japanese: '母' },
      { italian: 'Padre', french: 'Père', japanese: '父' },
      { italian: 'Fratello', french: 'Frère', japanese: '兄弟' },
      { italian: 'Sorella', french: 'Sœur', japanese: '姉妹' },
      { italian: 'Nonno', french: 'Grand-père', japanese: '祖父' },
      { italian: 'Nonna', french: 'Grand-mère', japanese: '祖母' },
      { italian: 'Figlio', french: 'Fils', japanese: '息子' },
      { italian: 'Figlia', french: 'Fille', japanese: '娘' },
      { italian: 'Amico', french: 'Ami', japanese: '友達' },
      { italian: 'Famiglia', french: 'Famille', japanese: '家族' }
    ]
  },
  {
    level: 5,
    title: 'Basic Verbs / Verbes basiques / 基本動詞',
    items: [
      { italian: 'Essere', french: 'Être', japanese: 'である' },
      { italian: 'Avere', french: 'Avoir', japanese: '持つ' },
      { italian: 'Mangiare', french: 'Manger', japanese: '食べる' },
      { italian: 'Bere', french: 'Boire', japanese: '飲む' },
      { italian: 'Dormire', french: 'Dormir', japanese: '寝る' },
      { italian: 'Andare', french: 'Aller', japanese: '行く' },
      { italian: 'Venire', french: 'Venir', japanese: '来る' },
      { italian: 'Fare', french: 'Faire', japanese: 'する' },
      { italian: 'Vedere', french: 'Voir', japanese: '見る' },
      { italian: 'Parlare', french: 'Parler', japanese: '話す' }
    ]
  },
  {
    level: 6,
    title: 'Food / Nourriture / 食べ物',
    items: [
      { italian: 'Pane', french: 'Pain', japanese: 'パン' },
      { italian: 'Acqua', french: 'Eau', japanese: '水' },
      { italian: 'Latte', french: 'Lait', japanese: '牛乳' },
      { italian: 'Frutta', french: 'Fruit', japanese: '果物' },
      { italian: 'Verdura', french: 'Légume', japanese: '野菜' },
      { italian: 'Carne', french: 'Viande', japanese: '肉' },
      { italian: 'Pesce', french: 'Poisson', japanese: '魚' },
      { italian: 'Formaggio', french: 'Fromage', japanese: 'チーズ' },
      { italian: 'Uovo', french: 'Œuf', japanese: '卵' },
      { italian: 'Dolce', french: 'Sucré', japanese: '甘い' }
    ]
  },
  {
    level: 7,
    title: 'Animals / Animaux / 動物',
    items: [
      { italian: 'Cane', french: 'Chien', japanese: '犬' },
      { italian: 'Gatto', french: 'Chat', japanese: '猫' },
      { italian: 'Uccello', french: 'Oiseau', japanese: '鳥' },
      { italian: 'Pesce', french: 'Poisson', japanese: '魚' },
      { italian: 'Cavallo', french: 'Cheval', japanese: '馬' },
      { italian: 'Mucca', french: 'Vache', japanese: '牛' },
      { italian: 'Maiale', french: 'Porc', japanese: '豚' },
      { italian: 'Pecora', french: 'Mouton', japanese: '羊' },
      { italian: 'Leone', french: 'Lion', japanese: 'ライオン' },
      { italian: 'Elefante', french: 'Éléphant', japanese: '象' }
    ]
  },
  {
    level: 8,
    title: 'Body Parts / Parties du corps / 体の部分',
    items: [
      { italian: 'Testa', french: 'Tête', japanese: '頭' },
      { italian: 'Occhio', french: 'Œil', japanese: '目' },
      { italian: 'Naso', french: 'Nez', japanese: '鼻' },
      { italian: 'Bocca', french: 'Bouche', japanese: '口' },
      { italian: 'Orecchio', french: 'Oreille', japanese: '耳' },
      { italian: 'Mano', french: 'Main', japanese: '手' },
      { italian: 'Piede', french: 'Pied', japanese: '足' },
      { italian: 'Gamba', french: 'Jambe', japanese: '脚' },
      { italian: 'Braccio', french: 'Bras', japanese: '腕' },
      { italian: 'Cuore', french: 'Cœur', japanese: '心' }
    ]
  },
  {
    level: 9,
    title: 'School Items / Articles scolaires / 学校のもの',
    items: [
      { italian: 'Scuola', french: 'École', japanese: '学校' },
      { italian: 'Libro', french: 'Livre', japanese: '本' },
      { italian: 'Penna', french: 'Stylo', japanese: 'ペン' },
      { italian: 'Matita', french: 'Crayon', japanese: '鉛筆' },
      { italian: 'Quaderno', french: 'Cahier', japanese: 'ノート' },
      { italian: 'Zaino', french: 'Sac à dos', japanese: 'バックパック' },
      { italian: 'Insegnante', french: 'Enseignant', japanese: '先生' },
      { italian: 'Studente', french: 'Étudiant', japanese: '学生' },
      { italian: 'Banco', french: 'Bureau', japanese: '机' },
      { italian: 'Lavagna', french: 'Tableau', japanese: '黒板' }
    ]
  },
  {
    level: 10,
    title: 'Simple Phrases / Phrases simples / 簡単なフレーズ',
    items: [
      { italian: 'Come stai?', french: 'Comment ça va?', japanese: '元気ですか?' },
      { italian: 'Mi chiamo...', french: 'Je m\'appelle...', japanese: '私の名前は...' },
      { italian: 'Ho fame', french: 'J\'ai faim', japanese: 'お腹がすいた' },
      { italian: 'Ho sete', french: 'J\'ai soif', japanese: '喉が渇いた' },
      { italian: 'Dove è?', french: 'Où est?', japanese: 'どこですか?' },
      { italian: 'Che ora è?', french: 'Quelle heure est-il?', japanese: '何時ですか?' },
      { italian: 'Buona notte', french: 'Bonne nuit', japanese: 'おやすみ' },
      { italian: 'Ti amo', french: 'Je t\'aime', japanese: '愛してる' },
      { italian: 'Aiuto', french: 'Aide', japanese: '助け' },
      { italian: 'Felice', french: 'Heureux', japanese: '幸せ' }
    ]
  }
];

// API to get all levels
app.get('/api/levels', (req, res) => {
  res.json(levels);
});

// Existing route
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});