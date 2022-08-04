const getElement = <E extends Element = Element>(target: EventTarget | null) => {
    if (target instanceof HTMLVideoElement) {
        return target;
    }
    throw new Error(`${typeof target} is not instance of HTMLVideoElement!`);
};

export default getElement;
