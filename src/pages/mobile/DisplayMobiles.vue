<template>
<div>
    <div v-for="(item) in mobiles" v-bind:key="item.id">
        {{ item.mobile }}
    </div>
</div>
</template>
<script>
export default {
    props:['mobiles']
}
</script>