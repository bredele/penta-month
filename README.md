# penta-month

Generate 35-day calendar grids (5 weeks) for any month.

## Installation

```sh
npm install penta-month
```

## Usage

```ts
import month from 'penta-month';

// 35 days month for September 2025 (starts Sunday 31st, August and ends October 4th)
month(9, 2025);
// => [{ day: 31, month: 8, year: 2025 }, { day: 1, month: 9, year: 2025 }, ..., { day: 4, month: 10, year: 2025 }]

// 35 days month for current month
month();
```
