declare module "wirec" {
    type Callback = (...args: any[]) => void;

    interface Connection {
        unlink: () => void;
        id: string;
    }

    interface Wirec {
        on(event_key: string, callback: Callback): Connection;
        onx(event_key: string, callback_id: string): void;
        ons(event_key: string, callback: Callback): Connection;
        put(event_key: string, ...args: any[]): void;
        hook(key: string): (...args: any[]) => void;

        state: {
            init<T>(name: string, useState: (initialValue: T) => [T, (value: T) => void], initialValue: T): [T, (value: T) => void];
            set<T>(name: string, value: T): void;
            get<T>(name: string): T;
        };
    }

    const wirec: Wirec;

    export = wirec;
}
