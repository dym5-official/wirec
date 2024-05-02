const connections = {};
const callbacks = {};
const states = {};

let id = 0;

const on = (event_key, callback) => {
    if (!Array.isArray(connections[event_key])) {
        connections[event_key] = [];
    }

    if (!Array.isArray(callbacks[event_key])) {
        callbacks[event_key] = [];
    }

    const callback_id = `c${++id}`;

    connections[event_key].push(callback_id);
    callbacks[callback_id] = callback;

    const unlink = () => onx(event_key, callback_id);

    return { unlink, id: callback_id };
}

const onx = (event_key, callback_id) => {
    if (Array.isArray(connections[event_key])) {
        connections[event_key] = connections[event_key].filter((id) => id !== callback_id);
    }

    if (typeof callbacks[callback_id] !== undefined) {
        delete callbacks[callback_id];
    }
}

const ons = (event_key, callback) => {
    if (!Array.isArray(connections[event_key])) {
        connections[event_key] = [];
    }

    const callback_id = connections[event_key].length > 0 ? connections[event_key][0] : false;

    if (callback_id === false) {
        return on(event_key, callback);
    }

    connections[event_key] = [callback_id];
    callbacks[callback_id] = callback;

    const unlink = () => onx(event_key, callback_id);

    return { unlink, id: callback_id };
}

const put = (event_key, ...args) => {
    if (Array.isArray(connections[event_key])) {
        const callback_ids = connections[event_key];

        callback_ids.forEach((callback_id) => {
            callbacks[callback_id].apply(null, args);
        });
    }
}

const hook = (key) => {
    return (...all) => {
        put.apply(null, [key, ...all]);
    }
}

const initState = (name, useState, initialValue) => {
    states[name] = useState(initialValue);
    return states[name];
}

const setState = (name, value) => {
    states[name][1].call(null, value);
}

const getState = (name) => {
    return states[name][0];
}

const wirec = {
    on,
    onx,
    ons,
    put,
    hook,
    state: {
        init: initState,
        set: setState,
        get: getState,
    }
};

module.exports = wirec;