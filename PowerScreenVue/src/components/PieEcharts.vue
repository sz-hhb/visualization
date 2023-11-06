<template>
  <div
    ref="divRef"
    class="pie-chart"
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
  const colors = echartData.map((item) => {
    return item.color
  })

  const data = echartData.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })

  const total = echartData.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  const option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0]
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20]
          }
        }
      }
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeight: 16,
      icon: "rect",
      formatter: function (name) {
        let currentItem = echartData.find((item) => item.name === name)
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff"
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false
        },
        data: data,
        roseType: "area"
      }
    ]
  }

  return option
}
</script>

<style scoped lang="less"></style>
