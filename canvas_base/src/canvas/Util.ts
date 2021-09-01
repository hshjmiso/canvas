let animQueue: Array<Function> = [];
const req = 
    (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame) ||
    function (f) {
        setTimeout(f, 60);
    };


export const Util = {
	createCanvasElement() {
		const canvas = document.createElement('canvas');

		return canvas;
	},

    requestAnimFrame(callback: Function) {
        animQueue.push(callback);
        if (animQueue.length) {
            req(() => {
                const queue = animQueue;
                animQueue = [];
                queue.forEach(cb => {
                    cb();
                });
            });
        }
    }
};
