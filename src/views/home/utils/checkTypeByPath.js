const pictureSuffixs = ['jpg', 'gif', 'jpg', 'jpeg']
const videoSuffixs = ['mp4', 'mov', 'avi', 'mkv', 'flv', '3gp']

export const checkIsPicture = (suffix) => {
  return pictureSuffixs.includes(suffix)
}

export const checkIsVideo = (suffix) => {
  return videoSuffixs.includes(suffix)
}
