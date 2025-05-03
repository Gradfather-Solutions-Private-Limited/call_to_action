<template>
	<div>
	<div class="row justify-content-md-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                	<div class="col-md-12">
                    	<div class="row">
                    		
                    		<div class="col-md-8 t1-left">
                    			<div class="extr_textbox2"> Create Account</div>
                    			<div class="extr_textbox3">Set up Account</div>
                    			<div></div>
                    		</div>
                    	</div>
                	</div>
                </div>
                <div class="card-body">
                   
	
	<form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
		<div class="row justify-content-md-center">
			<div class="col-md-12">
						<div class="row">
							<div class="col-md-12" v-if="form.referralurl!=null">
									<div class="extr_textbox5 t1-left">
										<label>Refferal Id:</label>
									</div>
									<div class="input-group">
										<div class="input-group-prepend">
								    <span class="input-group-text"> <i class="fa fa-question-circle"></i></span>
								</div>
										<input type="text" class="form-control " name="referralurl" v-model="form.referralurl" readonly>
										<span class="invalid-feedback" role="alert">
											<strong></strong>
										</span>
										<div class="col-md-12 form-error"><span class="help is-danger" v-text="form.errors.get('referralurl')"></span></div>
								    </div> <!-- input-group.// -->
								    <div class="extr_textbox5 t1-left">
										<label>{{ getreferralname }}</label>
									</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-6">
										<div class="extr_textbox5 t1-left">
											<label>First Name:</label>
										</div>
										<div class="input-group">
											<div class="input-group-prepend">
											    <span class="input-group-text"> <i class="fa fa-user"></i></span>
											</div>
											<input type="text" class="form-control" name="name" v-model="form.firstname" required>
											<span class="invalid-feedback" role="alert">
												<strong></strong>
											</span>
											<div class="col-sm-15 form-error"><span class="help is-danger" v-text="form.errors.get('name')"></span></div>
										</div> <!-- input-group.// -->
							   </div>
							   <div class="col-sm-6">
										<div class="extr_textbox5 t1-left">
											<label>Last Name:</label>
										</div>
										<div class="input-group">
											<div class="input-group-prepend">
											    <span class="input-group-text"> <i class="fa fa-user"></i></span>
											</div>
											<input type="text" class="form-control" name="name" v-model="form.lastname" required>
											<span class="invalid-feedback" role="alert">
												<strong></strong>
											</span>
											<div class="col-sm-15 form-error"><span class="help is-danger" v-text="form.errors.get('name')"></span></div>
										</div> <!-- input-group.// -->
							   </div>
					    </div>
					    
					    
					       
						   <div class="row">
								<div class="col-md-12">
							
									<div class="extr_textbox5 t1-left">
										<label>Phone Number:</label>
									</div>
									<div class="input-group">
										<div class="input-group-prepend">
								         <span class="input-group-text"> <i class="fa fa-mobile"></i></span>
								        </div>
										<input type="number" class="form-control " name="mobile" v-model="form.mobile" required>
										<span class="invalid-feedback" role="alert">
											<strong></strong>
										</span>
										<div class="col-md-12 form-error"><span class="help is-danger" v-text="form.errors.get('mobile')"></span></div>
								    </div> <!-- input-group.// -->
								    
								 </div>
							</div>
				 <!-- form-group// -->
				  <div class="row">
								<div class="col-md-12">
							
									<div class="extr_textbox5 t1-left">
										<label>E-Mail:</label>
									</div>
									<div class="input-group">
										<div class="input-group-prepend">
								         <span class="input-group-text"> <i class="fa fa-envelope"></i></span>
								        </div>
										<input type="text" class="form-control " name="email" v-model="form.email" required>
										<span class="invalid-feedback" role="alert">
											<strong></strong>
										</span>
										<div class="col-md-12 form-error"><span class="help is-danger" v-text="form.errors.get('email')"></span></div>
								    </div> <!-- input-group.// -->
								    
								 </div>
							</div>
				 <!-- form-group// -->
				
				<div class="row">
					<div class="col-md-12">
						<div class="extr_textbox5 t1-left">
							<label>Password:</label>
						</div>
						<div class="input-group">
							<div class="input-group-prepend">
							    <span class="input-group-text"> <i class="fa fa-lock"></i></span>
							</div>
							<input type="password" class="form-control" name="name" v-model="form.password" required>
							
							<div class="col-md-12 form-error"><span class="help is-danger" v-text="form.errors.get('password')"></span></div>
						</div> <!-- input-group.// -->
					</div> <!-- form-group// -->
					
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="extr_textbox5 t1-left">
							<label>Confirm Password:</label>
						</div>
						<div class="input-group">
							<div class="input-group-prepend">
							    <span class="input-group-text"> <i class="fa fa-lock"></i></span>
							</div>
							<input type="password" class="form-control" name="name" v-model="form.password_confirmation" required>
							
							<div class="col-md-12 form-error"><span class="help is-danger" v-text="form.errors.get('password_confirmation')"></span></div>
						</div> <!-- input-group.// -->
					</div> <!-- form-group// -->
					
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="extr_textbox5 t1-left">
							<label>Gender:</label>
						</div>
						<div class="input-group">
						<label>
							<input type="radio" v-model="form.gender" value="0" name="gender" id="male" style="margin:5px;">Male 
                        </label>
    
                        <label>
							<input type="radio" value="1" v-model="form.gender" name="gender" id="male" style="margin:5px;">Female
                        </label>	
                        					
                        </div> <!-- form-group// -->
					</div>
					
				</div>
				
				
				<div class="row">
					<div class="col-md-12">
						<div class="extr_textbox5 t1-left">
							<label></label>
						</div>
						<div class="extr_textbox5 t1-left">
							<button class="btn btn-success ext-btncsss">Submit</button>
						</div>
						<div class="row m-top-10">
				<div class="container signin">
                 <p>Already have an account? <a href="#" @click="singinpop()">Sign in</a>.</p>
                </div>
				
				
				</div>
					</div> <!-- form-group// -->
					
				</div>
			
	
			
				
			</div>
		 </div>
		</form>
      </div>
   </div>
  </div>
 </div>
 </div>
</template>

<script>
import api from '../../lib/utils/Axios'
    export default {
    	components: {
    	  },
    	data(){
    		return {
    			user:null,
    			varifyotp:1,
    		      form : new window.Form({
    		    	  id:'',lastname:'',firstname:'',password:'',password_confirmation:'',
    		    	  email:'',mobile:'',referralurl:null,'gender':''
    		      }),
    		    referraluser:null
    		}
    	},
    	mounted(){
    		
    	},
    	computed:{
    		getreferralname(){
    			if(this.referraluser){
    				return this.referraluser.name
    			}
    			return '';
    		}
    	},
    	created(){
    		const urlParams = new URLSearchParams(window.location.search);
	    	this.form.referralurl=urlParams.get('referralurl');
	    	if(this.form.referralurl!=null){
	    		let param = {username:this.form.referralurl}
	    		api.post('user/getuserbyusername',param)
				.then(response=>this.processUserResponse(response.data))
				.catch(error=>console.log(error));
	    	}
    	},
    	methods:{
    		singinpop(){
    			this.$store.commit('assignviewno',3)
    		},
    		processUserResponse(data){
    			if(Object.keys(data).length>0){
    				this.referraluser = data;
    			} else {
    				if(this.form.referralurl!=null){
    					this.form.referralurl = null;
    				}
    			}
    		},
    	    onSubmit:function(){
    	    	this.form.submit('post','register/register')
        			.then(response=>this.onSuccess(response))
        			.catch(error=>console.log(error));
    	    	
    	    },
    	    onSuccess:function(data){
    	    	window.location.href=data.redirect;
    	    },
    	}
    }
    	
</script>

