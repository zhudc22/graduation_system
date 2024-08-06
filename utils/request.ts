import fetch from 'isomorphic-unfetch'
import Router from 'next/router'


const API_REMOTE = 'http://118.25.18.149:8080'; // 修改为你的 API 基础地址

const setToken = (s) => {
    return localStorage.setItem(`token`, s)
}


const getUserType = () => {
    return localStorage.getItem('userType')
}

const getToken = () => {
    return localStorage.getItem('token')
}

const clearToken = () => {
    return localStorage.removeItem('token')

}

export const headers = () => {
    return {
        //Authorization: getToken(),
        Token: getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

const parseResponse = async (res) => {
    if (res.headers.get('Authorization')) {
        setToken(res.headers.get('Authorization'))
    }
    try {
        const json = await res.json()
        if (res.status >= 400) {
            json.status = res.status
        }
        if (res.status === 401) {
            clearToken()
            Router.push('/')
        }
        return json
    } catch (error) {
        console.info('ping')
    }
    return false
}

export const pureRequest = async (path, method, params) => {
    const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')

    // 发起 GET 请求
    return fetch(`${API_REMOTE}/${path}?${query}`, {
        method,
        headers: headers(),
    })
}

const get = async (path, data = {}) => {
    const params = data
    const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
    const res = await fetch(`${API_REMOTE}/${path}?${query}`, {
        method: 'GET',
        headers: headers(),
    })
    const content = await parseResponse(res)
    return content
}

const postWithQueryParams = async (path, data = {}) => {
    const params = data;
    const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    const res = await fetch(`${API_REMOTE}/${path}?${query}`, {
        method: 'POST',
        headers: headers(),
    });
    const content = await parseResponse(res);
    return content;
}


export const downloadFile = async (path, params = {}) => {
    try {
        // 构建查询参数
        const query = Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&')

        // 发起 GET 请求
        const res = await fetch(`${API_REMOTE}/${path}?${query}`, {
            method: 'GET',
            headers: headers(),
        })

        // 检查响应状态
        if (!res.ok) {
            throw new Error(`HTTP status ${res.status}: ${res.statusText}`)
        }

        // 从响应头中获取文件名
        const disposition = res.headers.get('Content-Disposition')
        let fileName = 'downloaded_file'
        if (disposition && disposition.indexOf('attachment') !== -1) {
            // 优先匹配 filename*=UTF-8'' 的情况
            const fileNameMatchUTF8 = disposition.match(/filename\*=UTF-8''(.+?)(?:;|$)/)
            // 其次匹配 filename="..." 的情况
            const fileNameMatchQuoted = disposition.match(/filename="(.+?)"(?:;|$)/)
            // 也考虑匹配 filename=... 不带引号的情况
            const fileNameMatch = disposition.match(/filename=([^;\s]+)(?:;|$)/)

            if (fileNameMatchUTF8) {
                fileName = decodeURIComponent(fileNameMatchUTF8[1])
            } else if (fileNameMatchQuoted) {
                fileName = decodeURIComponent(fileNameMatchQuoted[1])
            } else if (fileNameMatch) {
                fileName = decodeURIComponent(fileNameMatch[1])
            }
        }
        // 获取 MIME 类型
        const mimeType = res.headers.get('Content-Type') || 'application/octet-stream'

        // 处理返回的数据
        const data = await res.blob()
        const downloadUrl = window.URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = fileName
        a.type = mimeType
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
        // 捕捉异常并进行处理
        console.error('Download file failed:', error)
        throw error // 重新抛出错误以便在链式调用中捕获
    }
}

const requestMethod = (method) => async (path, data, isUploading) => {
    let body
    const reqHeaders = headers()

    if (isUploading) {
        // 文件上传使用FormData
        body = data
        // FormData 自动设置边界，不要直接设置Content-Type
        delete reqHeaders['Content-Type'] // 让浏览器自动处理Content-Type
    } else {
        // 普通JSON请求
        body = JSON.stringify(data)
    }

    const res = await fetch(`${API_REMOTE}/${path}`, {
        method,
        headers: reqHeaders,
        body,
    })

    const content = await parseResponse(res)
    return content
}

const post = requestMethod('POST')
const put = requestMethod('PUT')
const httpDelete = requestMethod('DELETE')

export {setToken, getUserType, getToken, clearToken, get, post, put, httpDelete, postWithQueryParams}
