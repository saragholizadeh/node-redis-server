/**
 * A minimal binary min-heap implementation for TTL handling.
 * Each node has:
 *   - key: the datastore key
 *   - expiresAt: timestamp when it should expire
 */
class MinHeap {
    constructor() {
        this.data = [];
    }

    // Get the index of parent, left, right nodes
    parent(index) { return Math.floor((index - 1) / 2); }
    left(index) { return index * 2 + 1; }
    right(index) { return index * 2 + 2; }

    swap(a, b) {
        const temp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = temp;
    }

    isEmpty() {
        return this.data.length === 0;
    }

    peek() {
        return this.data[0] || null;
    }

    insert(node) {
        this.data.push(node);
        this.heapifyUp(this.data.length - 1);
    }

    heapifyUp(index) {
        while (
            index > 0 &&
            this.data[index].expiresAt < this.data[this.parent(index)].expiresAt
            ) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    pop() {
        if (this.isEmpty()) return null;

        const root = this.data[0];

        this.data[0] = this.data[this.data.length - 1];
        this.data.pop();

        this.heapifyDown(0);

        return root;
    }

    heapifyDown(index) {
        let smallest = index;
        const leftIdx = this.left(index);
        const rightIdx = this.right(index);

        if (
            leftIdx < this.data.length &&
            this.data[leftIdx].expiresAt < this.data[smallest].expiresAt
        ) {
            smallest = leftIdx;
        }

        if (
            rightIdx < this.data.length &&
            this.data[rightIdx].expiresAt < this.data[smallest].expiresAt
        ) {
            smallest = rightIdx;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }
}

module.exports = MinHeap;
