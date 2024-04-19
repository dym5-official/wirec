![GitHub](https://img.shields.io/github/license/dym5-official/wirec?style=flat-square)
![npm](https://img.shields.io/npm/v/wirec?label=version&logo=npm&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/dym5-official/wirec?style=flat-square)

# wirec

A plain JavaScript event broker designed for facilitating cross-component data exchange, such as updating one component's (React, Vue etc) state from another. It's versatile and can be utilized anywhere in your codebase.

## Example

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