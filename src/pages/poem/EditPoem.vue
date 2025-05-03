<template>
<div>
    <div class="col-md-12">
        <h4>Add New Poem</h4>
    </div>
    <div class="col-md-12 mb-40">
        <div class="panel-body">
            <div class="col-md-6">
                <div class="col-md-12 mt-10  display-flow-root">
                    <label for="">Poem Content</label>
                    <textarea type="text" rows="16" class="form-control" v-model="poemtext" />
                </div>
            </div>
            <div class="col-md-6 ">
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 1 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option1"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 2 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option2"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 3 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option3"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 4 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option4"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 5 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option5"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 6 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option6"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 7 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option7"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 8 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option8"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 9 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option9"></div>
                </div>
                <div class="col-md-12 mt-10 ">
                    <div class="col-md-4"><label for=""> Option 10 :</label></div>
                    <div class="col-md-8"><input type="text" class="form-control" v-model="option10"></div>
                </div>

            </div>
            
        </div>
        
        <div class="col-md-8 mt-30 text-center flex-around-row" style="wrap:no-wrap">
            <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">Save</button>
            <q-spinner-hourglass color="blue" v-if="issave" size="3em"/>
            <button class="btn btn-danger cancel-btn" @click="cancel()">Cancel</button>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            edititem:null,
            poemtext: '',
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            option5: "",
            option6: "",
            option7: "",
            option8: "",
            option9: "",
            option10: "",
            id: "",
        }
    },
    computed:{
        
    },  
    mounted() {
        let poemid = this.$route.params.poemid
        if(poemid){
            let param = {poemid:poemid}
            axios.post("api/poem/fetchbyid",param)
                .then(response => this.setValuesOfPoem(response.data))
                .catch(error => console.log(error));
        }
    },
    methods: {
        setValuesOfPoem(data){
            this.edititem = data.poem
            if(this.edititem!=null){
                
                this.poemtext= this.edititem.poemtext,
                this.option1= this.edititem.option1,
                this.option2= this.edititem.option2,
                this.option3= this.edititem.option3,
                this.option4= this.edititem.option4,
                this.option5= this.edititem.option5,
                this.option6= this.edititem.option6,
                this.option7= this.edititem.option7,
                this.option8= this.edititem.option8,
                this.option9= this.edititem.option9,
                this.option10= this.edititem.option10,
                this.id= this.edititem.id
            }
        },
        submit(){
            this.issave=true
            let param={id:this.id,poemtext:this.poemtext,option10:this.option10,
                option1:this.option1,option2:this.option2,option3:this.option3,option4:this.option4,option5:this.option5,
                option6:this.option6,option7:this.option7,option8:this.option8,option9:this.option9,
            }
            axios.post("api/poem/createupdate",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(){
            this.issave=false
            this.$router.push({path:'/poems'})
        },
        cancel(){
            this.$router.push({path:'/poems'})
        }
    },
}
</script>
<style scoped>
.save-btn{
    width: 30%;
    font-size: 15px;
}
</style>