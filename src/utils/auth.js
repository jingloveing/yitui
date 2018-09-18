import Cookies from 'js-cookie'


export function getSessionId() {
  return Cookies.get('sessionId')
}
export function getUserId() {
  return Cookies.get('UserId')
}
export function getEnterpriseId() {
  return Cookies.get('enterpriseId')
}
export function getUsername() {
  return Cookies.get('username')
}
export function getAvatar() {
  return Cookies.get('avatar')
}
export function getPhoto() {
  return Cookies.get('photo')
}
export function setSessionId(sessionId) {
  return Cookies.set('sessionId', sessionId)
}
export function setUserId(userId) {
  return Cookies.set('userId',userId)
}
export function setEnterpriseId(enterpriseId) {
  return Cookies.set('enterpriseId',enterpriseId)
}
export function setUsername(username) {
  return Cookies.set('username',username)
}
export function setAvatar(avatar) {
  return Cookies.set('avatar',avatar)
}
export function setPhoto(photo) {
  return Cookies.set('photo',photo)
}
export function removeSessionId() {
  return Cookies.remove('sessionId')
}
export function removeUserId() {
  return Cookies.remove('userId')
}
export function removeEnterpriseId() {
  return Cookies.remove('enterpriseId')
}
export function removeUsername() {
  return Cookies.remove('username')
}
export function removeAvatar() {
  return Cookies.remove('avatar')
}
export function removePhoto() {
  return Cookies.remove('photo')
}
