console.log("🚀 Program started");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["pending"] = "PENDING";
    TaskStatus["completed"] = "COMPLETED";
})(TaskStatus || (TaskStatus = {}));
var tasks = [];
function addtask(title) {
    var newtask = {
        id: tasks.length + 1,
        title: title,
        status: TaskStatus.pending
    };
    tasks.push(newtask);
    return newtask;
}
function listtasks() {
    console.log("All Tasks");
    tasks.forEach(function (task) {
        console.log("".concat(task.id, ".").concat(task.title, "--").concat(task.status));
    });
}
function marktaskcompleted(id) {
    var task = tasks.find(function (t) { return t.id == id; });
    if (!task) {
        return false;
    }
    task.status = TaskStatus.completed;
    return true;
}
function filtertasks(status) {
    return tasks.filter(function (task) { return task.status == status; });
}
addtask("learn Typescript");
addtask("build task tracker");
addtask("learn Playwright basics");
listtasks();
console.log("Completed tasks", filtertasks(TaskStatus.completed));
console.log("Pending Tasks", filtertasks(TaskStatus.pending));
