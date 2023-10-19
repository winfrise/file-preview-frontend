import request from './request'


// 公告列表
export const getFileList = (params) => {
  return request({
    url: '/getFileList.php',
    method: 'get',
    params
  })
}


