<template>
  <main class="screen-bg">
    <div class="header"></div>
    <div class="left-top">
      <pie-echarts :echarts-data="chargingPile" />
    </div>
    <div class="left-bottom">
      <line-echarts :echarts-data="processMonitoring" />
    </div>
    <div class="right-top">
      <right-top-panel :panel-items="chargingTop4" :percentage="percentage" />
    </div>
    <div class="right-center">
      <bar-echarts :echarts-data="chargingStatistics" />
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring" />
    </div>
    <div class="center">
      <center-svg />
    </div>
    <div class="bottom">
      <bottom-panel :panel-items="dataAnalysis" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"
import PieEcharts from "../components/PieEcharts.vue"
import LineEcharts from "../components/LineEcharts.vue"
import RightTopPanel from "../components/RightTopPanel.vue"
import BarEcharts from "../components/BarEcharts.vue"
import RightBottomSvg from "../components/RightBottomSvg.vue"
import CenterSvg from "../components/CenterSvg.vue"
import BottomPanel from "../components/BottomPanel.vue"
import { getPowerScreenData } from "@/services"
import {
  chargingPileData,
  processMonitoringData,
  chargingStatisticsData,
  exceptionMonitoringData,
  dataAnalysisData,
  chargingTop4Data
} from "./config/home-data"

// 充电桩包和比例
const chargingPile = ref(chargingPileData)
// 流程监控
const processMonitoring = ref(processMonitoringData)
// 充电桩数据分析
const chargingStatistics = ref(chargingStatisticsData)
// 异常监控
const exceptionMonitoring = ref(exceptionMonitoringData)
// 充电桩数据分析
const dataAnalysis = ref(dataAnalysisData)
// 充电桩占比top4
const chargingTop4 = ref(chargingTop4Data)
const percentage = ref(0)

// 发起网络请求拿到首页的数据
getPowerScreenData().then((res) => {
  // console.log(res.data)
  chargingPile.value = res.data.chargingPile.data
  processMonitoring.value = res.data.processMonitoring.data
  chargingStatistics.value = res.data.chargingStatistics.data
  exceptionMonitoring.value = res.data.exceptionMonitoring.data
  dataAnalysis.value = res.data.dataAnalysis.data
  chargingTop4.value = res.data.chargingTop4.data
  percentage.value = res.data.chargingTop4.totalPercentage
})
</script>

<style scoped lang="less">
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #070a3c;
  background-image: url(../assets/images/bg.png);
  background-repeat: no-repeat;
}

.header {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;
  background-image: url(../assets/images/bg_header.svg);
  background-repeat: no-repeat;
}

.left-top {
  position: absolute;
  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;
  background-image: url(../assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
}

.left-bottom {
  position: absolute;
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;
  background-image: url(../assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
}

.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
}

.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
  background-repeat: no-repeat;
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
}
</style>
