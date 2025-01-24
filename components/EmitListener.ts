
interface Events {
    [key: string]: ((data?: any) => void)[];
}


export default class EmitListener {
    events: Events;

    constructor() {
        this.events = {};

    }

    subscribe(eventName: string, fn: (data?: any) => void) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);

    }
    emit(eventName: string, data?: any) {
        const event = this.events[eventName];

        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
                // this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
            });
        }
        else {
            console.log("No subscribers found");
        }
    }


}
