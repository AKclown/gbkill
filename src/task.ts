import crypto from 'crypto';

class Task {

    private queue: Map<string, (data: any) => void>;
    private errors: Set<String>;

    constructor() {
        this.queue = new Map()
        this.errors = new Set()
    }

    createTask<T>(callback: (id: string) => void): Promise<T> {
        const id = crypto.randomUUID();
        return new Promise((resolve) => {
            this.queue.set(id, (data) => resolve(data))
            callback(id);
        })
    }

    getTaskById(id: string) {
        return this.queue.get(id)
    }

    deleteTaskById(id: string) {
        this.queue.delete(id)
    }

    addError(name: string) {
        this.errors.add(name);
    }

    deleteError(name: string) {
        this.errors.delete(name);
    }

    getErrors() {
        return this.errors
    }

}

const task = new Task()

export default task



















