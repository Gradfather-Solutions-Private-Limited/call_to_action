<script>
import { mapGetters } from 'vuex'
export default {
	computed:{
		...mapGetters([
			'loggedinuser'
		]),
	},
	methods:{
		accessid(id){
			if(this.loggedinuser!=null){
				if(this.loggedinuser.role==3 || (this.loggedinuser.accessids!=null && this.loggedinuser.accessids.includes(id))){
					return true
				}
			}else{
				return false
			}
		},
	}
}
</script>