
//Parent container for tasks
class TaskList {
	constructor() {
    this.tasks = [];
		this.nextTaskInstance = 0;
	}

	createNewTaskRow() {

		//Define all HTML elements in task row
		let taskRow = document.createElement('div');
		let input = document.createElement('input');
		let submitButton = document.createElement('button');
		let runStopButton = document.createElement('button');
		let taskStatus = document.createElement('p');
		let taskTime = document.createElement('p');

		//Define attributes
		taskRow.className = 'task-row';
		input.type = 'text';
		input.value = 'Enter Name Here';
		input.className = 'task ' + this.nextTaskInstance + ' input';
		submitButton.innerHTML = 'SUBMIT';
		submitButton.className = 'task ' + this.nextTaskInstance + ' submit';
		runStopButton.innerHTML = 'RUN/STOP';
		runStopButton.className = 'task ' + this.nextTaskInstance + ' run-stop';
		taskStatus.className = 'task ' + this.nextTaskInstance + ' status';
		taskTime.className = 'task ' + this.nextTaskInstance + ' time';

		//Build taskRow
		document.getElementById('tasklist').appendChild(taskRow);
		taskRow.appendChild(input);
	  taskRow.appendChild(submitButton);
		taskRow.appendChild(runStopButton);
		taskRow.appendChild(taskStatus);
		taskRow.appendChild(taskTime);

		let taskNum = this.nextTaskInstance;
		submitButton.addEventListener('click', () => {
			this.tasks.push(new Task(input.value));
			input.disabled = true;
			submitButton.disabled = true;
			runStopButton.style.visibility = 'visible';
		});
		runStopButton.addEventListener('click', () => {
			this.tasks[taskNum].runStop();
			taskStatus.innerHTML = this.tasks[taskNum].status;
			taskTime.innerHTML = this.tasks[taskNum].timeFormat();
		})

		this.nextTaskInstance ++
	};


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
    	console.log(this._name, this._status, (this._time/1000));
    }

		//Display time in hrs/mins/seconds, calculated each time play/pause button is clicked
		timeFormat(){
			const timeInSeconds = (this._time/1000);
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


//New task button
document.getElementById('new-task').addEventListener("click", function(){main.createNewTaskRow()});


//Initialize tasklist and taskrow on page load.
const main = new TaskList;
main.createNewTaskRow();
