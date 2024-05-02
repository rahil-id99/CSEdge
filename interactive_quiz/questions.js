
var ques;
var correctScore = 0;
var wrongScore = 0;
var tempQuesArray;
var tempObj;
var count=120;
var time;

var sillyQuestions=[
	{
		question:"What's your status?",
		questionType:1,
		choices:["Single","Committed","Complicated","I don't know","I don't give a damn"],
		correctChoice: "Single",
		score:10
	},
	{
		question:"Who was Jamie Lanister in the castle?",
		questionType:1,
		choices:["His girlfriend","Tyrion's girlfriend","Tywin's girlfriend","His sister","I don't give a damn"],
		correctChoice: "His sister",
		score:10
	},
	{
		question:"Do you like GOT?",
		questionType:2,
		correctChoice: "Yes",
		score:10
	},
	{
		question:"Is dil ka kya karoon?",
		questionType:1,
		choices:["Phek de","khishe me rakh","paani pe","I don't know","I don\'t give a damn"],
		correctChoice: "I don\'t give a damn",
		score:10
	},
	{
		question:"Dil aakhir tu kyu roota hai?",
		questionType:1,
		choices:["Ainvayi","Break up","Patch up","Web 1 homework","Tere baap ka kya jaata hai?"],
		correctChoice: "Ainvayi",
		score:10
	}
]/*
var GKQuestions=[
  {
    question:"Which town on the Isle of Wight has hosted an annual Regatta since 1851?",
    questionType:1,
    choices:["Bournemouth","Cowes Bay","Cowes","Gosport","Pune"],
    correctChoice: "Cowes",
    score:10
  },
  {
    question:"What measure is used to measure the warmth of a duvet?",
    questionType:1,
    choices:["Tron","Tog","Trug","Softie","None"],
    correctChoice: "Tog",
    score:10
  },
  {
    question:"Jimmy Somerville fronted which 1980s band?",
    questionType:2,
    correctChoice: "Bronski Beat",
    score:10
  },
  {
    question:"The Mocha coffee bean is named after what?",
    questionType:1,
    choices:["A type of sacking","A camel","A type of chocolate","A port","Coffee"],
    correctChoice: "A port",
    score:10
  },
  {
    question:"What is or are the machair?",
    questionType:1,
    choices:["No idea","Don't know","No clue", "Next question Please", "waiting for next question"],
    correctChoice: "No idea",
    score:10
  }
]
*/
var csQuestions=[
	
	{
		question:"Which of the following is the binary representation of 4 5/8?",
		questionType:1,
		choices:["110.101","100.101","10.011","100.11","I don't know"],
		correctChoice: "100.101",
		score:10
	},
	{
		question:"Which of the following bit patterns represents the value 5 in two’s complement notation?",
		questionType:1,
		choices:["11111011","00000101","11110011","00011010","I don't give a damn"],
		correctChoice: "00000101",
		score:10
	},
	{
		question:"Which of the following storage systems is best suited for storing and retrieving long strings of data that are processed in their sequential order?",
		questionType:1,
		choices:["Magnetic disk","Magnetic disk","Optical CDs and DVDs","Floppy","Pendrive"],
		correctChoice: "Optical CDs and DVDs",
		score:10
	},
	{
		question:"A digital circuit capable of holding a single digit",
		questionType:2,
		correctChoice: "Flip-flop",
		score:20
	},
	{
		question:"A major standardization organization within the United States",
		questionType:2,
		correctChoice: "ANSI",
		score:20
	}		
	
]

var category=[
	{
		qType: "Silly Questions",
		questions: sillyQuestions
	},
	{
		qType: "Computer Science",
		questions: csQuestions
	}
]



/***
	Called on: choose button.
	Function: Displays the questions and the options
**/
function populate(){

var today = new Date();
	document.getElementById('date').innerHTML = today.getMonth()+ " / "+ today.getDate() + " / " + today.getFullYear();
	var titleIndex = Math.floor(Math.random()*category.length);
	var item = category[titleIndex];
	document.getElementById("subject").innerHTML = item.qType.toString();
}

/**
	Called by: Start button
	Function: This function displays the first question and hides the start button
**/
function start(){
	if(document.getElementById("subject").innerHTML == "Quiz Application"){
		alert("Please chose a topic");
	}
	else{
		document.getElementById("choose").style.visibility='hidden';
		timedCount();
		traverse();
		document.getElementById("start").style.visibility='hidden';
	}

}

/**
	Called from: traverse()
	Function: This function will return the index of the question type
**/
function catIndex(){

	var titleValue= $('#subject').html();	
	switch(titleValue){
		case "Silly Questions":
		return 0;
		break;

		case "Computer Science":
		return 1;
		break;
	}
}
/**
	Called by: start() and displayNext()
	Function: This function will randomly display the questions and options/textbox
**/
function traverse(){
	

	var categoryIndex = catIndex();									//index of the category object
	tempQuesArray = category[categoryIndex].questions;				//question type of the category
	
	//last question left
	if(tempQuesArray.length == 1){
			document.getElementById("next").remove();
			document.getElementById("submit").style.visibility='visible';
	}
	tempObj = tempQuesArray.pop();									//stores the popped object		
	answer = tempObj.correctChoice;									//stores the answer of the question

	
	document.getElementById("question").innerHTML = tempObj.question.toString();  
	if(tempObj.questionType == 2){
    // code for handling text buttons
            $("#answer").html('<label>Answer : </label>' +
            '<input type="text" name="textbox" id="answerText" value="" >');
	}
	else if (tempObj.questionType == 1){
	//code for handling radio entry 
       	var choicesHtml="";
       	var currentQuestion = 0;
        var i;

        for (i = 0; i < tempObj.choices.length; i++) 
            {
                choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
                "' class='choice' value='" + tempObj.choices[i] + "'>" +						
                " <label for='choice'>" + tempObj.choices[i] + "</label><br>";
                document.getElementById("answer").innerHTML = choicesHtml;
            } 
	}
}

/**
	Called on: next button
	Function: This function checks and updates the score
**/
function updateScore(){

	//document.getElementById("temp").innerHTML = tempObj.correctChoice.toString();
	if(tempObj.questionType == 2){
    // code for handling text entry
    	//check if the user entered value is equal to the answer
    	if(document.getElementById("answerText").value == tempObj.correctChoice.toString()){			
    			correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore; 
    	}
    	else{
    		wrongScore += 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore; 	
    	}
	}
	else if (tempObj.questionType == 1){

	//code for handling radio entry        		
    $(".choice").each(function() {
        if($(this).is(':checked')){      	
        	if($(this).val() == tempObj.correctChoice.toString()){
        		correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore; 		
        	}
        	else{
        	wrongScore = wrongScore + 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore;		
        	}
        }
    });

	}	
		traverse();
}

/**
	Called on: next button
	Function: This function first checks the result and then calls the traverse question
**/
function displayNext(){
	updateScore();
}

/**
	Called by: timedCount()
	Function: This function stops the countdown
**/	
function stopCount()
{
	clearTimeout(time);
}

/**
	Called on: start button
	Function: This function starts the countdown
**/
function timedCount()
{
	document.getElementById('timer').innerHTML=count;
	count=count-1;
	if(count==0)
	{

		alert("time over");
		submit();
		stopcount();
	}
	
	time=setTimeout("timedCount()",1000);
}

/**
	Called on: submit button
	Function: This function displays the final score 
**/
function submit(){

	//1. remove the question and options
	document.getElementById("question").style.visibility='hidden';
	document.getElementById("answer").style.visibility='hidden';
	
	//2. display the score 
	document.getElementById("displayScore").style.visibility='visible';
	document.getElementById("displayScore").innerHTML="Your score: "+document.getElementById("rightScore").innerHTML;

	//3. Stop timer
	stopCount();
	
}

/**
	Called on: quit button
	Function: This function quits the quiz and displays the final score 
**/
function quit(){
	var x;
	if(document.getElementById("subject").innerHTML != "Quiz Application"){
	    if (confirm("Press a button!") == true) {
    		submit();
    	}
	}
}
