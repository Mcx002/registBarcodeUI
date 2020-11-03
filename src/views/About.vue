<template>
  <div class="about">
    cek
    <h1 v-for="(value,i) in this.participants" :key="i">{{ value.name }}</h1>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data(){
    return{
      participants:[]
    }
  },
  mounted(){
    this.getParticipants()
  },
  methods:{
    async getParticipants(){
      await axios.get('v1/participants')
        .then(({data})=>{
          this.participants=data.data
          console.log(this.participants)
        })
    }
  }
}
</script>
