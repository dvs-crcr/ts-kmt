export class EventBus {
  private static __instance: EventBus = new EventBus();
  public listeners: {[index: string]: Function[]} = {}

  constructor() {
    if (EventBus.__instance) {
      throw new Error('Для получения экземпляра используйте EventBus.getInstance()');
    }
    EventBus.__instance = this;
  }

  public static getInstance(): EventBus {
    return EventBus.__instance;
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
		if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

	emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach(listener => listener(...args));
  }
}