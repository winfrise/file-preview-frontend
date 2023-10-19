import axios from 'axios'

/**
 * 文件下载方法
 * @param {Object} options
 * @param {String} options.url -要下载的文件url
 * @param {String} options.fileName -保存时的文件名
 * @param {Object} options.on -事件监听回调
 * @param {Function} options.on.progress -文件下载进度更新回调
 * @param {Function} options.on.error -下载时错误加调
 */
const downloadFile = (options) => {
  axios({
    url: options.url,
    method: 'get',
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      let percent = Math.round(
        (loaded * 100) / total
      )
      options?.on?.progress(percent, loaded, total)
    }
  })
    .then((res) => {
      const blob = res.data
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = options.fileName
      link.click()
    })
    .catch((err) => {
      options?.on?.error(err)
    })
}


export default downloadFile
