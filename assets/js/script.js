// Creating initial variables needed
	const initialTime = 75;
	var time = 75;
	var score = 0;
	var questionCount = 0;
	var timeset;
	var answers = document.querySelectorAll('#quizHolder button');

// created an array containing objects of questions and answers to call
    var questions = [
            // this is the first object of this Array, or index 0
        {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        },
    
        {
          question: "The condition in an if/else statement is enclosed within ______.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "parentheses",
        },
        
        {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
        },
        
        {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
        },
        
        {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console log",
        },
    
    ];
	//   this is getting any records if stored in localstorage
	var recordsArray = [];
	(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];

// function to call elements to make it easier
	var queryElement = (element) => {
		return document.querySelector(element);
	}

    // This hides and unhides elements
	var onlyDisplaySection = (element) => {
		var sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}
        // this takes away the display of the score
	var recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}
        // this puts the questions and answers in the questionholder part
	var setQuestionData = () => {
		queryElement('#quizHolder p').innerHTML = questions[questionCount].question;
		queryElement('#quizHolder button:nth-of-type(1)').innerHTML = `1. ${questions[questionCount].choices[0]}`;
		queryElement('#quizHolder button:nth-of-type(2)').innerHTML = `2. ${questions[questionCount].choices[1]}`;
		queryElement('#quizHolder button:nth-of-type(3)').innerHTML = `3. ${questions[questionCount].choices[2]}`;
		queryElement('#quizHolder button:nth-of-type(4)').innerHTML = `4. ${questions[questionCount].choices[3]}`;
	}

        // this changes the question and tells if right or wrong
	var quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add('disable');
		});
            // exits the quiz when the questions have been answered
		setTimeout(() => {
			if (questionCount === questions.length) {
				onlyDisplaySection("#finish");
				time = 0;
				queryElement('#time').innerHTML = time;
			} else {
				setQuestionData();
                // removes the disabled status
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}
        // timer initially
	var myTimer = () => {
		if (time > 0) {
			time = time -1;
			queryElement('#time').innerHTML = time;
		} else {
			clearInterval(clock);
            score = 0;
			queryElement('#score').innerHTML = score;
			onlyDisplaySection("#finish");
		}
	}

        // on the start button, starts timer and quiz
	var clock;
	queryElement("#explain button").addEventListener("click", (e) => {
		setQuestionData();
		onlyDisplaySection("#quizHolder");
		clock = setInterval(myTimer, 1000);
	});


	var scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}

// makes an array of answers to compare, and tells what to do if correct or incorrect
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			if (this.innerHTML.substring(3, this.length) === questions[questionCount].answer) {
				score = time;
				questionCount = questionCount + 1;
				quizUpdate("Correct");
			}else{
				time = time - 10;
                score = time;
                questionCount = questionCount + 1;
				quizUpdate("Wrong");
			}
		});
	});

// This makes an error if initials are more than 5
	var errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
			queryElement('#errorIndicator').classList.add('invisible');
		}, 3000);
	}

	queryElement("#records button").addEventListener("click", () => {
		var initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "You need at least 1 character";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else if (initialsRecord.match(/[[A-Za-z]/) === null) {
			queryElement('#errorIndicator p').innerHTML = "Only varters for initials allowed.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else if (initialsRecord.length > 5) {
			queryElement('#errorIndicator p').innerHTML = "Maximum of 5 characters allowed.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else {
            // this stores our array
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
            // this puts that info into local storage
			localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
		}
	});

// clears scores
	queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('recordsArray');
	});
// lets you play again
	queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
		questionCount = 0;
		onlyDisplaySection("#explain");
	});

	// shows high scores, but also exits the current quiz
	queryElement("#scores").addEventListener("click", (e) => {
		e.preventDefault();
		clearInterval(clock);
		queryElement('#time').innerHTML = 0;
		time = initialTime;
		score = 0;
		questionCount = 0;
		onlyDisplaySection("#highScores");
		recordsHtmlReset();
	});

