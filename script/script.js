
//Parent container for tasks
class TaskList {
	constructor() {
    this.tasks = [];
	}

	addTask() {

		let newTask = new Task(inputText[taskFocus].value);
		this.tasks.push(newTask);
	}
};

//Task template
class Task {
    constructor(name) {
        this._name = name;
        this._time = 0;
        this._status = "PAUSED";
        this._startTime = undefined;
    }

    //Play or pause button
    runStop() {
      if (this._status === "PAUSED"){
    		this._status = "RUNNING";
        this._startTime = Date.now();
    	} else {
    		this._status = "PAUSED";
    		this._time = (this._time + Date.now() - this._startTime);
    	};
			//Display time in hrs/mins/seconds, calculated each time play/pause button is clicked
			const timeInSeconds = (this._time/1000);
			function timeFormat(){
				const roundedTime = Math.round(timeInSeconds);
				let hours = Math.floor(roundedTime / 3600);
				let mins = Math.floor((roundedTime - (hours * 3600)) / 60);
				let secs = roundedTime - (hours * 3600) - (mins * 60);
				if ((hours === 0) && (mins === 0)){
				    return secs + 's ';
				}else if(hours === 0) {
				    return mins + 'm ' + secs + 's ';
				}else{
				    return hours + 'h ' + mins + 'm ' + secs + 's ';
			  }
			};
    	console.log(this._name, this._status, (this._time/1000));
      document.getElementById('task-status').innerHTML = this.status;
			document.getElementById('task-time').innerHTML = timeFormat();
    }

    get name() {
      return this._name;
    }

    get status() {
      return this._status;
    }

    get time() {
      return this._time;
    }
};

//Instance of task to be created.
let nextTaskInstance = 0;

let submitListener = undefined;

function createNewTaskRow(){

	//Define all HTML elements in task row
	let taskRow = document.createElement('div');
	let input = document.createElement('input');
	let submitButton = document.createElement('button');
	let runStopButton = document.createElement('button');
	let taskStatus = document.createElement('p');
	let taskTime = document.createElement('p');

	//Define attributes
	input.type = 'text';
	input.value = 'Enter Name Here';
	input.className = 'task' + nextTaskInstance + ' input';
	submitButton.innerHTML = 'SUBMIT';
	submitButton.className = 'task' + nextTaskInstance + ' submit';
	runStopButton.innerHTML = 'RUN/STOP';
	runStopButton.className = 'task' + nextTaskInstance + ' run-stop';
	taskStatus.className = 'task' + nextTaskInstance + ' status';
	taskTime.className = 'task' + nextTaskInstance + ' time';

	//Build taskRow
	document.getElementById('tasklist').appendChild(taskRow);
	taskRow.appendChild(input);
  taskRow.appendChild(submitButton);
	taskRow.appendChild(runStopButton);
	taskRow.appendChild(taskStatus);
	taskRow.appendChild(taskTime);

	//Attach event listeners for each button
	submitListener = document.getElementsByClassName('submit');
	runStopListener = document.getElementsByClassName('run-stop');

  for (let i = 0; i < submitListener.length; i++) {
		submitListener[i].addEventListener('click', function(){
			taskFocus = i;
			console.log('Task ' + taskFocus + ' is in focus. Task name is: ' + inputText[taskFocus].value);
		});
	};

	for (let i = 0; i < runStopListener.length; i++) {
		runStopListener[i].addEventListener('click', function(){
			taskFocus = i;
			console.log('Task ' + taskFocus + ' is in focus. Task name is: ' + inputText[taskFocus].value);
		});
	};

	//Increment for next task
	nextTaskInstance ++
};

//New task button
document.getElementById('new-task').addEventListener("click", function(){createNewTaskRow()});

//Initialize tasklist and taskrow on page load.
createNewTaskRow();
const main = new TaskList;




//Select the focus of a task when a task button is clicked
let taskFocus = 0;
let inputText = document.getElementsByClassName('input')





//Example of standalone operation
function submitInput() {
	document.getElementById('name-input').disabled = true;
	document.getElementById('submit-name').remove();
	document.getElementById('run-pause').style.visibility = 'visible';
}
  document.getElementById('submit-name').addEventListener("click", function(){console.log(main.tasks)});
	document.getElementById('submit-name').addEventListener("click", function(){submitInput()});
	document.getElementById('run-pause').addEventListener("click", function(){main.tasks[0].runStop()});
