
const tasks = {
  tasks: [
    {
      text:'Grocery Shopping',
      completed:true
    }, {
      text:'Clean yard',
      completed:false
    }, {
      text:'Clean yard',
      completed:false
    },{
      text:'Cook meal',
      completed:true
    }
  ],
  getTasksToDo() {
   this.tasks.filter((value) => {
      return value.completed == true
    }).forEach((task) =>{
      console.log(task.text)
    })
  }
}

tasks.getTasksToDo();
