<template>
<div v-if="category!=null">
	<div class="txt-decr1">
		<b>{{ category.name }}</b>
	</div>
	<td >
		<div v-for="(filteritem) in category.filters" :key="filteritem.id">
			<filter-check-box :filter="filteritem" :product="product"></filter-check-box>
		</div>
	</td>
</div>
</template>
<script>
import FilterCheckBox from './FilterCheckBox.vue'
export default {
	props:['category','product'],
	components: {
		FilterCheckBox
  	},
}
</script>