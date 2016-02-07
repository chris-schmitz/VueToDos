<style lang="sass">
    @import './global.scss';

    .cs-todo{
        background-color: $base-color;
        width: 80%;
        height: 80%;
    }
</style>
<template>
    <div class="cs-todo panel panel-primary">
        <div class="panel-heading">
            <h2>ToDos</h2>
        </div>
        <!-- note we're not using panel-body here intensionally -->
        <div>
            <cs-adds-new-tasks></cs-adds-new-tasks>
            <div class="" v-for="task in tasks">
                <cs-task :task="task"></cs-task>
            </div>
        </div>
        <div class="panel-footer">
            <cs-display-control></cs-display-control>
        </div>
    </div>
</template>

<script>
    var displayControl = require('./DisplayControl.vue');
    var addsNewTask = require('./AddsNewTasks.vue');
    var task = require('./Task.vue');

    module.exports = {
        components:{
            'cs-adds-new-tasks': addsNewTask,
            'cs-display-control': displayControl,
            'cs-task': task
        },
        data: function (){
            return {
                message: 'From ToDo App Base',
                tasks:[
                    {id: 1, title: 'Walk the dog', complete: false },
                    {id: 2, title: 'Putting away the groceries', complete: false },
                    {id: 3, title: 'write some javascript', complete: true },
                ]

            }
        },
        events:{
            addTask: 'onAddTask'
        },
        methods:{
            onAddTask: function (task){
                var id = this.getNextId();
                var newTask = {id: id, title: task, complete: false};
                this.tasks.push(newTask);
            },
            getNextId: function (){
                var lastTask = this.tasks[this.tasks.length - 1];
                return lastTask !== undefined ? lastTask.id + 1 : 1;
            }
        }
    }
</script>
