<template>
    <div>
        <!-- <p class="lc-title">组件库</p> -->
        <div v-draggable class="material-icon-list">
            <div class="material-icon" v-for="it in basicComponentsInfo" :data-material="it.name">
              <img :src="it.icon || defaultIcon" draggable="false"/>
              <p>{{ it.title }}</p>
            </div>
            <div class="material-icon" v-for="it in containerComponentsInfo" :data-material="`${it.name}-Container`">
              <img :src="it.icon || defaultIcon" draggable="false"/>
              <p>{{ it.title }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { basicComponentsInfo, containerComponentsInfo } from '@lowcode/elements';
import defaultIcon from '@assets/box.png';
</script>

<style scoped>
  .material-icon-list {
    /* margin-right: 10vw; */
    display: grid;
    grid-template-columns: 70px 70px;
    grid-template-rows: 60px 60px;
    gap: 18px;
    place-items: center;
    background-color: #fff;
    margin-top: 10px;
  }
  
  .material-icon-list:after {
    content: "";
    display: block;
    clear: both;
  }
  .material-icon {
    float: left;
  }
  .material-icon p {
    font-size: 16px;
    margin: 0px;
    text-align: center;
    color: #777;
  }

  .lc-title {
    font-size: 16px;
    font-weight: 700;
  }

  img {
    width: 36px;
    height: 36px;
  }
</style>