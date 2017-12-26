function Task(name){
	this.time = 0;
	this.name = name;
	this.status = "PAUSED";
	this.startTime = undefined;

}

Task.prototype.run = function() {
	if (this.status === "PAUSED"){
		this.startInit();
		this.status = "RUNNING";
	} else {
		this.status = "PAUSED";
		this.accumulateTime();
	}
	console.log(this.name, this.status, (this.time/1000))
}

Task.prototype.startInit = function() {
	this.status = "RUNNING";
	this.startTime = Date.now();
}

Task.prototype.accumulateTime = function() {
	this.status = "PAUSED";
	this.time = (this.time + Date.now() - this.startTime);
}

/*Task.prototype.trash = function() {
	if (this.status !== "STOPPED"){
		this.status = "STOPPED"
	//call trash function
	//remove from tasklist
}*/

