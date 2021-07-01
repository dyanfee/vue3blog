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