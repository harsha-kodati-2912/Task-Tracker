

enum TaskStatus{
    pending ="PENDING",
    completed="COMPLETED"
}

interface task{
    id:number
    title:string
    status:TaskStatus
}

let tasks: task[]=[]

function addtask(title:string):task{
    const newtask:task={
        id:tasks.length+1,
        title,
        status:TaskStatus.pending
    }
    tasks.push(newtask);
    return newtask;
}

function listtasks():void{
    console.log("All Tasks")
    tasks.forEach(task=>{
        console.log(`${task.id}.${task.title}--${task.status}`)
    })
}

function marktaskcompleted(id:number):boolean{
    const task=tasks.find(t=>t.id==id)

    if(!task){
        return false;
    }
    task.status=TaskStatus.completed
    return true;
}

function filtertasks(status:TaskStatus):task[]{
    return tasks.filter(task=>task.status==status)
}

addtask("learn Typescript")
addtask("build task tracker");
addtask("learn Playwright basics");

listtasks();

console.log("Completed tasks",filtertasks(TaskStatus.completed));
console.log("Pending Tasks",filtertasks(TaskStatus.pending))
