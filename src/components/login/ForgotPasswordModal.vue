<template>
    <div name="forgetpassword">
    	<div class="modal-header">
	        <h5 class="modal-title">Forget Password</h5>
    	</div>
    	<div class="row m-top-10">
			<div class="col-md-4"><span > New Password </span></div>
			<div class="col-md-6"><span> 
				<input type="password" class="form-control">
		 	</span></div>
		</div>
		<div class="row m-top-10">
			<div class="col-md-4"><span > Confirm Password </span></div>
			<div class="col-md-6"><span> 
				<input type="password" class="form-control">
		 	</span></div>
		</div>
		<div class="modal-footer">
			<button  @click="forgetpassubmit()" class="btn btn-primary">Submit</button>
		</div>
    </div>
</template>
<script>

import api from '../../lib/utils/Axios'
export default {
	
    methods:{
		forgetpassubmit(){
			let param = {password:this.newpassword,confpassword:this.confirmpassword};
    		api.head('forget/password',param)
			.then(response=>this.parent().processResponse(response.data))
			.catch(error=>console.log(error));
			alert("Password Changed")
		
		},
	}
}
</script>