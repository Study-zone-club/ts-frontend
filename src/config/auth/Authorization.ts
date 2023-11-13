const unallowed = ['/']

export const Authorization = () => {
  return unallowed.includes(window.location.pathname)
}
