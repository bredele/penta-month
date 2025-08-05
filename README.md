# hexa-month

Generate 42-day calendar grids (6 weeks) for any month.

## Installation

```sh
npm install hexa-month
```

## Usage

```ts
import month from 'hexa-month';

// 42 days month for September 2025 (starts Sunday 31st, August and ends October 11th)
month(9, 2025);
// => [{ day: 31, month: 8, year: 2025 }, { day: 1, month: 9, year: 2025 }, ..., { day: 11, month: 10, year: 2025 }]

// 42 days month for current month
month();
```
