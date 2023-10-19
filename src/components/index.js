import TextOverflowTooltips from './text-overflow-tooltips'
import VideoPlayer from './video-player'

const components = {
  TextOverflowTooltips,
  VideoPlayer
}

export default {
  install(app) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })
  }
}
