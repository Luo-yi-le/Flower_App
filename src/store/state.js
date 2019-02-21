const state = {
    userInfo: window.localStorage.getItem('userInfo')
        ? JSON.parse(window.localStorage.getItem('userInfo'))
        : null,
  cartAllList: window.localStorage.getItem('cartAllList')
        ? JSON.parse(localStorage.getItem('cartAllList'))
        : [],
    title: '花之轩',
    isLoading: false,
    direction: 'forward'
}

export default state
