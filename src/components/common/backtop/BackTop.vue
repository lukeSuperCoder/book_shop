<template>
    <div class="backtop" @click="backTop"> 
    </div>
</template>

<script>
export default {
    name:"BackTop",
    setup(props, context) {
        return {
            backTop:() => {
                context.emit('bTop');
            }
        }
    }
}
</script>

<style>
.backtop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 20px;
    box-shadow: 5px 5px 5px #888888;
    border-radius: 50%;
    background: url(@/assets/images/up.png) no-repeat center center;
    background-size: cover;
}
</style>