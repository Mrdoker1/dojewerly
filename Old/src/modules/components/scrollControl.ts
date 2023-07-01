const keys: { [key: number]: number } = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e: Event) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e: KeyboardEvent) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    let options = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        },
    });
    window.addEventListener('test', () => {}, options);
} catch (e) {
    throw e;
}

var wheelOpt = (supportsPassive ? { passive: false } : false) as EventListenerOptions;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
export function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
