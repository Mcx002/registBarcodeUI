<template>
    <div>
        <form @submit.prevent="addParticipant()">
            <b-row>
                <b-col>
                    <b-form-group
                        label="Email:"
                        label-for="email"
                    >
                        <b-form-input v-model="form.email" required type="email" placeholder="contoh: Udin@gmail.com" name="email" id="email" />
                    </b-form-group>
                    <b-form-group
                        label="Nama Lengkap:"
                        label-for="name"
                    >
                        <b-form-input v-model="form.name" required type="text" placeholder="contoh: Udin" name="name" id="name" />
                    </b-form-group>
                    <b-form-group
                        label="Kelas:"
                        label-for="kelas"
                    >
                        <b-form-input v-model="form.roomclass" required type="text" placeholder="contoh: 12 RPL 1" name="kelas" id="kelas" />
                    </b-form-group>
                </b-col>    
                <b-col>
                    <b-form-group
                        label="Asal Sekolah:"
                        label-for="sekolah"
                    >
                        <b-form-input v-model="form.school" required type="text" placeholder="contoh: SMKN 1 Subang" name="sekolah" id="sekolah" />
                    </b-form-group>
                    <b-form-group
                        label="Alamat:"
                        label-for="alamat"
                    >
                        <b-form-textarea v-model="form.address" required rows="4" type="text" placeholder="contoh: Blok megantropus elektrus, Jln. megalodon RT/RW 23/52 Kec. BlackBeard - Subang" name="alamat" id="alamat" />
                    </b-form-group>
                </b-col>    
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="success" type="submit" class="float-right">Tambahkan</b-button>
                </b-col>
            </b-row>
        </form>
        <div class="loading" v-show="isBusy">
            <div class="load-text">
                Loading
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props:{
        event_code:String
    },
    computed:{
        ...mapGetters({
            isBusy:'getParticipantsLoad'
        })
    },
    data(){
        return{
            form:{}
        }
    },
    methods:{
        addParticipant(){
            this.$swal({
                icon:'question',
                title:'Apa kamu yakin?',
                text:'Email yang didaftarkan akan mendapatkan barcode untuk memasuki acara.',
                showCancelButton:true,
            }).then((result)=>{
                if(result.isConfirmed){
                    this.form = {
                        ...this.form,
                        event_code:this.event_code
                    }
                    // console.log(this.form)
                    this.$store.dispatch('addParticipant',this.form)
                        .then((data)=>{
                            // console.log(data)
                            if(data.status === 200){
                                this.$bvModal.hide('add-participant')
                            }else{
                                this.$swal({
                                    icon:'error',
                                    title:'Gagal',
                                    text:'Tidak bisa mendaftarkan email yang sama'
                                })
                            }
                        })
                        .catch(err=>{
                            this.$swal('Something went wrong')
                            console.log(err)
                        })
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .loading{
        top:0;
        left:0;
        width:100%;
        height:100%;
        position:absolute;
        background:rgba(255,255,255,0.5);
        .load-text{
            position: absolute;
            left: 50%;
            top: 43%;
            transform: translate(-50%, -50%);
        }
    }
</style>