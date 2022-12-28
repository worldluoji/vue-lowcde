export const objToMap = (obj) => {
    let map = new Map();
    for(let key in obj) {
         map.set(key,obj[key]);
    }
    return map;
}

export const mapToObj = (map) => {
    let obj = {};
    for(let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}

export const mapToJson = (map) => JSON.stringify(mapToObj(map));

export const jsonToMap = (json) => objToMap(JSON.parse(json));