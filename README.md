![GitHub](https://img.shields.io/github/license/dym5-official/wirec?style=flat-square)
![npm](https://img.shields.io/npm/v/wirec?label=version&logo=npm&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dym5-official/wirec?style=flat-square)

# wirec

A plain JavaScript event broker designed for facilitating cross-component data exchange, such as updating one component's (React, Vue etc) state from another. It's versatile and can be utilized anywhere in your codebase.

## Installation

```bash
yarn add wirec
```
OR
```bash
npm i wirec
```

## Import

```jsx
import wirec from "wirec";
```
OR
```jsx
const wirec = require("wirec");
```

## Methods

| Method     | Args          | Return          | Desc    |
|------------|---------------|-----------------|---------|
| wirec.on   | event_key: string<br /> callback: function | {<br />&nbsp;&nbsp;&nbsp;&nbsp;callback_id: string,<br />&nbsp;&nbsp;&nbsp;&nbsp;unlink: function<br />} | Add an event listner |
| wirec.onx  | callback_id: string | void | Remove event listener |
| wirec.ons  | event_key: string<br /> callback: function | {<br />&nbsp;&nbsp;&nbsp;&nbsp;callback_id: string,<br />&nbsp;&nbsp;&nbsp;&nbsp;unlink: function<br />} | Set an event listener that removes all other event listeners for the same event and sets the current one. |
| wirec.put    | event_key: string<br /> ...args: any | void | Dispatch an event |
| wirec.hook | event_key: string | (...args) => void | Directly hooking listener to a DOM event |


## Examples

```jsx
// Fruits.jsx

import wirec from "wirec";
import { useState, useEffect } from "react";

export default function Fruits() {

    const [fruits, setFruits] = useState(["Apple", "Banana"]);

    useEffect(() => {
        const { unlink } = wirec.on("fruits", (items) => {
            setFruits([...items]);
        });

        return unlink;
    },[]);

    return (
        <ul>
            {fruits.map((fruit) => (
                <li key={fruit}>{fruit}</li>
            ))}
        </ul>
    )

}
```

```jsx
// Another.jsx

import wirec from "wirec";

export default function Another() {
    
    const sendFruits = () => {
        wirec.put("fruits", ["Orange", "Strawberry"]);
    }

    return (
        <div>
            <button onClick={sendFruits}>Send</button>
        </div>
    )

}

```

### Directly hooking listener to a DOM event

```jsx
wirec.on("signup", (e) => {
    // ...
});

<form onSubmit={wirec.hook("signup")}>
    ...
</form>
```

