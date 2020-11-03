<template>
    <div>
        <form @submit.prevent="login()">
            <input ref="email" placeholder="email" type="email" />
            <input ref="password" placeholder="password" type="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
        }
    },
    methods:{
        login(){
            const form = new FormData();
            form.append("user_email",this.$refs.email.value)
            form.append("user_password",this.$refs.password.value)
            axios.post("http://175.126.176.102/opoapi/public/api/user/login",form)
            .then(res=>console.log(res))
            .catch(err=>console.log({err:err}))
            // console.log(this.$refs)
            // this.$store.dispatch("login",{
            //     email:this.$refs.email.value,
            //     password:this.$refs.password.value
            // })
            //     .then(res=>{
            //         console.log({res:res})
            //         this.$router.push('/')
            //     })
            //     .catch(err=> console.log({err:err}))
        }
    }
}
</script>