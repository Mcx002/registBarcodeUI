export default {
    state:{
        pageLoading:false
    },
    getters:{
        getLoadingPage:(state)=>{
            return state.pageLoading
        }
    },
    mutations:{
        setLoadingTrue:(state)=>{
            state.pageLoading = true
        },
        setLoadingFalse:(state)=>{
            state.pageLoading = false
        }
    },
    actions:{
        setLoadingTrue:({commit})=>{
            commit("setLoadingTrue")
        },
        setLoadingFalse:({commit})=>{
            commit("setLoadingFalse")
        }
    }
}