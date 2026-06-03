---
title: ArduRTOS
summary: ArduRTOS is an educational repository designed to teach FreeRTOS programming
  through practical examples on the Arduino platform. It provides a structured curriculum
  covering task management, scheduling, and hardware interfacing for students and
  hobbyists.
codeUrl: https://github.com/Dentrax/ArduRTOS
isShow: false
rtos: freertos
libraries: []
topics:
- arduino
- freertos
- rtos
- arduino-uno
- arduino-mega
- arduino-platform
- arduino-boards
- examples
- example-project
- example-repo
- example-codes
- learning
- learning-exercise
- atmel
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-repo
- oficina-de-circuitpython
- rapid-embedded-systems-design-education-kit
- learning-stm32
- development-of-real-time-systems-assignments
- arduino-osek-with-erika-enterprise-ee
---

ArduRTOS serves as a comprehensive guide for developers looking to transition from simple sequential Arduino sketches to the world of Real-Time Operating Systems (RTOS). Created by Furkan Türkal, this repository is structured as a learning path that gradually introduces the core concepts of FreeRTOS using the familiar Arduino ecosystem.

### A Structured Learning Path
The project is organized into chapters that mirror a typical computer science curriculum or an embedded systems course. This structure makes it an excellent resource for CS101 students or anyone preparing for exams in embedded systems. The chapters include:

- **Chapter 01 (Basics):** Introduces the bare minimum requirements for an RTOS sketch, task templates, and basic multi-tasking.
- **Chapter 02 (Digital):** Demonstrates how to handle digital inputs and outputs, such as buttons and servos, within a multi-threaded environment.
- **Chapter 03 (Analog):** Focuses on reading analog sensors without blocking the execution of other tasks.
- **Chapter 04 (Tasks):** Dives deep into advanced RTOS features like task priorities, task deletion, and Inter-Process Communication (IPC) using queues.

### Core RTOS Concepts in Practice
One of the primary hurdles for Arduino developers is moving away from the `delay()` function, which halts the entire processor. ArduRTOS teaches the use of `vTaskDelay()`, which allows the scheduler to run other tasks while one is waiting. 

For example, a basic task in ArduRTOS follows this standard template:

```c
void vTask(void *pvParameters) {
  (void) pvParameters;
  const char *pcTaskName = "Task";
  Serial.begin(9600);

  for(;;) {
    Serial.println(pcTaskName);
    // Task logic goes here
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}
```

### Multi-Tasking and Scheduling
The repository provides clear examples of how to instantiate multiple tasks with different priorities. By using `xTaskCreate`, users can see how the FreeRTOS scheduler manages CPU time between competing processes. The examples demonstrate how higher-priority tasks can preempt lower-priority ones, a fundamental concept in real-time computing.

### Hardware and Software Requirements
To get started with ArduRTOS, you need the Arduino IDE and the `Arduino_FreeRTOS.h` library. The project is designed to be compatible with standard AVR-based Arduinos (like the Uno or Mega). For those without physical hardware, the author suggests using virtual simulators like Proteus to test the logic and timing of the RTOS tasks.

### Why ArduRTOS Matters
In modern embedded development, the ability to manage complex, concurrent operations is vital. ArduRTOS bridges the gap between simple hobbyist projects and professional-grade firmware development. By providing 10+ examples per chapter, it ensures that learners have ample material to practice and master the nuances of real-time scheduling, task synchronization, and resource management.
