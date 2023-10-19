/*
 * 文件大小转换(KB、MB、G、T)
 */
function formatFileSize(size) {
  if (!size) return ''
  let num = 1024.0
  let fileSize
  if (size < num) {
    return size + 'B'
  }
  if (size < Math.pow(num, 2)) {
    fileSize = size / num
    if (fileSize % 1 !== 0) {
      fileSize = fileSize.toFixed(2)
    }
    return fileSize + 'KB'
  }
  if (size < Math.pow(num, 3)) {
    fileSize = size / Math.pow(num, 2)
    if (fileSize % 1 !== 0) {
      fileSize = fileSize.toFixed(2)
    }
    return fileSize + 'MB'
  }
  if (size < Math.pow(num, 4)) {
    fileSize = size / Math.pow(num, 3)
    if (fileSize % 1 !== 0) {
      fileSize = fileSize.toFixed(2)
    }
    return fileSize + 'G'
  }
  fileSize = size / Math.pow(num, 4)
  if (fileSize % 1 !== 0) {
    fileSize = fileSize.toFixed(2)
  }
  return fileSize + 'T'
}

export default formatFileSize
