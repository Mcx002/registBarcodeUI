import axios from 'axios'
import {setHeaderToken,removeHeaderToken} from '@/utils/auth'

export default{
    state:{
        user:null,
        isLoggedIn:false
    },
    getters:{
        getUser(state){
            return state.user
        },
        isLoggedIn(state){
            return state.isLoggedIn
        }
    },
    mutations:{
        setCurrentUser:(state, payload)=>{
            state.user = {email:payload.email,id:payload.id}
            state.isLoggedIn = true
        },
        resetCurrentUser:(state)=>{
            state.user = null
            state.isLoggedIn = false
        }
    },
    actions:{
        login: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('v1/auth/login', payload)
                    .then(({data,status})=>{   
                        if(status===200){
                            const token = data.data
                            setHeaderToken(token) 
                            localStorage.setItem("token",token)
                            resolve(data)
                        }
                    })
                    .catch(err=>{
                        commit('resetCurrentUser')
                        localStorage.removeItem('token')
                        reject(err)
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
            }
            try{
                const {data} = await axios.get('v1/auth/user')
                commit('setCurrentUser', data.data)
            }catch(err){
                commit('resetCurrentUser')
                removeHeaderToken()
                localStorage.removeItem('token')
                return err
            }
        }
    }
}