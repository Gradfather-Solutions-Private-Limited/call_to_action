<template>
    <div class="container mt-2">
        <hr>
        <div>
            <h4 class="text-center">Customer's KYC Documents</h4>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Photo </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option value="photo">Profile Photo</option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Profile Photo')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Signature </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option value="photo">Signature</option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Signature')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Adhaar Card Front</label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option  value="3">
                                    Adhaar Card
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Adhaar Card Front')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Adhaar Card Back </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option  value="3">
                                    Adhaar Card
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file"  @change="fileUpload($event,'Adhaar Card Back')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Address Proof </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon" @change="addressFront($event)">
                                <option v-for="item in documents" :value="item.id" :key="item.id">
                                    {{ item.name }} 
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,this.addressfronttitle)">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Address Proof Back </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon" @change="addressBack($event)">
                                <option v-for="item in documents" :value="item.id" :key="item.id">
                                    {{ item.name }} 
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,this.addressfronttitle)">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Electricity bill</label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option  value="8">
                                    Electricity bill
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Electricity bill')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Passbook</label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option  value="6">
                                    Passbook
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Passbook')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Salary Slip</label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option  value="7">
                                    Salary Slip
                                </option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Salary Slip')">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Pan Number </label>
                    </div>
                    <div class="col-sm-7">
                        <div class="input-group" style="display:flex;">
                            <select class="form-control input-group-addon">
                                <option value="pan">Pan</option>
                            </select>
                            <input accept="image/*" class="form-control" type="file" @change="fileUpload($event,'Pan')">
                        </div>
                    </div>
                </div>

                
                <div class="col-md-12" v-if="submitbtn==1" >
                    <div class="d-flex gap-2 justify-content-center py-5">
                        <button @click="this.$emit('backtopage', 0)" class="btn btn-primary">Submit</button>
                        <button @click="this.$emit('backtopage', 0)" class="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import UploadMixin2 from "../../components/utilities/UploadMixin2.vue";
export default {
    mixins: [UploadMixin2],
    props: ['userid','submitbtn'], 
    data() {
        return {
            fronttitle:'Passport',
            backtitle:'Passport',
            addressfronttitle:'Passport',
            addressbacktitle:'Passport',
            documents : [
                { 'id':1, 'name':'Passport'},
                { 'id':2, 'name':'Driving License ' },
                { 'id':3, 'name':'Adhaar Card ' },
                { 'id':4, 'name':'Voter Id ' },
                { 'id':5, 'name':'Ration Card' },
                { 'id':6, 'name':'Passbook' },
                { 'id':7, 'name':'Salary Slip' },
                { 'id':8, 'name':'Electricity bill' },
            ] ,
           
        }
    },
    methods : {
        fileUpload(event,title){
            let obj = { 'type': 5, 'directorypath': '', 'counter': 0, 'typeid': 0, 'typeint':18, 'width':1000, 'height':1000 }
            this.$store.commit('assignfilecomponents', obj);
            let param = {'title' : title,'customerid':this.userid}
            this.$store.commit('assignfieldjson',param)
            this.documentUpload(event);
        },
        uploaded(){
            alert("Uploaded successfully.")
        },
        frontId(event){
            this.fronttitle = this.documents.find(o=>o.id==event.target.value).name +" front"
        },
        backId(event){
            this.backtitle = this.documents.find(o=>o.id==event.target.value).name + " Back"

        },
        addressFront(event){
            this.addressfronttitle = this.documents.find(o=>o.id==event.target.value).name + " Front"
        },
        addressBack(event){
            this.addressbacktitle = this.documents.find(o=>o.id==event.target.value).name + " Back"
        }
    }
}
</script>
<style scoped>
label {
    margin: 0px;
}
</style>