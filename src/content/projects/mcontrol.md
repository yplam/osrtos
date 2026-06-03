---
title: MControl
summary: A PX4/NuttX application designed to activate offboard control mode and manage
  drone flight internally on Pixhawk hardware. It utilizes the uORB inter-process
  communication layer and POSIX threads to provide high-level autonomous commands
  without requiring an external companion computer.
slug: mcontrol
codeUrl: https://github.com/MHageH/mcontrol
star: 3
lastUpdated: '2016-07-29'
rtos: nuttx
topics:
- arm
- mcontrol
- nuttx
- px4
- stm32f4
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- droners
- flight-controller-rev2
- protoflight
- catpilot-autopilot-software-stack
- avem
- catpilot
---

MControl is a specialized control module for the PX4 autopilot ecosystem, designed to run as a native application on the NuttX RTOS. Its primary purpose is to enable offboard control mode internally, allowing the drone to execute autonomous flight sequences directly on the Pixhawk hardware. This approach is unique because it eliminates the dependency on external calculators or companion computers typically used for MAVLink-based offboard control.

## Architecture and Design

The project is built as a daemon application, ensuring it can run in the background of the PX4 system. It features a robust multi-threaded architecture using POSIX threads (pthreads) to manage concurrent operations. The system is divided into a core control module and a dedicated thread layer. 

One of the most significant technical aspects of MControl is its deep integration with the uORB (micro Object Request Broker) inter-process communication layer. By subscribing to and publishing to various uORB topics, MControl can read sensor data, monitor vehicle status, and issue setpoints for position and velocity. This allows the application to remain MAVLink protocol independent, as it communicates directly with the drone's internal drivers and flight controller components.

## Key Capabilities

- **Internal Offboard Control**: Activates and manages offboard mode without external hardware.
- **Multithreaded Execution**: Uses separate threads for reading system state and writing control setpoints to ensure low-latency responses.
- **uORB Integration**: Interfaces with a wide array of PX4 topics, including vehicle_local_position, vehicle_status, and actuator_controls.
- **High-Level Command Support**: Includes functions for initial position acquisition and local position tracking to facilitate complex flight maneuvers.
- **Resource Efficiency**: Recent updates have focused on reducing memory consumption and optimizing the daemon architecture for embedded constraints.

## Technical Implementation

The core of the application is defined in the `MControl` class, which initializes the module and starts the processing logic. The `mcontrol_thread` class manages the lifecycle of the read and write threads. The read thread typically monitors the drone's current state and local position, while the write thread publishes setpoints to the `offboard_control_mode` and `vehicle_local_position_setpoint` topics.

```cpp
// Example of how the thread layer manages uORB subscriptions
void mcontrol_thread::get_local_position() {
    bool updated;
    orb_check(_local_position_sub, &updated);
    if (updated) {
        orb_copy(ORB_ID(vehicle_local_position), _local_position_sub, &local_position);
    }
}
```

## Deployment and Usage

MControl is intended to be integrated directly into the PX4 Firmware source tree. It is added as an example module and compiled into the NuttX firmware image for targets like `px4fmu-v2`. Once the firmware is loaded, users can interact with the application via the NuttX Shell (NSH). After arming the drone and achieving a GPS lock, the `mcontrol` command activates the custom control logic, allowing the drone to take over position control based on the programmed setpoints.
