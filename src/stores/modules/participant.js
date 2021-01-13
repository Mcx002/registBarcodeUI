import axios from 'axios'

export default{
    state:{
        participants:[],
        isBusy:false
    },
    getters:{
        getParticipants:(state)=>{
            return state.participants
        },
        getParticipantsLoad:(state)=>{
            return state.isBusy
        }
    },
    mutations:{
        setParticipants:(state,payload)=>{
            state.participants = payload
        },
        setBusyTrue:(state)=>{
            state.isBusy = true
        },
        setBusyFalse:(state)=>{
            state.isBusy = false
        }
    },
    actions:{
        getParticipants:({commit},payload)=>{
            commit('setBusyTrue')
            return new Promise((resolve,reject)=>{
                axios.get('/v1/participants',{
                    params:{
                        event_code:payload.event_code
                    }
                })
                    .then(({data})=>{
                        commit('setParticipants',data.data)
                        commit('setBusyFalse')
                        resolve(data)
                    })
                    .catch(err=>{
                        commit('setBusyFalse')
                        reject(err)
                    })
            })
        },
        addParticipant({commit,dispatch},payload){
            commit('setBusyTrue')
            return new Promise((resolve,reject)=>{
                axios.post('/v1/participants/add',payload)
                    .then(({data})=>{
                        dispatch('getParticipants',payload)
                        resolve(data)
                    })
                    .catch(err=>{
                        commit('setBusyFalse')
                        reject(err)
                    })
            })
        }
    }
}