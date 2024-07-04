Project Title: Dyslexio

Description:
Dyslexio is a web application for practicing the most challenging words for people with dyslexia.
The application presents words with their corresponding audio pronunciations, allowing users to listen and type the words, improving their spelling and recognition skills through repetition and feedback.

Usage:
Open the index.html file in your web browser.

File Overview:
Index.html - HTML Structure sets up the basic elemements for game title, instructions and gameplay interface.
Tailwind CSS is used for the styling of the application.
Script.js - JavaScript is used to implement game functionality.

Logic Overview:
The game starts when the user clicks the "Start Game" button. This triggers the startGame function.
The startGame function hides the introductory elements and instructions, reveals the game interface, and calls randomiseWord to select the first word.

The randomiseWord function filters the wordData array to exclude words that have already been completed.
A random word is selected from the remaining words. The selected word is stored in the randomWord variable.

The first letter of the word is shown, with the rest of the letters replaced by underscores, providing a visual hint for the player.
The audio source for the word's pronunciation is set up, ready to be played.

When the "Play Audio" button is clicked, the playSound function plays the word's pronunciation audio.
The updateProgressBar function updates the visual progress bar to reflect the current playback position of the audio.

An event listener on the text input field detects when the user presses the Enter key.
The validateWordInput function checks if the user's input matches the current word. If correct, the score is incremented.

The completed word is added to the completedWords array, the question counter is incremented, and the text input is cleared.
If there are more words to guess, randomiseWord is called again. If the user has completed 10 words, the game ends.

When the game ends, either by completing 10 words or exhausting the word list, the endGame function is called.
he game interface is hidden, and the final score is displayed. The EndGameColour function determines the color of the score display based on the user's performance.
A "Restart" button is provided, which reloads the page to start a new game.