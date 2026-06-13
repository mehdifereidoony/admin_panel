export const getToken = ()=>{
    return localStorage.getItem("login_token")
}

export const setToken = (data)=>{
    return localStorage.setItem("login_token", data)
}

export const removeToken = ()=>{
    localStorage.removeItem("login_token")
}