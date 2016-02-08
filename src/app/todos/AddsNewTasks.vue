<style lang="sass">
    @import './global.scss';

    .cs-adds-new-tasks{
        background-color: #ebebee;
        padding: 10px;

        button{
            @include invisible-button($base-color-darker);
        }
    }
</style>

<template>
    <div class="cs-adds-new-tasks">
        <div class="input-group">
            <span class="input-group-addon">
                <button class="fa fa-plus" @click="addTask"></button>
            </span>
            <input
                name="newTask"
                class="form-control"
                type="text"
                v-model="task"
                placeholder="{{ placeholderText }}"
                @keyup.enter="addTask"
            >
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
