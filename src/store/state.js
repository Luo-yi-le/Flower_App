const state = {
    userInfo: window.sessionStorage.getItem('userInfo')
        ? JSON.parse(window.sessionStorage.getItem('userInfo'))
        : null,
  cartAllList: window.sessionStorage.getItem('cartAllList')
        ? JSON.parse(sessionStorage.getItem('cartAllList'))
        : [],
    title: '花之轩',
    isLoading: false,
    direction: 'forward'
}

export default state
