//Create a new Vue instance
var app = new Vue({

    //Bind Vue instance to #app element
    el: "#app",

    //Register data for instance
    data: {
        newTask: "",
        //A counter is used to ensure strikeout animations aren't repeated unnecessarily
        counter: 7,
        //Example values
        taskList: [
            {
                text: "Buy christmas presents",
                checked: false,
                starred: true,
                id: 1
            },
            {
                text: "Send invoice",
                checked: false,
                starred: true,
                id: 2
            },
            {
                text: "Do homework",
                checked: true,
                starred: false,
                id: 3
            },
            {
                text: "Go shopping",
                checked: false,
                starred: false,
                id: 4
            },
            {
                text: "Make To-do List",
                checked: true,
                starred: true,
                id: 5
            }
        ],
        activeList: [],
        loaded: false
    },

    created: function () {
        if (localStorage.getItem("savedList")) {
            this.taskList = JSON.parse(localStorage.getItem("savedList"));
            console.log("LOADED LOCAL LIST");
        }
        this.activeList = this.taskList;
        this.loaded = true;
    },
    
    watch: {
        taskList: {
            handler: function () {
                localStorage.setItem('savedList', JSON.stringify(this.taskList));
            },
            deep: true
        }
    },

    //Derived data
    computed: {
        taskCount: function () {
            return this.taskList.length;
        },
        checkCount: function () {
            return this.checkedList.length
        },
        areAllChecked: function() {
            //Check if every checked property returns true and if there is at least one to-do item
            return this.taskList.every(function(task) {
                return task.checked;
            }) && this.taskList.length > 0;
        },
        checkedList: function () {
            return this.taskList.filter(function (self) {
                return self.checked;
            })
        },
        uncheckedList: function () {
            return this.taskList.filter(function (self) {
                return !self.checked;
            })
        },
        starredList: function () {
            return this.taskList.filter(function (self) {
                return self.starred;
            })
        }
        
    },

    //This is where we will hold the methods we want to use in our application
    methods: {
        queryList: function (list) {
            return this.activeList === list;
        },
        addTask: function () {
            //Remove whitespace from start and end
            var task = this.newTask.trim();

            if (task) {
                //Add new a task to the start of the task list
                this.taskList.push({
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

        removeChecked: function () {
            this.taskList = this.taskList.filter(function (self) {
                return self.checked === false;
            })
            this.activeList = this.taskList;
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