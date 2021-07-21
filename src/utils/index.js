const trim = function (s) {
    return (s || " ").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
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
    const clses = cls.split(" ");
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
    // console.log(typeof new Date())
    date = new Date(date)
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

export const hex2RGB = function (sColor) {
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }
    return sColor;
};

/** 
 * 获取元素绝对位置 Left
 */
 export function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}
/** 
 * 获取元素绝对位置 Top
 */
export function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
