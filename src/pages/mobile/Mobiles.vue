<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <button class="bt add-mobile" v-if="!checkformore" type="button" @click="addmore()"><i class='bx bx-mobile'></i>&nbsp;Add</button>
             <table v-if="mobiles!=null">
                <tr v-for="(item) in mobiles" v-bind:key="item.id">
                    <td>
                        {{ item.mobile }}
                    </td>
                    <td>  
                    <span style="float:right;margin-left:35px;color:red;"  type="button" @click="deleteoperation(item)" ><i class='bx bx-x'></i></span>
                    </td>
                    <td>
                        <span style="float:right;margin-left:15px;color:#f2a009;"  title="Not Verified !" alt="Not Verified !" type="button" ><i class="fa fa-exclamation-circle"></i></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-12" >
            <div v-if="checkformore">
            <div style="margin-bottom: 9px;">
                <div class="" >
                    <input  class="form-control form-cascade-control input-small"  maxlength="10" @keypress="onlyNumber" type="text" v-model="newmobile.mobile" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="save()"><i class='bx bx-check'></i></span>
                    </div>
                </div>
            </div>
                <button class="btn btn-primary" style="width: 68px;height: 30px;margin-top: 2px;" type="button" @click="cancel()">Cancel</button>
            </div>
            
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            newmobile:{id:0,mobile:''},
            addnew:false
        }
    },
    mounted(){
        
    },
    computed:{
        checkformore(){
            if(this.mobiles==null || this.mobiles.length==0 ){
                return true;
            }
            if(this.addnew){
                return true;
            }
            return false;
        },
       ...mapGetters([
		      'mobiles'
		]),
        
    },
    methods:{
        addmore(){
            this.newmobile = {id:0,mobile:''}
            this.addnew = true;
        },
          onlyNumber ($event) {
   //console.log($event.keyCode); //keyCodes value
           let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
            $event.preventDefault();
              }
           },
        save(){
            console.log(this.mobiles)
            console.log(this.newmobile)
            this.$store.commit('updateappendmobile',this.newmobile)
            this.newmobile = null
            this.addnew = false;
            // console.log(this.newmobile)
        },
        cancel(){
            this.newmobile = null
            this.addnew = false;
        },
        deleteoperation(item){
            this.$store.commit("deletemobile",item)
        },
        
    }
}
</script>
<style scoped>
.bt:hover{
    background-color: #1f6707 !important;
}
.input-group-append{
    position: absolute;
    top: 0px;
    right: 16px;
    color: green;
    font-size: 23px;

}
</style>