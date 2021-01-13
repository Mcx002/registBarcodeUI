<template>
    <div>
        <b-button @click="$router.go(-1)" class="mb-2">back</b-button><br>
        <b-button class="mb-2" variant="success" v-b-modal.add-participant>Add Participant</b-button>
        <b-modal id="add-participant" hide-footer title="Add Participant" size="lg">
            <AddParticipant :event_code="code" />
        </b-modal>
        <br>
        
        <b-table :fields="fields" :items="participants" :busy="isBusy">
          <template #cell(no)="data">{{ data.index+1 }}</template>
          <template #cell(mail_send)="data">
              <div v-if="data.item.mail_send=='Y'" class="text-success">Terkirim</div>
              <div v-else class="text-warning">Belum dikirim</div>
          </template>
          <template #cell(aksi)="data"><router-link :to="'event/detail/'+data.item.id"><b-button>Aksi</b-button></router-link></template>
          
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AddParticipant from '@/components/participant/AddParticipant'
export default {
    components:{
        AddParticipant
    },
    computed:{
        ...mapGetters({
            participants:'getParticipants',
            isBusy:'getParticipantsLoad'
        })
    },
    data(){
        return{
            code:this.$route.params.code,
            fields:[
                {key:'no'},
                {key:'name', label: 'Nama'},
                {key:'email', label: 'Email'},
                {key:'school', label: 'Sekolah'},
                {key:'mail_send', label: 'Mail Send'},
            ]
        }
    },
    mounted(){
        this.$store.dispatch('getParticipants',{event_code:this.code})
        console.log(this.event_code)
    }
}
</script>