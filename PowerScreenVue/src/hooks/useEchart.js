import { onUnmounted } from "vue"
import * as echarts from "echarts"

/**
 * echart的hook
 * @param {HTMLElement} divEl
 * @returns echart实例 & setOption方法 & resize方法
 */
export default function useEchart(divEl) {
  const echartInstance = echarts.init(divEl, null, { renderer: "svg" })

  onUnmounted(() => {
    echartInstance.dispose()
  })

  const setOption = (option) => {
    echartInstance.setOption(option)
  }

  const resizeEchart = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    resizeEchart
  }
}
