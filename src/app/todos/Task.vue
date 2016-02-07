<style lang="sass">
    @import './global.scss';

    .cs-task{
        background-color: $base-color;
        color: $text-color;
        border: 1px solid $base-color-darker;
        padding: 10px;
    }
</style>

<template>
    <div class="cs-task">
        {{ task | json }}
    </div>
</template>

<script>
    module.exports = {
        props:[
            'task'
        ]
    }
</script>
