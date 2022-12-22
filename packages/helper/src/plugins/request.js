import { ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message-box/style/css';

const BASE_URL = `${import.meta.env.VITE_BASE_API_URL}`

async function get(url) {   
    const res = await fetch(BASE_URL + url, {
        method: 'GET'
    }).then(response => response.json())
    .catch(e => {
        if (e.errorMessage) {
            ElMessageBox.alert(e.errorMessage, '提示', {});
        } else {
            ElMessageBox.alert('网络忙，请稍后再试', '提示', {});
        }
    }) 
    return res
}

export default {
    install: (app, options) => {
        app.provide('$request', {
            get: get
        })
    }
}