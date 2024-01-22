import crypto from 'crypto';

class TaskQueue {
    public queue: Map<string, (data: any) => void>;
    constructor() {
        this.queue = new Map()
    }

    request<T>(callback: (id: string) => void): Promise<T> {
        const id = crypto.randomUUID();
        return new Promise((resolve) => {
            this.queue.set(id, (data) => resolve(data))
            callback(id);
        })
    }

    getQueueById(id: string) {
        return this.queue.get(id)
    }

    deleteQueueById(id: string) {
        this.queue.delete(id)
    }

}

const taskQueue = new TaskQueue()

export default taskQueue



















