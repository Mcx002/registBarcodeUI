import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './modules/user'
import EventModule from './modules/event'
import ParticipantModule from './modules/participant'
import UtilsModule from './modules/utils'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user:UserModule,
        event:EventModule,
        participant:ParticipantModule,
        utils: UtilsModule
    }
})