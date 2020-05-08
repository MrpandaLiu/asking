/**
 * 本地存储
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

export const getStore = (name, key) => {
    if (!name) return;
    let obj = JSON.parse(window.localStorage.getItem(name));
    if (!obj) {
        return null;
    }
    if (obj[key]) {
        return obj[key];
    }
    return obj;
}

/**
 * 批量挂载组件
 */
export const UseComponents = (Vue, ...args) => {
    args.forEach((item) => {
        Vue.use(item);
    });
}

/**
 * 获取称号
 */
export const getTitle = (coin) => {
    if (coin < 50) {
        return "萌新";
    } else if (coin < 200) {
        return "见习";
    } else if (coin < 1000) {
        return "水手";
    } else if (coin < 5000) {
        return "舰长";
    } else if (coin < 10000) {
        return "提督";
    } else {
        return "总督";
    }
}