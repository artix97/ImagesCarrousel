import React from "react";

function CacheClear() {
    caches.keys().then((names) => {
        names.forEach((name) => {
        caches.delete(name);
        });
    });
}

export default CacheClear;
