module.exports = [
    {
        path: "/set",
        method: "POST",
        description: "Set a key with optional TTL",
        body: { key: "name", value: "alex", ttl: 10 }
    },
    {
        path: "/get/:key",
        method: "GET",
        description: "Get value of a key"
    },
    {
        path: "/del/:key",
        method: "DELETE",
        description: "Delete a key"
    },
    {
        path: "/incr/:key",
        method: "POST",
        description: "Increment numeric key",
        body: { key: "counter" }
    },
    {
        path: "/decr/:key",
        method: "POST",
        description: "Decrement numeric key",
        body: { key: "counter" }
    },
    {
        path: "/expire",
        method: "POST",
        description: "Set TTL for a key",
        body: { key: "name", ttl: 10 }
    },
    {
        path: "/ttl/:key",
        method: "GET",
        description: "Get TTL remaining for a key"
    }
];
