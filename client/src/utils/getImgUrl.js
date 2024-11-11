function getImgUrl (name) {
    return new URL(`../assets/cars/${name}`, import.meta.url);
}

export {getImgUrl}