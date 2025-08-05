import test from "node:test";
import assert from "node:assert";
import month from ".";

test("generates 42-day calendar for September 2025", () => {
  const result = month(9, 2025);

  // Should return exactly 42 days
  assert.strictEqual(result.length, 42);

  // First day should be Sunday, August 31st, 2025
  assert.deepStrictEqual(result[0], { day: 31, month: 8, year: 2025 });

  // Second day should be September 1st, 2025
  assert.deepStrictEqual(result[1], { day: 1, month: 9, year: 2025 });

  // Last day should be October 11th, 2025 (42nd day)
  assert.deepStrictEqual(result[41], { day: 11, month: 10, year: 2025 });
});

test("generates calendar for current month when no parameters provided", () => {
  const result = month();

  // Should return exactly 42 days
  assert.strictEqual(result.length, 42);

  // All entries should have valid day, month, year properties
  result.forEach((day) => {
    assert.ok(typeof day.day === "number" && day.day >= 1 && day.day <= 31);
    assert.ok(
      typeof day.month === "number" && day.month >= 1 && day.month <= 12
    );
    assert.ok(typeof day.year === "number" && day.year > 0);
  });
});

test("handles month boundaries correctly", () => {
  // Test January 2024 (leap year)
  const jan2024 = month(1, 2024);
  assert.strictEqual(jan2024.length, 42);

  // January 1st, 2024 was a Monday, so calendar should start on Sunday, December 31st, 2023
  assert.deepStrictEqual(jan2024[0], { day: 31, month: 12, year: 2023 });
  assert.deepStrictEqual(jan2024[1], { day: 1, month: 1, year: 2024 });
  assert.deepStrictEqual(jan2024[41], { day: 10, month: 2, year: 2024 });
});

test("handles leap year February correctly", () => {
  const feb2024 = month(2, 2024); // 2024 is a leap year
  assert.strictEqual(feb2024.length, 42);

  // Check that we can find February 29th in the results
  const leap29 = feb2024.find(
    (day) => day.day === 29 && day.month === 2 && day.year === 2024
  );
  assert.ok(leap29, "Should include February 29th in leap year");
});

test("handles non-leap year February correctly", () => {
  const feb2023 = month(2, 2023); // 2023 is not a leap year
  assert.strictEqual(feb2023.length, 42);

  // Should not find February 29th
  const leap29 = feb2023.find(
    (day) => day.day === 29 && day.month === 2 && day.year === 2023
  );
  assert.ok(!leap29, "Should not include February 29th in non-leap year");

  // But should find February 28th
  const feb28 = feb2023.find(
    (day) => day.day === 28 && day.month === 2 && day.year === 2023
  );
  assert.ok(feb28, "Should include February 28th");
});

test("ensures consecutive days", () => {
  const result = month(6, 2024); // June 2024

  // Convert to timestamps and verify they are consecutive
  for (let i = 1; i < result.length; i++) {
    const prevDay = new Date(
      result[i - 1].year,
      result[i - 1].month - 1,
      result[i - 1].day
    );
    const currentDay = new Date(
      result[i].year,
      result[i].month - 1,
      result[i].day
    );

    const timeDiff = currentDay.getTime() - prevDay.getTime();
    const dayDiff = timeDiff / (24 * 60 * 60 * 1000);

    assert.strictEqual(dayDiff, 1, `Days should be consecutive at index ${i}`);
  }
});
