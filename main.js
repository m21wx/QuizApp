


	// Select Element
	let countSpan = document.querySelector('.quiz-info .count span');
	let bullets = document.querySelector('.bullets');
	let bulletSpanContainer = document.querySelector('.spans');
	let quizArea = document.querySelector('.quiz-area');
	let answersArea = document.querySelector('.answers-area');
	let sumbmitButton = document.querySelector('.submit-button');
	let resultsContainer = document.querySelector('.results');
	let countdownElement = document.querySelector('.countdown');



		
		
	// Set Options
	let currentIndex = 0; 
	let rightAnswers = 0;
	let countdownInterval;


	function getQuestions(){
		let myRequest = new XMLHttpRequest();
		myRequest.onreadystatechange = function(){
			if(this.readyState === 4 && this.status === 200){
				
				let questionsObject = JSON.parse(this.responseText);
				let qCount = questionsObject.length;
				
				// Create Bullets + Set Questions Count
				createBullets(qCount)
				
				// Add Question Data
				addQuestionData(questionsObject[currentIndex], qCount);
				
				// Start countDown
				countdown(60,qCount)
				
				// Click On Submit
				sumbmitButton.onclick = function(){
					// Get Right Answer
					let theRightAnswer = questionsObject[currentIndex].right_answer; 
					
					//Increase Index
					currentIndex++;
					//Check The Answer
					checkAnswer(theRightAnswer , qCount)
					
					// Remove Previous Question
					quizArea.innerHTML ='';
					answersArea.innerHTML ='';
				   addQuestionData(questionsObject[currentIndex], qCount);	
					
					// Handle Bullets Class
					handleBullets()
					
					// Start countDown
					clearInterval(countdownInterval);
					countdown(60,qCount);
					
					// Show Results
					showResults(qCount);
					
				
				};

			}
		}
		
		myRequest.open("GET","html_questions.json",true);
		myRequest.send();
	};		
			
		getQuestions()	
			
			
	function createBullets(num){
		countSpan.innerHTML = num;
	
		// Create Span 
		for(let i = 0 ; i < num ; i++){
			// Create Bullet
			let theBullet =document.createElement("span")
			   if(i === 0){
				      theBullet.classList = 'on'
			   }
			// Append Bullets To Main Bullet Container
			bulletSpanContainer.appendChild(theBullet);
		}
		
	};	
	

	

	function addQuestionData(obj , count){
			if(currentIndex < count){
				 // create H2 Question Title
			let questionTitle = document.createElement('h2');
			
			// create Question Text 
			let questionText = document.createTextNode(obj['title']);
			
			// Append Text To H2
			questionTitle.appendChild(questionText);
			
			// Append The H2 To The Quiz Area
			quizArea.appendChild(questionTitle);
			
			// Create The Answers
			for(let i = 1 ; i <= 4 ; i++){
				
				// Create Main Answer Div
				let mainDiv = document.createElement('div');
					mainDiv.className ='answer';
				
				// Create Radio Input 
				let radioInput = document.createElement('input');
					radioInput.type ='radio';
					radioInput.name ='questions';
					radioInput.id =`answer_${i}`;
					radioInput.dataset.answer = obj[`answer_${i}`];
			
				// Make First Option Selected
				if(i === 1){
						radioInput.checked = true;
				}
				
				// Create Label
				let theLabel = document.createElement('label');
					theLabel.htmlFor =`answer_${i}`;
				// Create Label Text
				let theLabelText = document.createTextNode(obj[`answer_${i}`]);
				 
				 theLabel.appendChild(theLabelText);
				 mainDiv.appendChild(radioInput)
				 mainDiv.appendChild(theLabel)
				 answersArea.appendChild(mainDiv)
			}
			}		
	}

	
	function checkAnswer(rAnswer , count ){
		 let answers = document.getElementsByName('questions');
		 let theChoosenAnswer;
		 
		 for( let i = 0 ; i <answers.length ; i++){
			 if(answers[i].checked){
				theChoosenAnswer = answers[i].dataset.answer; 
			 }
		 };
		 
		 if(answer === theChoosenAnswer){
			 rightAnswers++;
		 }
	}
	

	
	function checkAnswer(rAnswer , count ){
		 let answers = document.getElementsByName('questions');
		 let theChoosenAnswer;
		 
		 for( let i = 0 ; i <answers.length ; i++){
			 if(answers[i].checked){
				theChoosenAnswer = answers[i].dataset.answer; 
			 }
		 };
		 
		 if(answer === theChoosenAnswer){
			 rightAnswers++;
		 }
		
	};


	function handleBullets(){
		let bulletsSpan = document.querySelectorAll('.bullets span span');
		let arrayOfSpans = Array.from(bulletsSpan);
		arrayOfSpans.forEach((span , index)=>{
			if(currentIndex === index){
				span.className = 'on';
			}
		});
	}


	function showResults(count){
		let theResults;
		if(currentIndex === count){
			quizArea.remove();
			answersArea.remove();
			sumbmitButton.remove();
			bullets.remove();
			
			if(rightAnswers > (count / 2) && rightAnswers < count){
				theResults =`<span class='good'>Good </span>${rightAnswers} From ${count} `;
			}else if(rightAnswers === count){
				theResults =`<span class='perfect'>Perfect </span> , All Answers Is  Perfect.`;
			}else{
				theResults =`<span class='bad'>Bad </span>${rightAnswers} From ${count}`;
			}
			resultsContainer.innerHTML = theResults;
			theResults.style.padding ='10px';
			theResults.style.backgroundColor ='#fff';
			theResults.style.marginTop ='10px';
		}
	}


	function countdown(duration , count){
		if(currentIndex < count){
			let minutes , seconds;
			countdownInterval = setInterval(function(){
				minutes = parseInt(duration / 60);
				seconds = parseInt(duration % 60);
				
			minutes = minutes < 10? `0${minutes}` : minutes;
			seconds = seconds < 10? `0${seconds}` : seconds;
			
			countdownElement.innerHTML =`${minutes}:${seconds}`;
			if(--duration < 0){
				clearInterval(countdownInterval);
				sumbmitButton.click()
			}
				
			},1000)
		}
	}




























