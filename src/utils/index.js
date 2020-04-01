
/**
 * 本地存储
 */
export const setStore = (name,content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name,content);
}

export const getStore = (name,key) => {
    if(!name) return;
    let obj = JSON.parse(window.localStorage.getItem(name));
    if(!obj) {
        return null;
    }
    if(obj[key]) {
        return obj[key];
    }
    return obj;
}

/**
 * 批量挂载组件
 */
export function UseComponents(Vue,...args) {
    args.forEach((item) => {
        Vue.use(item);
    });
}