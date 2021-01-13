<template>
    <div class="col-md-6 box-register">
        <h1>Register</h1>
        <form @submit.prevent="regist()">
            <b-form-group
            id="name"
            label="Name:"
            label-for="input-name"
            >
                <b-form-input id="input-name" v-model="form.name" placeholder="name" type="text" name="name" />
            </b-form-group>
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
                <b-form-input id="input-password" v-model="form.password" placeholder="password" type="password" name="password" />
            </b-form-group>
            <b-form-group
            id="phone"
            label="Phone:"
            label-for="input-phone"
            >
                <b-form-input id="input-phone" v-model="form.phone" placeholder="phone" type="number" name="phone" />
            </b-form-group>
            
            <b-form-group
            id="gender"
            label="Gender:"
            label-for="input-gender"
            >
                <b-form-select id="input-gender" v-model="form.gender" :options="[{value:'L',text:'Laki - laki'},{value:'P',text:'Perempuan'}]" size="sm" class="mt-3"></b-form-select>
            </b-form-group>
            <button class="btn btn-success float-right" type="submit">Regist</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                name:'',
                email:'',
                password:'',
                phone:'',
                gender:''
            }
        }
    },
    methods:{
        regist(){
            this.$store.dispatch("register",this.form)
                .then(res=>{
                    console.log({res:res})
                    this.$router.push('/')
                })
                .catch(err=> console.log({err:err}))
        }
    }
}
</script>

<style lang="scss">
.box-register{
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}
</style>