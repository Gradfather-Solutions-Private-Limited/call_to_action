<template>
<div>
    <select v-model="selectedproduct">
        <option v-for="(item) in otherproducts" :value="item.id" v-bind:key="item.id">{{ item.name }}</option>
    </select>
    <div v-for="(item) in allproducts" v-bind:key="item.id">
        <input type="checkbox" :value="item.id" v-model="checkedids">{{ item.name }}
    </div>
    <button type="button" @click="cancel()">Cancel</button>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            checkedids:[],
            selectedproduct:0
        }
    },
    computed:{
        otherproducts(){
            console.log(this.filteredproducts)
            let obj2 = this.filteredproducts.map(a => a.id);
            return this.allproducts.filter(block=>!obj2.includes(block.id))
        },
        ...mapGetters([
			'allproducts','viewno','filteredproducts'
		]),
    },
    methods:{
        cancel(){
            this.$store.commit('assignviewno',1)
        }
    }
}
</script>