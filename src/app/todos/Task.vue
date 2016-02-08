<style lang="sass">
    @import './global.scss';
    $disabled: #bebebe;

    .cs-task{
        background-color: $base-color-lighter;
        color: $text-color;
        border: 1px solid $base-color-darker;
        padding: 10px;
        width:100%;

        .task-component{
            display: inline-block;
            font-size:15pt;
            // @include invisible-button($base-color-darker);

        }
        .task-title{
            margin-left:10px;
        }

        .invisible-button{
            @include invisible-button($base-color-darker);
        }

        .task-completed{
            text-decoration: line-through;
            color: $disabled;
        }

        .complete-state-icon{
            color: darken($disabled, 5%);
        }

        .delete-button{
            color:red;
        }
    }
</style>

<template>
    <div class="cs-task" @dblclick="editTask" >

        <button
            class="fa task-component invisible-button"
            :class="{
                'fa-circle-o':!task.complete,
                'fa-check-circle-o':task.complete,
                'complete-state-icon':task.complete
            }"
            @click="toggleComplete"
            v-if="!taskIsBeingEdited"
        >
        </button>

        <div class="task-component task-title">

            <!-- view task section -->
            <span
                :class="{ 'task-completed':task.complete }"
                v-if="!taskIsBeingEdited"
            >
                {{ task.title }}
            </span>
            <!-- / view task section -->

            <!-- edit task section -->
            <div class="input-group" v-if="taskIsBeingEdited">
                <span class="input-group-btn">
                    <button @click="cancelEdit" type="button" class="btn btn-danger">Cancel</button>
                </span>
                <input  class="form-control"  type="text" v-model="task.title">
                <span class="input-group-btn">
                    <button @click="saveEdit" type="button" class="btn btn-success">Save</button>
                </span>
            </div>
            <!-- / edit task section -->

        </div>

        <button
            class="fa fa-times task-component pull-right invisible-button delete-button"
            @click="destroyTask"
            v-if="!taskIsBeingEdited"
        >
        </button>
    </div>
</template>

<script>
    module.exports = {
        props:[
            'task'
        ],
        data: function (){
            return {
                taskIsBeingEdited: false,
                originalTaskTitle: null
            }
        },
        methods:{
            destroyTask: function (){
                this.$dispatch('destroyTask', this.task);
            },
            toggleComplete: function (){
                this.task.complete = !this.task.complete
            },
            editTask:function (){
                this.originalTaskTitle = this.task.title;
                this.taskIsBeingEdited = !this.taskIsBeingEdited;
            },
            cancelEdit: function (){
                this.task.title = this.originalTaskTitle;
                this.taskIsBeingEdited = !this.taskIsBeingEdited;
            },
            saveEdit: function (){
                this.originalTaskTitle = null;
                this.taskIsBeingEdited = !this.taskIsBeingEdited;
            }
        }
    }
</script>
