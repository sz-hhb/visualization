<template>
  <div
    ref="divRef"
    class="bar-chart"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import useEchart from "@/hooks/useEchart.js"

const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  echartsData: {
    type: Array,
    default: () => []
  }
})

const divRef = ref(null)
let hyEchart = null

onMounted(() => {
  setupEchart(props.echartsData)
  window.addEventListener("resize", hyEchart.resizeEchart)
})

onUnmounted(() => {
  window.removeEventListener("resize", hyEchart.resizeEchart)
})

watch(
  () => props.echartsData,
  (newVal, oldVal) => {
    setupEchart(newVal)
  }
)

function setupEchart(echartsData) {
  if (!hyEchart) {
    hyEchart = useEchart(divRef.value)
  }
  const option = getOption(echartsData)
  hyEchart.setOption(option)
}

function getOption(echartData = []) {
  const category = echartData.map((item) => item.name)
  const value = echartData.map((item) => item.value)

  const option = {
    // backgroundColor: 'rbg(40,46,72)',
    grid: {
      left: "5%",
      right: "5%",
      top: "30%",
      bottom: "5%",
      containLabel: true // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "white"
      },

      data: category
    },
    yAxis: {
      name: "个",
      nameTextStyle: {
        color: "white",
        fontSize: 13
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        }
      },
      axisLabel: {
        color: "white"
      }
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 17,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#01B1FF" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#033BFF" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        data: value
      }
    ]
  }

  return option
}
</script>
<style lang="scss" scoped></style>
