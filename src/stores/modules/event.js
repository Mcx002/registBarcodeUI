import axios from 'axios'
import { dateFormat } from '../../utils/format'
import { dayBetween } from '../../utils'

export default{
    state:{
        events:[],
        eventLoad:false
    },
    getters:{
        getEventList:(state)=>{
            return state.events.map(res=>({...res,be_start:dateFormat(res.be_start),be_end:dateFormat(res.be_end)}))
        },
        eventLoad(state){
            return state.eventLoad
        }
    },
    mutations:{
        setEventList:(state,payload)=>{
            state.events = payload
            let date = new Date()
            state.events.isActive = dayBetween(payload.be_end - date.toString())
            console.log(state.events)
        },
        setEventLoad(state, condition){
            state.eventLoad = condition
        }
    },
    actions:{
        getEvents:(state)=>{
            state.commit('setEventLoad',true)
            return new Promise((resolve,reject)=>{
                axios.get('v1/events/items')
                    .then(({data,status})=>{
                        if(status===200){
                            const items = data.data
                            state.commit('setEventList',items)
                            state.commit('setEventLoad',false)
                            resolve(data)
                        }
                    })
                    .catch(err=>{
                        state.commit('setEventLoad',false)
                        reject(err)
                    })
            })
        },
        addEvent:({dispatch,commit},payload)=>{
            commit('setEventLoad',true)
            return new Promise((resolve,reject)=>{
                axios.post('v1/events/add',payload)
                    .then(({data})=>{
                        if(data.status===200){
                            dispatch('getEvents')
                            resolve(data)
                        }else{
                            commit('setEventLoad',false)
                            reject(data)
                        }
                    })
                    .catch(err=>reject(err))
            })
        },
        editEvent:({dispatch,commit},payload)=>{
            commit('setEventLoad',true)
            return new Promise((resolve,reject)=>{
                axios.put('v1/events/'+payload.id+'/edit',payload.data)
                    .then(({data})=>{
                        if(data.status===200){
                            resolve(data)
                            dispatch('getEvents')
                        }else{
                            commit('setEventLoad',false)
                            reject(data)
                        }
                    })
                    .catch(err=>{
                        commit('setEventLoad',false)
                        reject(err)
                    })
            })
        },
        deleteEvent({dispatch,commit},id){
            commit('setEventLoad',true)
            return new Promise((resolve,reject)=>{
                axios.delete('v1/events/'+id+'/delete')
                    .then(({data})=>{
                        if(data.status===200){
                            dispatch('getEvents')
                            resolve(data)
                        }else{
                            commit('setEventLoad',false)
                            reject(data)
                        }
                    })
                    .catch(err=>{
                        commit('setEventLoad',false)
                        reject(err)
                    })
            })
        }
    }
}