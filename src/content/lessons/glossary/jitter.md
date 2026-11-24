---
title: Jitter
description: How much the start (or end) of a periodic job varies from one period to the next, and where it comes from in an RTOS.
---

**Jitter** is the variation in timing of something that should be regular. For a periodic task it
usually means **release jitter**: how far each job's actual start is from its ideal release time,
one [period](/learn/glossary/period/) after the previous one.

In an RTOS, jitter comes from:

- **More urgent work.** A task that is ready at its release still waits while more urgent tasks
  and interrupt handlers run.
- **The tick.** A task woken by a timeout can only start at a [tick](/learn/glossary/tick/), so
  times are rounded to the tick period.
- **Equal priorities.** A task that shares its priority with others may wait for their
  [time slice](/learn/glossary/time-slice/) to end.

Jitter is not drift. A task that sleeps until absolute times may start a little late in one period
and on time in the next; on average it keeps its rate. A task that sleeps for a fixed time from
"now" accumulates every delay, and its average rate is wrong. The
[periodic tasks lesson](/learn/periodic-tasks/) shows both.

Control loops and audio are sensitive to jitter even when every [deadline](/learn/glossary/deadline/) is met, because the
sample is taken at the wrong moment. The usual remedy is to give the periodic task a higher
priority, or to move the time-critical part (reading an input, writing an output) into a timer
interrupt and leave the computation to the task.
