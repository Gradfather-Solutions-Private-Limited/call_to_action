<template>
      <div class="card">
                        <h5 class="card-header">Company Logo</h5>
                        <div class="card-body">
                            <p class="card-text">

                                <div class="row">
                                        <div class="col-md-6">   
                                            <label><b>Select Size</b></label>
                                            <select class="form-control" v-model="sizeindexrow" @change="chnagesize(1)">
                                                <option v-for="(size,sizeindex) in imagessizes" :value="sizeindex">{{size.width}}x{{size.height}}</option>
                                            </select>
                                        </div>
                                    <div class="col-md-6">
                                        <label><b>Number of Image</b></label>
                                        <input v-if="imagecountfun" type="number" v-model="imagecount" class="form-control "/>
                                    </div>
                                        <div class="col-md-12 upladbox-cat" v-if="open==1">
                                            <input type="file"  id="attach_file" name="files"  @change="processFile2($event)" style="padding-top: 17px;padding-bottom: 29px;" >
                                        </div>
                                </div>
                            </p>
                        </div>
    </div>
   

</template>
<script>
import { mapGetters } from 'vuex';
import UploadMixin from '../../components/utilities/UploadMixin2.vue';

export default {
    mixins:[UploadMixin],
    data(){
        return {
            open: 0,
            imagessizes:[{ width:90, height:50},{ width:120, height:120},{ width:436, height:140}],
            imagecount:0,
        }
    },
    computed:{
        ...mapGetters([
            'loggedinuser','productimages'
        ]),
        imagecountfun: function() {
            this.productimages;
            return true;
        }
    },
    methods:{
        Uploaded(){
            this.$parent.refresh();
        },
        chnagesize(item){
                this.open=item
                var selectrow = [];
                selectrow =  this.imagessizes[this.sizeindexrow];
                let listimg = this.productimages.filter(obj => obj.width === selectrow.width && obj.height === selectrow.height);
               
                this.imagecount = 1;
                
                if(listimg.length > 0){
                    this.imagecount = listimg.length+1;
                }
                
                let obj = {'type':10,'width':selectrow.width,'height':selectrow.height,'directorypath':'logo','counter':this.imagecount,'typeid':this.loggedinuser.companyid}
                this.errortext = "Image size should be "+selectrow.width+"*"+selectrow.height;
                console.log(obj);
                this.$store.commit('assignfilecomponents',obj);

            // let obj = {'type':2,'width':item.width,'height':item.height,'directorypath':'product/'+this.$route.params.productid,'counter':1,'typeid':this.productid}
            // console.log(obj);
            // this.$store.commit('assignfilecomponents',obj);
        },
    }
    
}
</script>