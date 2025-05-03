<template>
    <div class="col-md-12">
        <div class="">
            <!-- <div class="marginpadding">
                <h3>Chats</h3>
            </div> -->
            <div class="marginpadding border_bottom">
                <input type="text" class="form-control form-control-ext" v-model="searchtext" @input="fetchchats()" />
            </div>
            <div>
                <div>
                    <ul class=" threads_ul">
                        <template v-for="(item, index) in threadslist">
                            <li class="border_bottom">
                                <div class="li_div" @click="checkThread(item)">
                                    <div class="flex-align-center-start">
                                        <div class="p1020">
                                            <div class="first_letter">
                                                <span v-if="item?.user2obj?.name != null">
                                                    {{ item?.user2obj?.name?.charAt(0) }}
                                                 </span>
                                                 <span v-else><i class='bx bx-user'></i></span>
                                            </div>
                                           
                                        </div>
                                        <div>
                                            <div>
                                                {{ item.user2obj?.name != null ? item.user2obj?.name : item?.usermobile2 }}
                                            </div>
                                            <div>
                                                <p style="margin-bottom:0;font-size: 12px;"
                                                    v-if="lastmessages[item.id]">
                                                    {{ lastmessages[item.id] }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import debounce from 'lodash.debounce';

export default {
    data() {
        return {
            leftDrawerOpen: true,
            threadslist: [],
            lastmessages: [],
            timer: null,
            initialTimer: 6000,
            searchtext: '',
            loading: -1,
            spinnerclass: 'spinner-border spinner-border-sm counter',

        }
    },
    mounted() {
        this.getApi([])
        // this.fetchchats()
    },
    computed: {

    },
    methods: {
        fetchchats: debounce(
            function(){
                let param = { searchtext: this.searchtext }
                this.getApi(param)
            },500
        ),
        
        getApi(param){
            this.$store.commit('assignloadingstatus',1)
            axios.post('api/threads/fetch', param)
                .then(response => this.processThreads(response.data))
                .catch(error => console.log(error));
        },
        processThreads(data) {
            this.threadslist = data.threads;
            this.$store.commit('assignthreads', data.threads)
            this.$store.commit('assignloadingstatus',0)

            // let threadids = this.threadslist.map(a => a.id)
            // let param = { chatids: threadids.join() }
            // axios.post('api/threads/chats', param)
            //     .then(response => this.processLastThreadMessages(response.data))
            //     .catch(error => console.log(error));
        },
        // processLastThreadMessages(data) {
        //     this.lastmessages = data.messages
        // },
        checkThread(item){
            this.$store.commit('assignloadingstatus',2)
            this.$store.commit("assignfetchmessagepayload", { threadid: item.id })
            this.$store.commit('assignselectedthread',item)
            this.$store.dispatch("fetchMessages");
            setTimeout(() => {
                this.$store.commit('assignloadingstatus',0)
            }, 1000);

        }
    },
}
</script>
<style>


.threads_ul {
    list-style: none;
    padding: 0;
    height: 520px;
    overflow-y: scroll;
    margin-bottom: 0px;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #fff;
}
::-webkit-scrollbar-thumb {
  background: #1b1d2fc4; 
  border-radius: 10px;
}

.li_div {
    padding: 5px 0px;
    cursor: pointer;
}
.li_div:hover {
    background-color: #bccef6;
}
</style>