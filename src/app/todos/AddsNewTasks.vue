<style lang="sass">
    @import './global.scss';

    .cs-adds-new-tasks{
        background-color: #ebebee;
        padding: 10px;

        button{
            background-color: Transparent;
            background-repeat: no-repeat;
            border: none;
            color: $base-color-darker;
        }
    }
</style>

<template>
    <div class="cs-adds-new-tasks">
        <div class="input-group">
            <span class="input-group-addon">
                <button class="fa fa-chevron-down" @click="addTask"></button>
            </span>
            <input name="newTask" class="form-control" type="text" v-model="task" placeholder="{{ placeholderText }}">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function (){
            return {
                placeholderText: 'What needs to be done?',
                task: null
            }
        },
        methods:{
            addTask: function (){
                this.$dispatch('addTask', this.task);
                this.task = null
            }
        }
    }
</script>
