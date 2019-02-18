const state = {
    userInfo: window.localStorage.getItem('userInfo')
        ? JSON.parse(window.localStorage.getItem('userInfo'))
        : null,
    cartData: window.localStorage.getItem('cartData')
        ? JSON.parse(localStorage.getItem('cartData'))
        : [],
    title: '花之轩',
    isLoading: false,
    direction: 'forward'
}

export default state
