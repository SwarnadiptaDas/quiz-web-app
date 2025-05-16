function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  
  const sounds = {
    correct: new Audio('https://freesound.org/data/previews/256/256113_3263906-lq.mp3'), 
    wrong: new Audio('https://freesound.org/data/previews/109/109662_945474-lq.mp3'),    
    timerWarning: new Audio('https://freesound.org/data/previews/331/331912_3248244-lq.mp3')  
  };
  
  
  const allQuestions = [
    
    {
      level: "Easy",
      question: "What is 2 + 2?",
      options: ["3", "4", "5"],
      answer: "4",
      explanation: "2 + 2 equals 4 because addition combines the quantities."
    },
    {
      level: "Easy",
      question: "What color is the sky?",
      options: ["Blue", "Green", "Red"],
      answer: "Blue",
      explanation: "On a clear day, the sky looks blue due to the scattering of sunlight."
    },
    {
      level: "Easy",
      question: "Which animal barks?",
      options: ["Cat", "Dog", "Cow"],
      answer: "Dog",
      explanation: "Dogs are known for barking to communicate."
    },
    {
      level: "Easy",
      question: "How many legs does a spider have?",
      options: ["6", "8", "10"],
      answer: "8",
      explanation: "Spiders have 8 legs, which distinguishes them from insects."
    },
    {
      level: "Easy",
      question: "What do bees produce?",
      options: ["Milk", "Honey", "Wax"],
      answer: "Honey",
      explanation: "Bees produce honey by collecting nectar from flowers."
    },
  
    
    {
      level: "Medium",
      question: "Which planet is called the Red Planet?",
      options: ["Earth", "Mars", "Saturn"],
      answer: "Mars",
      explanation: "Mars appears red due to iron oxide (rust) on its surface."
    },
    {
      level: "Medium",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris"],
      answer: "Paris",
      explanation: "Paris is the capital and largest city of France."
    },
    {
      level: "Medium",
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain"],
      answer: "William Shakespeare",
      explanation: "Shakespeare wrote the famous play 'Romeo and Juliet'."
    },
    {
      level: "Medium",
      question: "What is H2O commonly known as?",
      options: ["Salt", "Water", "Oxygen"],
      answer: "Water",
      explanation: "H2O is the chemical formula for water."
    },
    {
      level: "Medium",
      question: "Which organ pumps blood in the human body?",
      options: ["Liver", "Heart", "Lungs"],
      answer: "Heart",
      explanation: "The heart circulates blood throughout the body."
    },
  
    
    {
      level: "Hard",
      question: "What is the square root of 256?",
      options: ["14", "16", "18"],
      answer: "16",
      explanation: "16 × 16 equals 256."
    },
    {
      level: "Hard",
      question: "Which element has the atomic number 26?",
      options: ["Iron", "Copper", "Zinc"],
      answer: "Iron",
      explanation: "Iron's atomic number is 26 on the periodic table."
    },
    {
      level: "Hard",
      question: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla"],
      answer: "Albert Einstein",
      explanation: "Einstein developed both special and general relativity theories."
    },
    {
      level: "Hard",
      question: "What is the chemical symbol for Gold?",
      options: ["Au", "Ag", "Go"],
      answer: "Au",
      explanation: "The chemical symbol for gold is Au, derived from Latin 'Aurum'."
    },
    {
      level: "Hard",
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide"],
      answer: "Nitrogen",
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
    }
  ];
  
  
  let current = 0;
  let score = 0;
  let timeLeft = 25;
  let timer;
  let selectedQuestions = [];
  let showingExplanation = false;
  
  
  const levelSelect = document.getElementById("level");
  const startBtn = document.getElementById("startBtn");
  const quizEl = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const timerEl = document.getElementById("time");
  const retryBtn = document.getElementById("retryBtn");
  const scoreEl = document.getElementById("score");
  
  
  const explanationEl = document.createElement("div");
  explanationEl.style.marginTop = "15px";
  explanationEl.style.fontStyle = "italic";
  explanationEl.style.color = "#333";
  quizEl.appendChild(explanationEl);
  
  
  startBtn.onclick = () => {
    const level = levelSelect.value;
    selectedQuestions = shuffle(allQuestions.filter(q => q.level === level));
    current = 0;
    score = 0;
    showingExplanation = false;
    document.getElementById("level-select").style.display = "none";
    quizEl.style.display = "block";
    questionEl.style.display = "block";
    answersEl.style.display = "block";
    retryBtn.style.display = "none";
    scoreEl.style.display = "none";
    explanationEl.style.display = "none";
    document.getElementById("timer").style.display = "block";
    showQuestion();
  };
  
  
  function showQuestion() {
    clearInterval(timer);
    timeLeft = 25;
    timerEl.textContent = timeLeft;
    explanationEl.style.display = "none";
    showingExplanation = false;
  
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
  
      if (timeLeft === 5) {
        
        sounds.timerWarning.play();
      }
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (!showingExplanation) {
          
          showExplanation(false);
        }
      }
    }, 1000);
  
    const q = selectedQuestions[current];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    shuffle(q.options).forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      btn.onclick = () => {
        if (showingExplanation) return; 
        clearInterval(timer);
  
        if (option === q.answer) {
          score++;
          sounds.correct.play();
          showExplanation(true);
        } else {
          sounds.wrong.play();
          showExplanation(false);
        }
      };
      answersEl.appendChild(btn);
    });
  }
  
  
  function showExplanation(correct) {
    showingExplanation = true;
    const q = selectedQuestions[current];
    explanationEl.style.display = "block";
    explanationEl.textContent = (correct ? "✅ Correct! " : "❌ Wrong! ") + q.explanation;
  
    setTimeout(() => {
      explanationEl.style.display = "none";
      current++;
      if (current < selectedQuestions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }, 3000);
  }
  
  
  function showScore() {
    quizEl.style.display = "block";
    questionEl.style.display = "none";
    answersEl.style.display = "none";
    explanationEl.style.display = "none";
    retryBtn.style.display = "inline-block";
    document.getElementById("timer").style.display = "none";
    scoreEl.textContent = `🎯 You scored ${score} out of ${selectedQuestions.length}`;
    scoreEl.style.display = "block";
  }
  
  
  retryBtn.onclick = () => {
    location.reload();
  };
  