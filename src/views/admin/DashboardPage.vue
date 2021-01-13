<template>
    <div>
        <div class="side-header">
            <ul>
                <li>
                    <router-link to="/dashboard">Dashboard</router-link>
                    <router-link to="/dashboard/event/items">Events</router-link>
                </li>
            </ul>
        </div>
        <div class="db-body">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pull:true
        }
    }
}
</script>
<style lang="scss">
    .side-header{
        width:250px;
        height:100vh;
        position:absolute;
        left:0;
        top:0;
        background-color:#f0f0f0;
        padding-top:20px;
        padding-bottom:20px;
        ul{
            list-style:none;
            padding:0;
            margin:0;
            a{
                display:block;
                color:black;
                padding:15px;
                text-decoration: none;
                &:hover{
                    background-color:#d0d0d0;
                }
            }
        }
    }
    .db-body{
        margin:10px;
        margin-left:260px;
    }
</style>