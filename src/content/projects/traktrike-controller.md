---
title: TrakTrike-Controller
summary: An Arduino Nano-based interface designed to enhance the control and safety
  of dual-track vehicles using inexpensive BLDC motor controllers. It replaces standard
  filtered PWM with a high-resolution 12-bit DAC and implements configurable drive
  profiles, throttle shaping, and track trim compensation.
slug: traktrike-controller
codeUrl: https://github.com/tonygoacher/TrakTrike-Controller
version: 1.0.0
lastUpdated: '2026-07-01'
image: /202607/TrakTrike-Controller_0.avif
rtos: ''
topics:
- arduino
- arduino-nano
- bldc
- embedded
- mcp4728
- motor-control
- platformio
isShow: true
createdAt: '2026-07-19T07:16:21+00:00'
updatedAt: '2026-07-19T07:16:21+00:00'
---

The TrakTrike-Controller is a specialized embedded solution born from real-world necessity. Originally developed for the TrakTrike—an electrically-driven dual-track sit-on vehicle featured at EMF Camp 2022—this project addresses a common hurdle in DIY electric vehicle builds: the trade-off between motor controller cost and control precision.

### The Evolution of Control
In early iterations, the TrakTrike utilized VESC75100 clones. While these provided excellent acceleration and deceleration profiles, they proved fragile in field conditions. Transitioning to inexpensive, robust BLDC controllers from AliExpress solved the reliability issue but introduced a new problem: poor low-speed throttle behavior. These budget controllers often make vehicles difficult to maneuver safely at low speeds, as the throttle response is frequently non-linear or overly aggressive. 

The TrakTrike-Controller acts as a sophisticated middleman, sitting between the physical vehicle controls and the BLDC motor controllers to transform raw inputs into smooth, predictable motion.

### Hardware Architecture
Built around the accessible Arduino Nano, the system's standout feature is its move away from traditional filtered PWM signals. Instead, it utilizes an MCP4728 12-bit quad DAC. This choice provides several technical advantages:
- **True Analogue Outputs**: Eliminates the ripple associated with PWM-to-analogue filtering.
- **High Resolution**: 12-bit precision allows for much finer control over the motor's starting torque and speed increments.
- **Repeatability**: Digital calibration ensures that values are consistent across power cycles.

To ensure the signals are robust enough for the motor controllers, an MCP6002 rail-to-rail op-amp is used as a voltage follower, "beefing up" the DAC output. The user interface is handled via a 16x2 I²C LCD, providing real-time feedback on modes and calibration status.

### Advanced Throttle Processing
The controller doesn't just pass a signal through; it processes the throttle input through a multi-stage pipeline:
1. **ADC Filtering**: Smooths out noise from the Hall-effect twist throttle.
2. **Deadband Removal**: Ensures the vehicle doesn't creep when the throttle is at rest.
3. **Soft Take-up & Curves**: Implements a configurable throttle curve for a natural feel.
4. **Ramp Limiting**: Prevents sudden jerks by controlling the rate of change.
5. **Trim Compensation**: Applies a unique calibration table that adjusts the left and right drive tracks independently to ensure the vehicle tracks straight across the entire throttle range.

### Operating Profiles and Safety
Safety is a core focus of the design. The firmware includes several drive profiles—Normal, Slow, Reverse, Brake, and Force—each with its own acceleration rates and maximum output limits. The "Brake" mode is the highest priority, immediately resetting drive outputs for rapid deceleration.

Furthermore, the controller implements a startup throttle inhibit. Many BLDC controllers fail to initialize if they detect a throttle voltage at power-up; the TrakTrike-Controller prevents this by forcing 0V outputs until the system is fully booted. Configuration data is stored in EEPROM and protected by version checking and CRC validation, ensuring that a corrupted memory bit won't lead to unsafe vehicle behavior.

### Calibration and Integration
For builders, the project includes a comprehensive serial command interface. This allows users to set minimum and maximum throttle values, define the DAC "start" voltage (the point where the motor just begins to turn), and build the trim compensation table using a tachometer. The inclusion of DesignSpark files and GCODE for PCB manufacture makes it a ready-to-deploy solution for anyone building tracked platforms or dual-motor drive projects.
