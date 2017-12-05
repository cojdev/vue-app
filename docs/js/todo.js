//Create a new Vue instance
new Vue({

    //Bind Vue instance to #app element
    el: "#app",

    //Register data for instance
    data: {
        newTask: "",
        //A counter is used to ensure strikeout animations aren't repeated unnecessarily
        counter: 2,
        //Example values
        taskList: [
            {
                text: "Go shopping",
                checked: false,
                id: 1
            },
            {
                text: "Do homework",
                checked: true,
                id: 0
            }
        ]
    },

    //Derived data
    computed: {
        areAllChecked: function() {
            //Check if every checked property returns true and if there is at least one to-do item
            return this.taskList.every(function(task) {
                return task.checked;
            }) && this.taskList.length > 0;
        }
    },

    //This is where we will hold the methods we want to use in our application
    methods: {
        addTask: function () {
            //Remove whitespace from start and end
            var task = this.newTask.trim();

            if (task) {
                //Add new a task to the start of the task list
                this.taskList.unshift({
                    text: task,
                    checked: false,
                    id: this.counter
                });
                this.counter++;
            }

            this.newTask = "";
        },
        removeTask: function (task) {
            var index = this.taskList.indexOf(task); 
            this.taskList.splice(index, 1);
        },

        checkAll: function(task) {
            //targetValue is set to the opposite of areAllSelected
            var targetValue = this.areAllChecked ? false : true;
            //we use a for loop to set the checked state of all items to the target value
            for (var i = 0; i < this.taskList.length; i++) {
                this.taskList[i].checked = targetValue;
            }
        },

        clearList: function() {
            //Setting taskList to an empty array clears the whole list
            this.taskList = [];
        }
    }
});