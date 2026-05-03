type HasNumericValue = { value: number } & Partial<Record<Exclude<string, 'value'>, any>>;

abstract class Heap<T extends HasNumericValue> {
  protected heap: T[];

  constructor() {
    this.heap = [];
  }

  protected getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  protected getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  protected getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  protected hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  protected hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  protected hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  protected getLeftChild(index: number): T {
    return this.heap[this.getLeftChildIndex(index)] as T;
  }

  protected getRightChild(index: number): T {
    return this.heap[this.getRightChildIndex(index)] as T;
  }

  protected getParent(index: number): T {
    return this.heap[this.getParentIndex(index)] as T;
  }

  protected swap(indexOne: number, indexTwo: number) {
    const temp = this.heap[indexOne] as T;
    this.heap[indexOne] = this.heap[indexTwo] as T;
    this.heap[indexTwo] = temp;
  }

  public peek(): T | null {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0] as T;
  }

  public remove(): T | null {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1] as T;
    this.heap.pop();
    this.heapifyDown();
    return item as T;
  }

  public add(item: T) {
    this.heap.push(item);
    this.heapifyUp();
  }

  public print() {
    for (let i = 0; i < this.heap.length; i++) {
      for (let j = 0; j < Math.pow(2, i) && j + Math.pow(2, i) < this.heap.length; j++) {
        console.log(this.heap[j + Math.pow(2, i) - 1] as T);
      }
    }
  }

  protected abstract heapifyUp(): void;
  protected abstract heapifyDown(): void;
}

export class MaxHeap<T extends HasNumericValue> extends Heap<T> {
  constructor() {
    super();
  }

  protected heapifyUp() {
    let index = this.heap.length - 1;

    while (this.hasParent(index) && this.getParent(index).value < (this.heap[index] as T).value) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  protected heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (this.hasRightChild(index) && this.getRightChild(index).value > this.getLeftChild(index).value) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if ((this.heap[index] as T).value > (this.heap[largerChildIndex] as T).value) {
        break;
      } else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }

  public print() {
    console.log('Printing max heap:');
    super.print();
  }
}

export class MinHeap<T extends HasNumericValue> extends Heap<T> {
  constructor() {
    super();
  }

  protected heapifyUp() {
    let index = this.heap.length - 1;

    while (this.hasParent(index) && this.getParent(index).value > (this.heap[index] as T).value) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  protected heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (this.hasRightChild(index) && this.getRightChild(index).value < this.getLeftChild(index).value) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if ((this.heap[index] as T).value < (this.heap[largerChildIndex] as T).value) {
        break;
      } else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }

  public print() {
    console.log('Printing min heap:');
    super.print();
  }
}
