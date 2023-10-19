<template>
  <div class="video-player-wrapper">
    <video class="video" ref="videoRef" width="100%" height="100%"
      :src="props.src"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @ended="onEnded"
      @canplay="onCanplay"
    ></video>
    <div class="mask" @click="toggleControlsVisible"></div>
    <template v-if="controlsVisible">
      <el-icon v-if="isPlaying" class="control-btn" @click="pause"><VideoPause /></el-icon>
      <el-icon v-else class="control-btn" @click="play"><VideoPlay /></el-icon>

      <div class="controls">
        <div class="controls-item">
          <svg-icon size="20px" v-if="isPlaying" name="video-pause" @click="pause"></svg-icon>
          <svg-icon size="20px" v-else name="video-play" @click="play"></svg-icon>
        </div>

        <div class="controls-item">
          <div class="currentTime">{{formatTime(currentTime)}}</div>
        </div>

        <div class="controls-item" style="flex: 1;">
          <div class="progress" @click="onClickProgress($event)">
              <div class="bar"></div>
              <div class="loaded"></div>
              <div class="percent" :style="{width: percent * 100 + '%'}" ></div>
          </div>
        </div>

        <div class="controls-item">
          <div class="totalTime">{{formatTime(totalTime)}}</div>
        </div>

        <div class="controls-item">
          <svg-icon size="20px"  name="fullscreen" @click="toggleFullscreen()"></svg-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";


  const formatTime = (time) => {
      var hour = Math.floor(time/3600);
      hour = hour < 10 ? "0" + hour : hour;
      var minute = Math.floor(time%3600/60);
      minute = minute < 10 ? "0" + minute : minute;
      var second = Math.floor(time%60);
      second = second < 10 ? "0" + second : second;
      return hour + ":" + minute + ":" + second;
  }

  const props = defineProps({
    poster: {
      type: String
    },
    autoplay: {
      type: Boolean
    },
    width: {
      type: Number,
    },
    height: {
      type: Number
    },
    preload: {
      type: String,
      default: 'metadata'
    },
    src: {
      type: String,
      required: true
    }
  })

  const videoRef = ref()

  const controlsVisible = ref(true)
  const toggleControlsVisible = () => {
    controlsVisible.value = !controlsVisible.value
  }

  // 是否正在播放
  const isPlaying = ref(false)

  // 是否处于全屏播放
  const isFullscreen = ref(false)

  // 当前播放时间
  const currentTime = ref(0)

  // 总时间
  const totalTime = ref(0)

  const percent = ref(0)

  const toggleFullscreen = () => {
    videoRef.value.requestFullscreen()
  }

  // 播放
  const play = () => {
    videoRef.value.play()
    isPlaying.value = true
  }

  // 暂停
  const pause = () => {
    videoRef.value.pause()
    isPlaying.value = false
  }

  // 播放回调
  const onPlay = () => {
    isPlaying.value = true
  }

  // 暂停回调
  const onPause = () => {
    controlsVisible.value = true
    isPlaying.value = false
  }

  const onTimeupdate = (e) => {
    // 当前时间
    const current = videoRef.value.currentTime
    currentTime.value = current

    percent.value = currentTime.value / totalTime.value
  }


  const onEnded = () => {
    currentTime.value = 0
    isPlaying.value = false
    videoRef.currentTime = 0
  }

  const onCanplay = () => {
    const total = videoRef.value.duration
    totalTime.value = total
  }

  const onClickProgress = (e) => {
    const offsetX = e.offsetX
    const targetWidth = e.target.offsetWidth

    percent.value = offsetX / targetWidth
    currentTime.value = totalTime.value * percent.value
    videoRef.value.currentTime = currentTime.value
  }
  /**
   * 1. 初始化后，默认显示播放/暂停按钮
   * 2. 当播放暂停时，显示播放按钮
   */
</script>

<style lang="scss" scoped>
.video-player-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
}
.video {
  display: block;
  width: 100%;
  height: 100%;
}
.control-btn {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: rgba(255, 255, 255, 0.8);
}
.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 6px;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;

  .controls-item {
    margin: 0 5px;
    display: flex;
  }

  .progress {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: rgba(102, 102, 102, 0.8);
    border-radius: 5px;

    .bar {
        border-radius: 3px;
        opacity: 0;
        cursor: pointer;    /*光标类型*/
    }

    .loaded {
        background-color: #999999;
        border-radius: 3px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 2;
    }

    .percent {
        width: 0%;
        height: 100%;
        background-color: #ffffff;
        border-radius: 3px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 3;
    }
  }
}
</style>
