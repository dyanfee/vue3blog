const trim = function (s) {
    return (s || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(" ") !== -1) throw new Error("元素类名不能包含空格");
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (" " + el.className + " ").indexOf(" " + cls + " ") !== -1;
    }
}

export function addClass(el, cls) {
    if (!el || !cls) return;
    let curClass = el.className;
    const clses = cls.split("");
    for (let i = 0, j = clses.length; i < j; i++) {
        const clsName = clses[i];
        if (!clsName) continue;
        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += " " + clsName;
        }
        if (!el.classList) {
            el.className = curClass;
        }
    }
}
export function removeClass(el, cls) {
    if (!el || !cls) return;
    const clses = cls.split(" ");
    let curClass = " " + el.className + " ";
    for (let i = 0, j = clses.length; i < j; i++) {
        const clsName = clses[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(" " + clsName + " ", " ");
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}



/**
 * 时间格式化
 * @param  date 时间
 * @param  fmt 格式 y年 M月 d日 h小时 m分 s秒 
 */
export function formatDate(date, fmt) {
    if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}