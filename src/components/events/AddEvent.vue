<template>
    <form @submit.prevent="addEvent()">
        <b-form-group
            id="event-name"
            label="Name:"
            label-for="input-event-name"
        >
            <b-form-input
            type="text"
            id="input-event-name"
            v-model="form.name"
            required
            :state="nameState"
            name="event_name"
            aria-describedby="input-name-feedback"
            placeholder="Name Event" />
            <b-form-invalid-feedback id="input-name-feedback">
                Enter at least 3 letters
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            id="event-start"
            label="Event Start:"
            label-for="input-event-start"
        >
            <b-form-input
            type="date"
            id="input-event-start"
            v-model="form.be_start"
            required
            name="event_start"
            placeholder="Event start" />
        </b-form-group>
        <b-form-group
            id="event-duration"
            label="Duration:"
            label-for="input-event-duration"
        >
            <b-form-input
            type="number"
            id="input-event-duration"
            v-model="duration"
            required
            name="event_duration"
            placeholder="Duration /day" />
        </b-form-group>
        <b-button type="submit" class="btn btn-success float-right">Buat</b-button>
        <b-button type="button" @click="$bvModal.hide('add-product')" class="btn btn-dark mr-2 float-right">cancel</b-button>
    </form>
</template>
<script>
import { dateFormat } from '@/utils/format'
export default {
    computed:{
        nameState(){
            let namelength = this.form.name.length
            return namelength>2?true:namelength==0?null:false
        },
        be_end(){
            const date = new Date(this.form.be_start)
            date.setTime(date.getTime() + (this.duration * 24 * 60 * 60 * 1000))
            return date
        },
    },
    data(){
        return{
            form:{
                name:'',
                be_start:'',
                be_end:''
            },
            duration:null,
        }
    },
    methods:{
        addEvent(){
            this.form.be_end = dateFormat(this.be_end)
            this.$store.dispatch('addEvent',this.form)
                .then(res=>{
                    console.log(res)
                    this.$bvModal.hide('add-form')
                    this.resetAddForm()
                })
                .catch(err=>{
                   console.log(err)
                })
        },
        resetAddForm(){
            this.form = {
                name:'',
                be_start:'',
                be_end:''
            }
            this.duration = null
        },
    }
}
</script>