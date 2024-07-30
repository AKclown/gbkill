export enum EVENT_TYPE {
  ERROR,
  AMOUNT,
}

class EventBus {
  // 事件池
  private eventPool: Map<EVENT_TYPE, Record<number, (...args: any[]) => void>>;

  private uuid: number;
  constructor() {
    this.eventPool = new Map();
    this.uuid = 0;
  }

  subscribe(eventName: EVENT_TYPE, callback: (...args: any[]) => void) {
    const callbackId = this.uuid++;
    if (!this.eventPool.has(eventName)) {
      this.eventPool.set(eventName, { [callbackId]: callback });
    } else {
      const callbacks = this.eventPool.get(eventName) || {};
      this.eventPool.set(eventName, {
        ...callbacks,
        ...{ [callbackId]: callback },
      });
    }

    const unSubscribe = () => {
      const callbacks = this.eventPool.get(eventName) || {};
      if (Object.keys(callbacks).length > 1) {
        Reflect.deleteProperty(callbacks, callbackId);
        this.eventPool.set(eventName, callbacks);
      } else {
        this.eventPool.delete(eventName);
      }
    };
    return {
      uuid: this.uuid,
      unSubscribe,
    };
  }

  emit(eventName: EVENT_TYPE, payload: any) {
    if (!this.eventPool.has(eventName)) {
      throw new Error(`Never subscribed to this event ${eventName}`);
    }
    const callbacks = this.eventPool.get(eventName) || {};
    for (const id in callbacks) {
      callbacks[id]!.call(this, payload);
    }
  }

  clear(eventName: EVENT_TYPE) {
    if (!eventName) {
      throw new Error(
        `You need to provide the event name to be cleared ${eventName}`
      );
    }
    this.eventPool.delete(eventName);
  }

  clearAll() {
    this.eventPool.clear();
  }
}

const eventBus = new EventBus();

export default eventBus;
