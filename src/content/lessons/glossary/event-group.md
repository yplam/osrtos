---
title: Event group
description: A set of event bits that tasks set, clear and wait for, waiting for all of a set of bits or for any one of them.
---

An **event group** is a word of bits, each standing for an event: "data ready", "link up",
"error". Tasks, interrupt handlers and timer callbacks **set** and **clear** bits; a task **waits**
for some of them:

- for **all** of a set of bits (a conjunction: "the data *and* the link"), or
- for **any** of them ("the link *or* an error").

Setting bits wakes **every** waiting task whose condition is now met, so one call can release
several tasks, unlike a [semaphore](/learn/glossary/semaphore/) give, which wakes one. A waiter can
ask for the bits it waited for to be **cleared on exit**, so an event is handled once; otherwise
the bits stay set until someone clears them. Bits are remembered but not counted: setting a bit
that is already set changes nothing.

The [event groups lesson](/learn/event-groups/) shows one task waiting for two events and another
waiting for either of two, both woken by one set.

In **FreeRTOS**: `xEventGroupCreate()`, `xEventGroupSetBits()`, `xEventGroupClearBits()`,
`xEventGroupWaitBits( group, bits, clearOnExit, waitForAll, timeout )`, which returns the group's
bits as they were when the task was woken. With 32-bit ticks a group has 24 usable bits. From an
interrupt, `xEventGroupSetBitsFromISR()` hands the work to the
[timer service task](/learn/glossary/timer-service-task/). In **Zephyr** the object is `k_event`:
`K_EVENT_DEFINE()`, `k_event_post()`, `k_event_clear()`, `k_event_wait()` for any and
`k_event_wait_all()` for all, each also in a `_safe` form that clears what it gets. A wait returns
only the events that satisfied it, and an interrupt posts events directly.
