class TaskList {
	constructor() {
    this.tasks = [];
	}

	addTask() {

		let newTask = new Task(prompt());
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
    	}
    	console.log(this._name, this._status, (this._time/1000));
      document.getElementById('text').innerHTML = this.name + ' ' + this.status + ' ' + this.time;
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
