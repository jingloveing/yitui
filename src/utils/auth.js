import Cookies from 'js-cookie'


export function getSessionId() {
  return Cookies.get('sessionId')
}
export function getUsername() {
  return Cookies.get('username')
}
export function getAvatar() {
  return Cookies.get('avatar')
}

export function setSessionId(sessionId) {
  return Cookies.set('sessionId', sessionId)
}
export function setUsername(username) {
  return Cookies.set('username',username)
}
export function setAvatar(avatar) {
  return Cookies.set('avatar',avatar)
}

export function removeSessionId() {
  return Cookies.remove('sessionId')
}
export function removeUsername() {
  return Cookies.remove('username')
}
export function removeAvatar() {
  return Cookies.remove('avatar')
}
