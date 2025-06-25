<template>
    <div>
         <!-- <tr>
            <td v-if="loggedinuser!=null && loggedinuser.role==3" colspan="7" style="border:none;">
            
            </td>
        </tr> -->
        <div class="text-end">
            <button type="button"  class="btn text-white btn-secondary btn-sm" @click="add()">Add</button>
        </div>
        <!-- <table style="width:80%" class="table-sm">
            <tr v-for="(item) in operations" v-bind:key="item.id"
                style="float:left;margin-left:5px;margin-right:5px;width:30%;">
                <td><user-operation-checkbox :operationid="item.id" :type="type"></user-operation-checkbox>
                    {{ item.operation }}({{ item.id }})
                </td>
            </tr>
        </table> -->
        <div class="row">
            <div class="col-md-4 mb-10" v-for="(item) in operations" v-bind:key="item.id" >
                <user-operation-checkbox :operationid="item.id" :type="type"></user-operation-checkbox>
                    {{ item.operation }}({{ item.id }})
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import UserOperationCheckbox from './UserOperationCheckbox.vue'
// import Constants from './Constants.vue';
export default {
    // mixins:[Constants],
    components: { UserOperationCheckbox },
    props: ['moduleid', 'type'],
    computed: {
        ...mapGetters([
            'accessmodules', 'loggedinuser', 'accessoperations'
        ]),
        operations() {
            let found = this.accessmodules.find(block => block.id == this.moduleid)
            if (typeof found !== 'undefined') {
                return found.operations;
            }
            return [];
        }
    },
    methods: {
        deleteoperation(item) {
            this.$store.commit('assignloadingstatus', 1)
            let param = { id: item.id }
            axios.post('api/access/modules/operation/delete', param)
                .then(response => this.processResponse(response.data))
                .catch(error => this.showError(error));
        },
        processResponse(data) {
            this.$store.commit('assignloadingstatus', 0)
            this.$store.commit('updateappendaccessmodules', data)
        },
        add() {
            let obj = { id: 0, moduleid: this.moduleid, operation: '' }
            this.$store.commit('assignedititem', obj)
            this.$store.commit('assignviewno', 3)
            // this.$router.push({ name: 'moduleoperation' })
        },
        showError() {
            this.$store.commit('assignloadingstatus', 0)
            alert("Something went wrong, please try again")
        }
    }
}
</script>