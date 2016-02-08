<style lang="sass">
    @import './global.scss';

    .display-control-container{

        > div{
            display: inline-block;
            width: 33%;
        }

        .column-left{
            float: left;
        }
        .column-right{
            float: right;
            text-align:right;
        }
        .column-center{
            text-align:center;
        }

        button{
            @include invisible-button(black);
        }
        .filter-button-container{

                button:focus{
                    outline: 0;
                }

            .selected{
                background-color: $base-color-lighter;
                border: 1px solid $base-color-darker;
                padding: 3px;
                @include border-radius(10%);
            }
        }
    }
</style>

<template>
    <div class="display-control-container">

        <div class="column-left"><b>{{ activeItemCount }}</b> Active Items</div>

        <div class="column-center filter-button-container">
            <button @click="changeFilterTo('All')" :class="{ 'selected': this.currentFilter == 'All' }">All</button>
            <button @click="changeFilterTo('Active')" :class="{ 'selected': this.currentFilter == 'Active' }">Active</button>
            <button @click="changeFilterTo('Complete')" :class="{ 'selected': this.currentFilter == 'Complete' }">Complete</button>
        </div>

        <div class="column-right">
            <button @click="destroyComplete" >Delete Complete</button>
        </div>

    </div>
</template>

<script>
    module.exports = {
        props:{
            activeItemCount: 'active-item-count'
        },
        data: function (){
            return {
                currentFilter: 'All'
            }
        },
        methods:{
            changeFilterTo: function (state){
                this.currentFilter = state;
                this.$dispatch('filterTaskListToShow', state);
            },
            destroyComplete: function (){
                this.$dispatch('destroyAllComplete');
            }
        }
    }
</script>
