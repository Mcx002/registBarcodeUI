import axios from 'axios'
import {setHeaderToken,removeHeaderToken} from '@/utils/auth'

export default{
    state:{
        user:null,
        isLoggedIn:false,
        loginLoad:false,
    },
    getters:{
        getUser(state){
            return state.user
        },
        isLoggedIn(state){
            return state.isLoggedIn
        },
        getLoginLoad(state){
            return state.loginLoad
        }
    },
    mutations:{
        setCurrentUser:(state, payload)=>{
            state.user = {id:payload.id,email:payload.email,name:payload.name}
            state.isLoggedIn = true
        },
        resetCurrentUser:(state)=>{
            state.user = null
            state.isLoggedIn = false
        },
        setLoginLoadTrue:(state)=>{
            state.loginLoad = true
        },
        setLoginLoadFalse:(state)=>{
            state.loginLoad = false
        }
    },
    actions:{
        register: ({commit},payload)=>{
            return new Promise((resolve,reject)=>{
                axios.post('v1/auth/regist',payload)
                    .then(({data,status})=>{
                        if(status===200){
                            const token = data.data
                            setHeaderToken(token) 
                            localStorage.setItem("token",token)
                            resolve(data)
                        }
                    })
                    .catch(err=>{
                        commit("resetCurrentUser")
                        localStorage.removeItem("token")
                        reject(err)
                    })
            })
        },
        login: ({commit}, payload) => {
            commit("setLoginLoadTrue")
            return new Promise((resolve, reject) => {
                axios.post('v1/auth/login', payload)
                    .then(({data})=>{   
                        // console.log(data.status)
                        if(data.status===200){
                            const token = data.data
                            setHeaderToken(token) 
                            console.log('header has been set')
                            localStorage.setItem("token",token)
                            resolve(data)
                        }else{
                            reject(data)
                        }
                        commit("setLoginLoadFalse")
                    })
                    .catch(err=>{
                        commit('resetCurrentUser')
                        localStorage.removeItem('token')
                        reject(err)
                        commit("setLoginLoadFalse")
                    })
            })
        },
        logout:({commit})=>{
            commit("resetCurrentUser")
            localStorage.removeItem("token")
        },
        getUser:async ({commit})=>{
            if(!localStorage.getItem('token')){
                return
            }else{
                setHeaderToken(localStorage.getItem('token'))
            }
            try{
                const {data} = await axios.get('v1/auth/user')
                commit('setCurrentUser', data.data)
                return 1
            }catch(err){
                commit('resetCurrentUser')
                removeHeaderToken()
                localStorage.removeItem('token')
                return err
            }
        }
    }
}