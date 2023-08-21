export const saveItem = (key, value) => {
  localStorage.setItem(key, value)
}

export const getItem = key => {
  localStorage.getItem(key)
}
