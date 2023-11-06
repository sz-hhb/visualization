import { onMounted, onUnmounted } from "vue"
import _ from "lodash"

/**
 * 大屏适配方案的hook
 * @param option 设计稿的宽度、高度以及宽高比
 */
export default function useScalePage(option) {
  // 节流函数控制resize事件的执行次数
  const resizeFunc = _.throttle(function () {
    triggerScale()
  }, 100)

  onMounted(() => {
    triggerScale()

    // 监听页面的宽高变化 重新触发缩放
    window.addEventListener("resize", resizeFunc)
  })

  onUnmounted(() => {
    // 移除监听
    window.removeEventListener("resize", resizeFunc)
  })

  // 缩放网页
  function triggerScale() {
    let targetX = option.targetX || 1920
    let targetY = option.targetY || 1080
    let targetRatio = option.targetRatio || 16 / 9 // 宽高比

    // 2. 当前设备的宽度/高度
    let currentX =
      document.documentElement.clientWidth || document.body.clientWidth
    let currentY =
      document.documentElement.clientHeight || document.body.clientHeight

    // 1920 * 1080 -> 3840 * 2160

    // 3. 计算缩放比例
    let scaleRatio = currentX / targetX
    // 当前页面的宽高比
    let currentRatio = currentX / currentY

    // 4. 开始缩放网页
    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY
      document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio}) translate(-50%);left:50%;`
    } else {
      document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio})`
    }
  }
}
