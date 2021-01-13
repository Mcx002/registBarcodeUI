<template>
    <div style="text-align:left" class="col-md-6">
        <div v-show="load">Loading</div>
        <b-container class="box-login">
            <b-row>
                <b-col v-show="!load">
                    <h1>Login</h1>
                    <form @submit.prevent="login()">
                        <b-form-group
                        id="email"
                        label="Email:"
                        label-for="input-email"
                        >
                            <b-form-input id="input-email" v-model="form.email" placeholder="email" type="email" name="email" />
                        </b-form-group>
                        <b-form-group
                        id="password"
                        label="Password:"
                        label-for="input-password"
                        >
                            <b-form-input id="input-password" v-model="form.password" placeholder="password" type="password" />
                        </b-form-group>
                        <button class="btn btn-success" type="submit">Login</button>
                    </form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
    data(){
        return{
            form:{
                email:'',
                password:''
            }
        }
    },
    computed:{
        ...mapGetters({
            load:'getLoginLoad'
        })
    },
    methods:{
        login(){
            this.$store.dispatch("login",this.form)
                .then(res=>{
                    console.log({res:res})
                    this.$router.push('/')
                })
                .catch(err=>{
                    this.$swal(err.message)
                    console.log({err:err})
                })
        }
    }
}
</script>
<style lang="scss">
.box-login{
    position:absolute;
    left:50%;
    margin-top:100px;
}
</style>