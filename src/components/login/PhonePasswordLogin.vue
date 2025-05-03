<template>
    <div>
        <div class="col-md-12 mb-20">
                <div class="form-group">
                <div class="extr_textbox5 t1-left">
                    <label>Phone Number</label>
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">+91</span>
                    </div>
                    <input type="number" v-model="phNo" class="form-control" placeholder="Phone Number" @focus="displayError = false" >
                    </div> <!-- input-group.// -->
            </div> <!-- form-group// -->
            <div class="form-group">
                <div class="extr_textbox5 t1-left">
                    <label>Password</label> 
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-lock"></i></span>
                    </div>
                    <input type="password" v-model="password" class="form-control" placeholder="Password" @focus="displayError = false" />
                    </div> <!-- input-group.// -->
            </div> <!-- form-group// -->
            <div class="form-group">
                <button type="submit" @click="loginwithpassword()" class="btn btn-primary btn-block col-md-12"> Login  </button>
            </div>
            <div class="extr_textbox5 t1-left">
                        <a href="#" @click= "hidescreen()">Forget Password ?</a>
                </div>
        </div>
    </div>
</template>
<script>
import api from '../../lib/utils/Axios'
export default {
    data(){
        return{
            phNo: '',
            password:'',
        }
    },
    methods:{
        loginwithpassword(){
    		let vm = this;
    		let param = {mobile:this.phNo,password:this.password};
    		api.post('api/loginwithmobilepassword',param)
				.then(response=>vm.parent().processResponse(response.data))
				.catch(error=>console.log(error));
    	},
    }
}
</script>