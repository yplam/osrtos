---
title: Rate-monotonic scheduling
description: Giving periodic tasks priorities by period, shortest period most urgent, and the utilisation bound that tells you in advance when every deadline is met.
---

**Rate-monotonic scheduling** is a rule for choosing fixed priorities: the shorter a periodic
task's [period](/learn/glossary/period/), the more urgent its [priority](/learn/glossary/priority/).
It needs nothing new from the kernel: the designer only orders the numbers, higher for shorter
periods in FreeRTOS, lower in Zephyr.

The rule comes with a test. A task with period *T* and worst-case work *C* uses *C / T* of the CPU.
Liu and Layland showed in 1973 that *n* such tasks always meet their
[deadlines](/learn/glossary/deadline/) if their total utilisation is at most
*n*(2<sup>1/*n*</sup> − 1): 100% for one task, 82.8% for two, 78.0% for three, falling towards
ln 2 ≈ 69.3%. The proof assumes independent tasks, deadlines equal to periods, preemption, and no
time lost to blocking or the kernel.

A worked example with two tasks:

- `A` works 1 ms every 4 ms (25%), `B` 2 ms every 6 ms (33%). The total, 58%, is below 82.8%, so
  with `A` more urgent every deadline is met.
- Now `A` works 2 ms every 4 ms and `B` 4 ms every 8 ms: 100%, above the bound. With `A` more
  urgent it still fits: `A` runs 0–2 and 4–6, `B` runs 2–4 and 6–8. The bound is **sufficient, not
  necessary**; an exact check (response-time analysis) works through the actual numbers.
- Swap the priorities in that second set and `B` runs 0–4: `A` misses its deadline at 4 ms. The
  order matters as much as the load.

Two details that surprise people:

- **Shorter period, not greater importance.** A rarely run safety task may get a low priority, as
  long as the analysis shows it meets its deadline.
- **Real systems add terms.** Waiting for a lower-priority task's mutex
  ([priority inversion](/learn/priority-inversion/)), interrupt handlers and context switches all
  count against the bound.

In the [periodic tasks lesson](/learn/periodic-tasks/#what-to-try), set **Sensor urgency** to 4,
above `Burst`: the short-period `Sensor` then preempts `Burst`, every job meets its deadline on
both kernels, and `Burst` finishes later instead.
