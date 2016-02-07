var Vue = require('vue');
var ToDoApp = require('./todos/ToDoApp.vue');

new Vue({
    el: 'body',
    components:{
        'cs-todo': ToDoApp
    }
});
