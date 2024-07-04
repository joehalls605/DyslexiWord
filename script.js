const wordData = [
    {_id: "1", word: "acceptable", sound: "./sounds/acceptable.mp3"},
    {_id: "2", word: "accommodate", sound: "./sounds/accommodate.mp3"},
    {_id: "3", word: "drunkenness", sound: "./sounds/drunkenness.mp3"},
    {_id: "4", word: "vicious", sound: "./sounds/vicious.mp3"},
    {_id: "5", word: "acquire", sound: "./sounds/acquire.mp3"},
    {_id: "6", word: "atheist", sound: "./sounds/atheist.mp3"},
    {_id: "7", word: "exhilarate", sound: "./sounds/exhilarate.mp3"},
    {_id: "8", word: "mischievous", sound: "./sounds/mischievous.mp3"},
    {_id: "9", word: "parliament", sound: "./sounds/parliament.mp3"},
    {_id: "10", word: "noticeable", sound: "./sounds/noticeable.mp3"},
    {_id: "11", word: "questionnaire", sound: "./sounds/questionnaire.mp3"},
    {_id: "12", word: "conscience", sound: "./sounds/conscience.mp3"},
    {_id: "13", word: "rhythm", sound: "./sounds/rhythm.mp3"},
    {_id: "14", word: "embarrassment", sound: "./sounds/embarrassment.mp3"},
    {_id: "15", word: "guarantee", sound: "./sounds/guarantee.mp3"},
    {_id: "16", word: "psychiatrist", sound: "./sounds/psychiatrist.mp3"},
    {_id: "17", word: "reconnaissance", sound: "./sounds/reconnaissance.mp3"},
    {_id: "18", word: "incidentally", sound: "./sounds/incidentally.mp3"},
    {_id: "19", word: "sovereignty", sound: "./sounds/sovereignty.mp3"},
    {_id: "20", word: "miscellaneous", sound: "./sounds/miscellaneous.mp3"},
    {_id: "21", word: "pencil", sound: "./sounds/pencil.mp3"}
];

let score = 0;
let question = 0;
let completedWords = [];
let randomWord;
let gameEnded = false;

const buttonColour = "#7CCEB6";

// Start game function

function startGame() {
    const howToPlay = document.getElementById("howToPlay");
    if (howToPlay) {
        howToPlay.classList.add("hidden");
    }

    // Initial word randomisation
    randomiseWord();
    
    // Sourcing elements for manipulation
    const dyslexiaImageElement = document.getElementById("dyslexiaImage");
    if (dyslexiaImageElement) {
        dyslexiaImageElement.remove();
    }
    
    const gameElement = document.getElementById("game");
    if (gameElement) {
        gameElement.classList.remove("hidden");
    }
    
    const startGameElement = document.getElementById("startGame");
    if (startGameElement) {
        startGameElement.classList.add("hidden");
    }
    
    const introBioElement = document.getElementById("intro-bio");
    if (introBioElement) {
        introBioElement.remove();
    }
    
    const introTextElement = document.getElementById("intro-text");
    if (introTextElement) {
        introTextElement.remove();
    }
    
    const wordHintElement = document.getElementById("word-hint");
    if (wordHintElement) {
        wordHintElement.classList.remove("hidden");
    }
}

// End game function

function endGame() {
    if (!gameEnded) {
        gameEnded = true;

        const gameElement = document.getElementById("game");
        if (gameElement && gameElement.parentNode) {
            gameElement.parentNode.removeChild(gameElement);
        }

        const hintElement = document.getElementById("word-hint");
        if (hintElement) {
            hintElement.remove();
        }
        EndGameColour();
    }
}

// EndGameColour function sets the game outcome colour depending on score total
function EndGameColour() {
    let scoreColour = "";
    let scoreResponse = "";
    if (score > 7) {
        scoreColour = "bg-green-600";
        scoreResponse = "Brilliant job!";
    } else if (score >= 4) {
        scoreColour = "bg-yellow-400";
        scoreResponse = "Solid score!";
    } else if (score <= 4) {
        scoreColour = "bg-red-400";
        scoreResponse = "Practice makes perfect!";
    }

    const scoreElement = document.createElement("div");
    scoreElement.classList.add("pr-5", "pl-5", "pb-4", "flex", "flex-row", "justify-center");
    scoreElement.innerHTML = `
        <div id="gameOver" class="flex flex-col items-center">
            <p class="text-3xl mt-5">Game Over</p>
            <p class="text-2xl mt-4">You scored:</p>
            <p class="text-4xl mt-5 rounded-full ${scoreColour} w-36 h-36 flex items-center justify-center">${score} / 10</p>
            <p class="text-2xl mt-5">${scoreResponse}</p>
            <p class="text-1xl mt-5">Refresh the page to restart the game</p>
            <button id="resetButton" class="text-xl p-2 border-4 w-40 mt-5 hover:text-white hover:bg-gray-500">Restart</button>
        </div>
    `;
    const appElement = document.getElementById("app");
    if (appElement) {
        appElement.append(scoreElement);
    }

    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            location.reload();
        });
    }
}


// playSound function plays word audio
function playSound() {
    const audio = document.getElementById("myAudio");
    if (audio) {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play();
    }
}

// updateProgressBar displays progress bar.
function updateProgressBar() {
    const audio = document.getElementById("myAudio");
    const progressBar = document.getElementById("progressBar");
    if (audio && progressBar) {
        const progress = (audio.currentTime / audio.duration) * 100; // This works by calculating the fraction of the audio played by halving the duration by current time and multiplying by 100.
        progressBar.style.width = progress + "%";
    }
}

// Checking if the 
function validateWordInput() {
    if (randomWord && randomWord.word) { // ensures random word is not null or undefined 
        const textInput = document.getElementById("text_input");
        const wordHint = document.getElementById("hint-text");
        if (textInput && wordHint) { // checks if both elements are present in the DOM
            const userInput = textInput.value.trim().toLowerCase();
            if (userInput === randomWord.word.toLowerCase()) {
                score++;
            }

            completedWords.push(randomWord.word); // adds the word to completed word.
            question++;
            textInput.value = "";
            if (question === 10) {
                endGame();
            } else {
                randomiseWord();
            }
        }
    }
}

// randomiseWord randomises the word for use in the application

function randomiseWord() {
    if (wordData.length === 0) {
        console.error("Word data is empty.");
        return;
    }

    const unusedWords = wordData.filter(word => !completedWords.includes(word.word)); 
    // This creates an array only containing words that have not been attempted.
    // !completedWords.includes(word.word)); checks if the word is not present in the completedWords array.
    

    if (unusedWords.length === 0) {
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * unusedWords.length);
    randomWord = unusedWords[randomIndex]; // It then pulls a random word from the words that have not been used.

    const audio = document.getElementById("myAudio");
    const wordHint = document.getElementById("hint-text");

    if (audio && wordHint) {
        audio.src = randomWord.sound; // random word's sound applied to the audio element.
        const hint = randomWord.word.charAt(0) + randomWord.word.slice(1).replace(/[a-zA-Z]/g, " _ "); // random word applied to the hint element.
        wordHint.textContent = hint;
        console.log(wordHint.textContent);
    } else {
        console.error("Audio or word hint element not found.");
    }
}

document.getElementById("text_input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        validateWordInput();
    }
});