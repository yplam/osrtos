---
title: Vex Autonomous Selector for PROS
summary: A graphical autonomous routine selector for VEX V5 robots using the PROS
  framework and LVGL. It provides a touchscreen interface on the V5 Brain for selecting
  alliance-specific autonomous programs and skills routines during competition.
slug: vex-autonomous-selector-for-pros
codeUrl: https://github.com/kunwarsahni01/Vex-Autonomous-Selector
star: 33
version: 2.1.4
lastUpdated: '2020-03-31'
rtos: freertos
libraries:
- lvgl
topics:
- cpp
- lvgl
- pros
- vex
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- taproot
- lvgl-demo-embarcadores
- fluxgarage-roboeyes-library
- lvgl-joystick-library
- texas-aimbots-embedded-development
- visual-programming-for-zig-with-nuttx-sensors
---

## Overview

The Vex Autonomous Selector is a specialized utility designed for VEX Robotics teams using the PROS (Purdue Robotics Operating System) framework. It addresses a common challenge in competitive robotics: the need to quickly and reliably switch between different autonomous routines—such as Red Alliance, Blue Alliance, or Programming Skills—directly from the robot's touchscreen interface without modifying or redeploying code.

Built on top of the LVGL (Light and Versatile Graphics Library), the selector provides a clean, tabbed interface on the VEX V5 Brain. It allows drivers to select their starting position and strategy during the pre-match setup phase, ensuring the correct code runs as soon as the competition switch is activated.

## Technical Implementation

The project is structured as a PROS library that integrates into the standard V5 firmware environment. It leverages several key components of the PROS/LVGL ecosystem:

*   **LVGL Integration**: The UI is constructed using LVGL objects, including `lv_tabview` for navigating between Red, Blue, and Skills categories, and `lv_btnm` (button matrix) for selecting specific routines within those categories.
*   **Task Management**: The selector utilizes a background task called `tabWatcher`. This task monitors the active tab in the UI and updates the internal state variables based on user interaction, ensuring the selection is synchronized even if the user switches between alliance colors.
*   **State Mapping**: The selector maps user choices to a global integer variable `selector::auton`. By convention, positive values represent Red alliance routines, negative values represent Blue alliance routines, and zero represents the Skills routine.

## Key Features

*   **Dynamic Configuration**: Users can define the number of autonomous routines and their display names via simple macros in the `selection.h` header file.
*   **Theme Customization**: The UI supports HUE adjustments, allowing teams to customize the visual theme of the selector to match their branding or preference.
*   **Automatic State Handling**: The system includes logic to handle default selections and ensures that switching tabs (e.g., from Red to Blue) correctly updates the routine index to reflect the new alliance side.

## Integration and Usage

Integrating the selector into a PROS project involves initializing the library within the `initialize()` function of the robot's main control loop. Once initialized, the selected routine can be queried within the `autonomous()` function using standard conditional logic:

```cpp
void autonomous() {
  if(selector::auton == 1) {
    // Run Red Front autonomous routine
  } else if(selector::auton == -1) {
    // Run Blue Front autonomous routine
  } else if(selector::auton == 0) {
    // Run Programming Skills routine
  }
}
```

This approach decouples the autonomous logic from the UI code, making it easy for teams to add or remove routines as their strategy evolves throughout a competition season. The use of a dedicated background task for UI monitoring ensures that the interface remains responsive without interfering with other initialization procedures like sensor calibration.
