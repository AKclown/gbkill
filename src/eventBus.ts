export enum EVENT_TYPE {
    ERROR = 'error'
}

class EventBus {
    // 事件池
    private eventPool: Map<string, Record<number, Function>>;

    private uuid: number
    constructor() {
        this.eventPool = new Map()
        this.uuid = 0
    }

    subscribe(eventName: EVENT_TYPE, callback: Function) {
        const callbackId = this.uuid++;
        if (!this.eventPool.has(eventName)) {
            this.eventPool.set(eventName, { [callbackId]: callback })
        } else {
            const callbacks = this.eventPool.get(eventName) || {}
            this.eventPool.set(eventName, { ...callbacks, ...{ [callbackId]: callback } })
        }

        const unSubscribe = () => {
            const callbacks = this.eventPool.get(eventName) || {};
            if (Object.keys(callbacks).length > 1) {
                Reflect.deleteProperty(callbacks, callbackId);
                this.eventPool.set(eventName, callbacks)
            } else {
                this.eventPool.delete(eventName)
            }
        }
        return {
            uuid: this.uuid,
            unSubscribe
        }
    }

    emit(eventName: EVENT_TYPE, payload: any) {
        if (!this.eventPool.has(eventName)) {
            throw new Error(`从未订阅过此事件${eventName}`)
        }
        const callbacks = this.eventPool.get(eventName) || {};
        for (const id in callbacks) {
            callbacks[id]!.call(this, payload)
        }
    }

    clear(eventName: EVENT_TYPE) {
        if (!eventName) {
            throw new Error(`需提供要被清除的事件名称${eventName}`);
        }
        this.eventPool.delete(eventName)
    }

    clearAll() {
        this.eventPool.clear()
    }
}

const eventBus = new EventBus();

export default eventBus