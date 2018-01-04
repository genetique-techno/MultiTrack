//parent container for tasks
class TaskList {
	constructor() {
    this.tasks = [];
	}

	addTask() {

		let newTask = new Task(document.getElementById('name-input').value);
		this.tasks.push(newTask);
	}
};

//task template
class Task {
    constructor(name) {
        this._name = name;
        this._time = 0;
        this._status = "PAUSED";
        this._startTime = undefined;
    }

    //play or pause button
    runStop() {
      if (this._status === "PAUSED"){
    		this._status = "RUNNING";
        this._startTime = Date.now();
    	} else {
    		this._status = "PAUSED";
    		this._time = (this._time + Date.now() - this._startTime);
    	};
			//display time in hrs/mins/seconds, calculated each time play/pause button is clicked
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

function createNewTaskRow(){
	//instance of task
	let taskInstance = 0;
	//define all HTML elements in task row
	let taskRow = document.createElement('div');
	let input = document.createElement('input');
	let submitButton = document.createElement('button');
	let playPauseButton = document.createElement('button');
	let taskStatus = document.createElement('p');
	let taskTime = document.createElement('p');

	input.type = 'text';

	document.getElementById('tasklist').appendChild(taskRow);
	taskRow.appendChild(input);
  taskRow.appendChild(submitButton);
	taskRow.appendChild(playPauseButton);
	taskRow.appendChild(taskStatus);
	taskRow.appendChild(taskTime);

}

	const main = new TaskList;
	function submitInput() {
		document.getElementById('name-input').disabled = true;
		document.getElementById('submit-name').remove();
		document.getElementById('run-pause').style.visibility = 'visible';
	}

  document.getElementById('submit-name').addEventListener("click", function(){main.addTask()});
	document.getElementById('submit-name').addEventListener("click", function(){submitInput()});
		document.getElementById('new-task').addEventListener("click", function(){createNewTaskRow()});
	document.getElementById('run-pause').addEventListener("click", function(){main.tasks[0].runStop()});
