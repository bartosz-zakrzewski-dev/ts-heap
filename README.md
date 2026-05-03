# Usage

```ts
import { MaxHeap } from '@bartosz.zakrzewski.dev/ts-heap';

type Item = {
  value: number;
  key: string;
};

const maxHeap = new MaxHeap<Item>();

maxHeap.add({ value: 7, key: 'A' });
maxHeap.add({ value: 4, key: 'B' });
maxHeap.add({ value: 8, key: 'C' });
maxHeap.add({ value: 5, key: 'D' });
maxHeap.add({ value: 6, key: 'E' });
maxHeap.add({ value: 3, key: 'F' });

maxHeap.print();
```
