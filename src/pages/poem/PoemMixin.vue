<script>
import moment from 'moment'
export default{
    data(){
		return {
			selected_start_time:moment().format('YYYY-MM-DD'),
            selected_end_time:moment().format('YYYY-MM-DD'),
            start_time:9,
            end_time:17,
		}
	},
}
</script>