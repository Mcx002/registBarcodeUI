import DashboardPage from '@/views/admin/DashboardPage.vue'
import EventPage from '@/views/admin/EventPage.vue'
import EventDetail from '@/views/admin/event/EventDetail.vue'

export default [
    {
        path: '/dashboard',
        component:DashboardPage,
        children: [
            {
                path: 'event/items',
                component:EventPage
            },
            {
                path: 'event/detail/:code',
                component:EventDetail
            }
        ]
    },
]