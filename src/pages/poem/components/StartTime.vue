<template>
    <label for="ap">Start time:</label>
    <input type="date" v-model="selected_start_time">
    <select v-model="start_time">
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">1</option>
        <option value="14">2</option>
        <option value="15">3</option>
        <option value="16">4</option>
        <option value="17">5</option>
        <option value="17">6</option>
    </select>
</template>
<script>
import PoemMixin from '../PoemMixin.vue';

export default {
    mixins:[PoemMixin]
}
</script>