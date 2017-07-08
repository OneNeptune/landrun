class Stack {
  constructor() {
    this.store = [];
  }

  push(object) {
    this.store.push(object);
  }

  pop() {
    return this.store.pop();
  }

  isEmpty() {
    return this.store.length === 0;
  }
}

export default Stack;
