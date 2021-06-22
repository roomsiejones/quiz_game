// Need header to start with "coding Quiz Challenge"
// Need instructions
// need start quiz button
var questionEl = document.querySelector("h1");
var start = document.getElementById('start');
var quiz = document.getElementById('quiz');
var newquestion = document.getElementById('question');

var choiceA = document.getElementById('A');
var choiceB = document.getElementById('B');
var choiceC = document.getElementById('C');
var choiceD = document.getElementById('D');
var timer = document.querySelector(".timer-text");

// Need questions to replace the Headers
// This is my array of objects containing my questions, answers, and correct answers.
var questions = [
  
    {
    question: "What is the best animal?",
    choices: ["Dog", "Cat", "Lion", "Pig"],
    correct: "B",
    },

    {
      question: "This is a different question?",
      choices: ["___", "____", "____", "____"],
      correct: "____",
    },
    
    {
    question: "This is a different question?",
    choices: ["___", "____", "____", "____"],
    correct: "____",
    },
    
    {
    question: "This is a different question?",
    choices: ["___", "____", "____", "____"],
    correct: "____",
    },
    
    {
    question: "This is a different question?",
    choices: ["___", "____", "____", "____"],
    correct: "____",
    },

];

// 4 answers
// correct answer
// need buttons that are the choices to replace the instructions

// need start quiz button to have gone away

// need a correct answer to be stored

// Need either "Correct!" to pop up and move to the next question or "wrong!" to show up, take away 15 seconds, and move to the next question
// Need a timer to be counting down in the top right corner

// When quiz is Over, need a screen that says "All done!" in the Header --'your final score is: (display the time remaining as a high score)' replacing where the initial instructions were -- a submission to store that high score to initials in the localStorage
// after it is submitted -- need a 'go back' button that lets you retake the quiz, and a 'clear highscores' button that clears the localStorage

// Need a 'view highscores in the top left' that takes us to a page that pulls up locally stored values assigned by students by initials

// variables needed????

// what pieces do I need for the html????
