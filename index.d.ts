type Connection = {
    id: string,
    unlink: () => void
}

type Wirec = {
    on(event_key: string, callback: (...args: any[]) => void): Connection;
    onx(event_key: string, callback_id: string): void;
    ons(event_key: string, callback: (...args: any[]) => void): Connection;
    put(event_key: string, ...args: any[]): void;
}

declare const wirec: Wirec;

export default wirec;
