export const sum = (array, key) => {
    return array.reduce(function (a, b) {
        return a + b[key];
    }, 0);
}

export const loadState = () => {
    try {
        const state = localStorage.getItem('state')
        if (state === null) {
            return undefined
        }

        return JSON.parse(state)
    } catch (err) {
        return undefined
    }
}

export const saveState = (storeState) => {
    try {
        const state = JSON.stringify(storeState)
        localStorage.setItem('state', state)
    } catch (err) {
        // ignore
    }
}