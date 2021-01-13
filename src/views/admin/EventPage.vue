<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button class="btn btn-success mb-2" v-b-modal.add-form>Add Event</b-button>
        <b-modal id="add-form" hide-footer title="Add Form">
          <AddEvent />
        </b-modal>
        <b-modal id="edit-form" hide-footer title="Edit Form">
          <EditEvent :data="editFormValue" />
        </b-modal>
        <b-table :fields="fields" :items="events" :busy="isBusy">
          <template #cell(no)="data">{{ data.index+1 }}</template>
          <template #cell(stat)="data">
            <div class="box-pending" v-show="data.item.active==0"></div>
            <div class="box-active" v-show="data.item.active==1"></div>
            <div class="box-non-active" v-show="data.item.active==2"></div>
          </template>
          <template #cell(aksi)="data">
            <router-link :to="'/dashboard/event/detail/'+data.item.code" class="mr-1"><b-button>Aksi</b-button></router-link>
            <b-button v-b-modal.edit-form @click="setDurationEdit(data.item)" class="mr-1">Edit</b-button>
            <b-button variant="danger" @click="$store.dispatch('deleteEvent',data.item.id)">delete</b-button>
          </template>
          
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle mr-3"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import AddEvent from '@/components/events/AddEvent';
import EditEvent from '@/components/events/EditEvent';

import { mapGetters } from 'vuex'
// import { setHeaderToken } from '@/utils/auth'

export default {
  name: 'Home',
  components:{
    AddEvent,
    EditEvent
  },
  computed:{
    ...mapGetters({
      isLoggedIn:'isLoggedIn',
      events:'getEventList',
      isBusy:'eventLoad'
    }),
    editFormValue(){
      return this.editForm
    }
  },
  data(){
    return{
      fields:[
        {key:'no', label:'No.'},
        {key:'name', label:'Nama'},
        {key:'be_start', label:'Dimulai'},
        {key:'be_end', label:'Berakhir'},
        {key:'stat', label:'Status'},
        {key:'aksi', label:'Aksi'},
      ],
      editForm:{}
    }
  },
  mounted(){
    
    // const token = localStorage.getItem('token')

    // if(token){
    //   setHeaderToken(token)
    // }else{
    //   this.$router.push('/login') 
    // }

    this.$store.dispatch('getUser')
      .then(stat=>{
        if(stat!=1){
          this.$router.push('/login')
        }
      })
    this.$store.dispatch('getEvents')
  },
  methods:{
    checkLogin(){
      // console.log(this.$store.getters.getUser)
    },
    setDurationEdit(data){
      this.editForm = data
    }
  } 
}
</script>
<style lang="scss">
  .box-pending{
    width:20px;
    height:20px;
    background-color:#777;
  }
  .box-active{
    width:20px;
    height:20px;
    background-color:#0aff50;
  }
  .box-non-active{
    width:20px;
    height:20px;
    background-color:#ff2434;
  }
</style>
