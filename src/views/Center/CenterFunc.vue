<template>
    <div @click="goList" class="center-func">
        <div class="center-func-left flex-center">
            <img :src="require('../../assets/'+imgsrc)" alt="">
        </div>
        <div class="center-func-center">
            <h2>{{title}}</h2>
        </div>
        <div class="center-func-right flex-center">
            <img src="../../assets/go.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'CenterFunc',
    props: ['url','imgsrc','title'],
    methods: {
        goList() {
            this.$router.push(`${this.url}`);
        }
    }
}
</script>

<style>
.center .center-func {
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid rgba(240, 239, 239,0.8);
    background: white;
}

.center .center-func .center-func-left {
    flex: 1;
}

.center .center-func .center-func-left img {
    width: 40%;
    max-width: 33px;
    max-height: 30px;
    height: 40%;
}

.center .center-func .center-func-center {
    flex: 4;
    line-height: 60px;
    font-size: .8rem;
}

.center .center-func .center-func-right {
    flex: 1;
}

.center .center-func .center-func-right img {
    width: 30%;
    max-width: 33px;
    max-height: 30px;
    height: 30%;
}
</style>