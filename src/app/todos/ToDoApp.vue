<style lang="sass">
    @import './global.scss';

    .cs-todo{
        background-color: $base-color;
        width: 80%;
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
            <div class="" v-for="task in tasks | filterBy filterTasksBySelectedState">
                <cs-task :task="task"></cs-task>
            </div>
        </div>
        <div class="panel-footer">
            <cs-display-control :active-item-count="activeItemCount"></cs-display-control>
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
                activeFilter: 'All',
                tasks:[
                    {id: 1, title: 'Walk the dog', complete: false },
                    {id: 2, title: 'Putting away the groceries', complete: false },
                    {id: 3, title: 'write some javascript', complete: true },
                ]
            }
        },
        computed:{
            activeItemCount: function (){
                return this.tasks.reduce(function (carry, current){
                    return carry + (current.complete !== true ? 1 : 0);
                },0);
            }
        },
        events:{
            addTask: 'onAddTask',
            destroyTask: 'onDestroyTask',
            filterTaskListToShow: 'onFilterTaskListToShow',
            destroyAllComplete: 'onDestroyAllComplete'
        },
        methods:{
            onAddTask: function (task){
                var id = this.getNextId();
                var newTask = {id: id, title: task, complete: false};
                this.tasks.push(newTask);
            },
            onDestroyTask: function (task){
                // note we're handling this hear instead of in the task
                // component because we want to remove it from the full array
                // contained in this instance. i.e. any adding or removing
                // to/from teh array should happen in the instance where the
                // array is.
                this.tasks.$remove(task);
            },
            getNextId: function (){
                var lastTask = this.tasks[this.tasks.length - 1];
                return lastTask !== undefined ? lastTask.id + 1 : 1;
            },
            onFilterTaskListToShow: function (state){
                this.activeFilter = state;
            },
            filterTasksBySelectedState: function (task, index, tasks){
                if(this.activeFilter === 'All'){
                    return true;
                } else if (this.activeFilter === 'Active') {
                    return task.complete !== true;
                } else if (this.activeFilter === 'Complete') {
                    return task.complete === true;
                }
            },
            onDestroyAllComplete: function (){
                var activeTasks = this.tasks.map(function (task){
                    if(task.complete !== true){
                        return task;
                    }
                }, this).filter(function (task){
                    return task !== undefined;
                });
                this.tasks = activeTasks
            }
        }
    }
</script>
