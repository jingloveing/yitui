const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,//用户头像
  name: state => state.user.name,//用户名字
  sessionId: state => state.user.sessionId//用户id
}
export default getters
