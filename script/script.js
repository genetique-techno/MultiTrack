class TaskList {
	constructor() {
    this.tasks = [];
	}

	addTask() {

		let newTask = new Task(document.getElementById('name-input').value);
		this.tasks.push(newTask);
	}
};

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

	const main = new TaskList;
	function submitInput() {
		document.getElementById('name-input').disabled = true;
		document.getElementById('submit-name').remove();
		document.getElementById('run-pause').style.visibility = 'visible';
	}
  document.getElementById('submit-name').addEventListener("click", function(){main.addTask()});
	document.getElementById('submit-name').addEventListener("click", function(){submitInput()});
	document.getElementById('run-pause').addEventListener("click", function(){main.tasks[0].runStop()});
