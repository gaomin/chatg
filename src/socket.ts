/**
 * @description 创建实例并
 * @param {*} topic topic
 * @returns websocket实例
 */
let client: WebSocket | null = null
const connectSocket = (): WebSocket => {
  const baseUrl = '26bb396f.r1.vip.cpolar.cn/api'
  const wsUrl = `ws://${baseUrl}`
  if (client) {
    return client
  } else {
    client = new WebSocket(wsUrl)
  }
  return client
}

export default connectSocket
