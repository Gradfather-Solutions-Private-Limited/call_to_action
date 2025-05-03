<template>
    <div class="col-md-12">
        <div class=" webnavbg">
            <div class="nav nav-tabs scrollmenu" id="nav-tab" role="tablist" style="margin-bottom: 25px;">
                <a style="font-size: 25px;width: 50%;padding-left: 25%;cursor: pointer;"
                    :class="newactiveclass + [(shownavtab == '0' ? 'active' : '')]" @click="changetab(0)">
                    <i class="glyphicons user"></i>
                    Personal Detail</a>
                <a style="font-size: 25px;width: 50%;padding-left: 25%;cursor: pointer;"
                    :class="newactiveclass + [(shownavtab == '1' ? 'active' : '')]" @click="changetab(1)">Menu</a>

            </div>
        </div>
    </div>
    <div id="snackbar">{{ errmsg }}</div>
    <div class="col-md-12" v-if="shownavtab == '0'">
        <div class="row">
            <div class="col-md-9">
                <div class="card">
                    <h5 class="card-header">Company</h5>
                    <div class="card-body">
                        <p class="card-text">
                        <div class="row">
                            <div v-for="item in logoimages" class="col-md-3">
                                <div class="col-md-12">
                                    <img :src=item.fullurl style="width: 100%;">
                                </div>
                                <div class="col-md-12 row" style="margin-top: 5px;margin-left: 0px;">
                                    <div class="col-md-6">
                                        <div class="col-md-12" style="font-weight: bold">Width: {{ item.width }}</div>
                                        <div class="col-md-12" style="font-weight: bold">Height: {{ item.height }}</div>
                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn btn-danger" @click="removeimages(item)"><span
                                                class="">Delete</span></button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        </p>
                        <div class="col-md-12 row">
                            <div class="col-md-4" style="padding: 10px">
                                <label><b>Email</b></label>
                                <input type="text" v-model="email" class="form-control">
                            </div>
                            <div class="col-md-4" style="padding: 10px">
                                <label><b>Company Name</b></label>
                                <input type="text" v-model="companyname" class="form-control">
                            </div>
                            <div class="col-md-4" style="padding: 10px">
                                <label><b>Name</b></label>
                                <input type="text" v-model="name" class="form-control">
                            </div>
                            <div class="col-md-6" style="padding: 10px">
                                <label><b>Mobile</b></label>
                                <input type="text" v-model="mobile" class="form-control">
                            </div>
                            <div class="col-md-6" style="padding: 10px;margin-top: 23px;">
                                <button class="btn btn-success " @click="addnewadd()">
                                    <i class='bx bx-save'></i> Add Address
                                </button>
                            </div>
                            <div class="col-md-12 row" v-show="addshow">
                                <div class="col-md-8 row">
                                    <div class="col-md-6" style="padding: 10px">
                                        <label><b>Landmark</b></label>
                                        <input type="text" v-model="landmark" class="form-control">
                                    </div>
                                    <div class="col-md-3" style="padding: 10px">
                                        <label><b>City</b></label>
                                        <input type="text" v-model="city" class="form-control">
                                    </div>
                                    <div class="col-md-3" style="padding: 10px">
                                        <label><b>State</b></label>
                                        <input type="text" v-model="state" class="form-control">
                                    </div>
                                    <div class="col-md-3" style="padding: 10px">
                                        <label><b>Country</b></label>
                                        <input type="text" v-model="country" class="form-control">
                                    </div>
                                    <div class="col-md-3" style="padding: 10px">
                                        <label><b>Zipcode</b></label>
                                        <input type="text" v-model="zipcode" class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-4" style="padding: 10px">
                                    <label><b>Address</b></label>
                                    <textarea rows="5" cols="50" v-model="address" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>S.no</th>
                                                <th>Edit</th>
                                                <th>Landmark</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Address</th>
                                                <th>Country</th>
                                                <th>Zipcode</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in  listdata.addressess">
                                                <td>{{ index + 1 }}</td>
                                                <td><i class='bx bx-edit' @click="setaddvalue(item)" style="font-size: 24px;"></i></td>
                                                <td>{{ item.landmark ? item.landmark : '' }}</td>
                                                <td>{{ item.city ? item.city : '' }}</td>
                                                <td>{{ item.state ? item.state : '' }}</td>
                                                <td>{{ item.address ? item.address : '' }}</td>
                                                <td>{{ item.country ? item.country : '' }}</td>
                                                <td>{{ item.zipcode ? item.zipcode : '' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="save_form()"><span class="">Save</span></button>
                        </div>
                        <!-- <p class="card-text">
                                <label><b>Email</b></label>
                                <input type="text" v-model="email" class="form-control">
                            </p> -->
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <company-logo></company-logo>
            </div>
        </div>
    </div>
    <div class="col-md-12" v-if="shownavtab == '1'">
        <div class="">
            <div class="col-md-12">
                <div class="card">
                    <!-- <h5 class="card-header">Company2</h5> -->

                    <div class="card-body">
                        <div class="col-md-12  row" style="border: 1px solid #bdb8b8;margin-left: 1px;">
                            <h5 class="card-header">Get Url</h5>
                            <div class="col-md-3" style="padding: 10px">
                                <div class="autocomplte-div">
                                    <label><b>Find Url</b></label>
                                    <input type="search" v-model="productsearch" class="form-control"
                                        @input="chnageinput">
                                    <div class="autocomplete-items" v-show="autoVisibility">
                                        <ul class="autocomplte-continer">
                                            <li v-for="item in listproduct">
                                                <a href="javascript:void(0);" @click="selectedvalue(item)">{{ item.name
                                                    }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3" style="padding: 10px">
                                <div class="autocomplte-div">
                                    <label><b>Categories</b></label>
                                    <input type="search" v-model="valuesearch" class="form-control"
                                        @input="getallcategories(valuesearch)">
                                    <div class="autocomplete-items" v-show="autoVisibility1">
                                        <ul class="autocomplte-continer">
                                            <li v-for="item in listcategories">
                                                <a href="javascript:void(0);" @click="selectedvalueurl(item)">{{
                        item.name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3" style="padding: 10px">
                                <div class="autocomplte-div">
                                    <label><b>Parent Menu</b></label>
                                    <select v-model="form.parent_menu_id" class="form-control">
                                        <option value="0">Select Menu</option>
                                        <option v-for="item in namelist" :key="item.id" :value="item.id">{{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 row" style="border: 1px solid #bdb8b8;margin: 15px 1px 15px 0px;">
                            <h5 class="card-header">Add Menu</h5>
                            <div class="col-md-3" style="padding: 10px">
                                <label><b>Name</b></label>
                                <input type="text" v-model="form.name" class="form-control">
                                <input type="hidden" v-model="form.id" class="form-control">
                                <div v-if="msg.name" style="color: red;">{{ msg.name }}</div>
                            </div>
                            <div class="col-md-3" style="padding: 10px">
                                <label><b>Href</b></label>
                                <input type="text" v-model="form.href" class="form-control">
                                <div v-if="msg.href" style="color: red;">{{ msg.href }}</div>
                            </div>
                            <div class="col-md-3" style="padding: 10px">
                                <label><b>Icon Class</b></label>
                                <input type="text" v-model="form.iconclass" class="form-control">
                            </div>
                            <div class="col-md-1" style="padding: 10px">
                                <label><b>View Port</b></label>
                                <input type="checkbox" v-model="form.platform"
                                    style="margin-top: 10px;margin-left: 25px;">
                            </div>
                            <div class="col-md-2" style="padding: 35px">
                                <button class="btn btn-danger"
                                    style="background-color: rgb(0 129 235 / 85%);border-color: blanchedalmond;"
                                    @click="save_info()"><span class="">Save</span></button>
                            </div>
                        </div>
                        <div>
                            <table class="table" cellspacing="0" style="width: 100%; overflow-x: scroll;">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Href</th>
                                        <th>Icon Class</th>
                                        <th>Parent Menu</th>
                                        <th>View Port</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in namelist">
                                        <td style="font-size: 15px;">{{ item.name }}</td>
                                        <td style="font-size: 15px;">{{ item.href }}</td>
                                        <td style="font-size: 15px;">{{ item.iconclass }}</td>
                                        <td style="font-size: 15px;">{{ pmenu(item.parentmenuid) }}</td>
                                        <td><input type="checkbox" :checked="checkplatform(item.platform)"
                                                @click="checkplatformupdate(item)"></td>
                                        <td><a href="javascript:void(0);" @click="editlistdata(item)"><i
                                                    class='bx bxs-edit-alt'
                                                    style="font-size: 25px;text-decoration: none;color: black;"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CompanyLogo from './company/CompanyLogo.vue';
import CategoryAutocomplete from '../components/autocomplete/CategoryAutocomplete.vue';
export default {

    data() {
        return {
            leftDrawerOpen: false,
            users: 0,
            records: 0,
            listdata: [],
            email: '',
            name: '',
            mobile: '',
            address: '',
            landmark: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            companyname: '',
            valuesearch: '',
            logoimages: '',
            apprecords: 0,
            shownavtab: 0,
            errmsg: '',
            msg: [],
            userid: '',
            newactiveclass: 'nav-item nav-link ',
            namelist: [],
            listproduct: [],
            listcategories: [],
            autoVisibility: false,
            autoVisibility1: false,
            productsearch: '',
            companyid: '',
            address_id:'',
            addshow: false,
            form: new Form({
                name: '',
                id: '',
                href: '',
                iconclass: '',
                platform: 0,
                parent_menu_id: 0,
            }),
        };
    },
    watch: {
        loggedinuser(value, oldValue) {
        }
    },
    computed: {
        ...mapGetters(['loggedinuser']),
        email() {
            return this.loggedinuser?.email;
        },

        logo() {
            return this.loggedinuser?.photo;
        }
    },
    mounted() {
        this.refresh();
    },
    methods: {
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen;
        },
        changetab(num) {
            this.shownavtab = num;
        },
        getallcategories(param) {


            axios.get('api/autocomplete/category/search?query=' + param)
                .then(response => {
                    this.autoVisibility1 = true;
                    this.listcategories = response.data;
                })
                .catch(error => console.log(error));
        },
        selectedvalueurl(data) {
            this.autoVisibility1 = false;
            this.valuesearch = data.name;
            this.form.href = 'category/' + data.url;

        },
        chnageinput() {
            if (this.productsearch != '') {
                let param = { searchtxt: this.productsearch }
                axios.post('api/product/category/search', param)
                    .then(response => {
                        this.autoVisibility = true;
                        this.listproduct = response.data.product;
                    })
                    .catch(error => console.log(error));
            } else {
                this.autoVisibility = false;
            }
        },

        selectedvalue(item) {
            this.productsearch = item.name;
            this.form.href = item.url;
            this.autoVisibility = false;
        },
        save_form() {
            let flag = 0;
            if(this.addshow){
                flag = 1;
            }
            let param = {
                email: this.email, company_name: this.companyname, name: this.name, mobile: this.mobile,
                landmark: this.landmark, city: this.city, state: this.state, country: this.country, zipcode: this.zipcode,
                address: this.address, companyid: this.companyid, userid: this.userid,address_id:this.address_id,flag:flag
            }
            axios.post('api/user/companyinfosave', param)
                .then(response => {
                    this.errmsg = "Company Record Updated Successfully";
                    this.addnewadd();
                    this.refresh();
                    this.addshow = false;
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
                })
                .catch(error => console.log(error));
        },
        checkplatform(data) {
            if (data) {
                return true
            } else {
                return false
            }
        },
        save_info() {
            if (this.form.name == '' || this.form.href == '') {
                if (this.form.name == '') {
                    this.msg.name = 'The Name field is required.'
                } else {
                    this.msg.name = ''
                }
                if (this.form.href == '') {
                    this.msg.href = 'The Href field is required.'
                } else {
                    this.msg.href = ''
                }

            } else {
                this.msg = [];
                if (this.form.platform) {
                    this.form.platform = 1;
                } else {
                    this.form.platform = 0;
                }
                this.form.companyid = this.loggedinuser?.companyid
                axios.post('frontend/site/headerfooter/menudatasave', this.form)
                    .then(response => {
                        this.refresh();
                        this.reset();
                    })
                    .catch(error => console.log(error));
            }

        },
        editlistdata(data) {
            let self = this
            Object.keys(this.form, data).forEach(function (key, index) {
                self.form[key] = data[key];
                if (key == 'platform') {
                    if (data[key]) {
                        self.form[key] = true
                    } else {
                        self.form[key] = false
                    }

                }

            });
            this.form.parent_menu_id = data.parentmenuid;
        },
        checkplatformupdate(data) {
            let self = this
            Object.keys(this.form, data).forEach(function (key, index) {
                self.form[key] = data[key];
                if (key == 'platform') {
                    if (data[key]) {
                        self.form[key] = 0
                    } else {
                        self.form[key] = 1
                    }

                }
            });
            axios.post('frontend/site/headerfooter/menudatasave', this.form)
                .then(response => {
                    this.refresh();
                    this.reset();
                })
                .catch(error => console.log(error));
        },
        reset() {
            let self = this
            this.productsearch = '';
            Object.keys(this.form).forEach(function (key, index) {
                self.form[key] = '';
                if (key == 'platform') {
                    self.form[key] = 0
                }

            });
        },
        pmenu(data) {
            if (data == 0) {
                return 'N/A'
            } else {
                let item = this.namelist.find(o => o.id == data)
                if (item) {
                    return item.name
                } else {
                    return 'N/A'
                }
            }

        },
        refresh() {
            axios.post('api/user/fullinfocompany')
                .then(response => {
                    this.logoimages = response.data?.images
                    this.$store.commit('assignproductimages', response.data?.images)
                    this.companyid = response.data.companyid;
                    this.userid = response.data?.user?.id;

                    this.listdata = response.data?.user
                    this.listvalue(this.listdata);
                    this.datalist(response.data?.companyid)
                })
                .catch(error => console.log(error));


        },
        listvalue(data) {

            // let item = data.addressess[0];
            let user = data.user;
            let mobiles = data?.mobiles;
            this.companyname = data.name ? data.name : '';
            this.mobile = mobiles[0].mobile ? mobiles[0].mobile : '';

        },
        setaddvalue(item) {
            this.addshow = true;
            this.address = item.address ? item.address : '';
            this.city = item.city ? item.city : '';
            this.country = item.country ? item.country : '';
            this.name = item.name ? item.name : '';
            this.state = item.state ? item.state : '';
            this.landmark = item.landmark ? item.landmark : '';
            this.zipcode = item.zipcode ? item.zipcode : '';
            this.address_id = item.id?item.id : '';
        },
        addnewadd(){
            this.addshow = true;
            this.address = '';
            this.city = '';
            this.country = '';
            this.name = '';
            this.state = '';
            this.landmark = '';
            this.zipcode = '';
            this.address_id = '';
        },
        removeimages(item) {
            if (confirm("Do you really want to delete") == true) {
                let param = { imageid: item.id }
                axios.post("api/siteadmin/image/remove", param)
                    .then(response => this.processResponse(response.data))
                    .catch(error => console.log(error))
            }
        },
        datalist(data) {
            let param = { companyid: data }
            axios.post('frontend/site/headerfooter/fetch', param)
                .then(response => {
                    this.namelist = response.data.data
                })
                .catch(error => console.log(error));
        },
        processResponse() {
            alert('delete successfully')
            this.refresh();
        },

    },
    components: { CompanyLogo, CategoryAutocomplete }
}
</script>
<style scoped>
.grd-bg-info {
    background-color: #80d3f9;
}

.grd-orange {
    background: #FF9933;
}

.bg-green,
.bg-green>.small-box-footer {
    background-color: #138808;
    color: black;
}

.grd-white {
    background: white;
    color: black;
}

.grd-white-color {
    color: black;
}

.chakra {
    background-image: url(../assets/flagchakra2.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

}

.inner {}

#snackbar {
    visibility: hidden;
    width: 271px;
    background-color: #3ad1d9;
    color: #fff;
    text-align: left;
    border-radius: 13px;
    padding: 9px;
    position: fixed;
    z-index: 1000;
    right: 3%;
    top: 35%;
    font-size: 16px;
    font-weight: 600;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
</style>