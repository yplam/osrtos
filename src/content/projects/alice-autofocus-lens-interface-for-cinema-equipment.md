---
title: 'Alice: Autofocus Lens Interface for Cinema Equipment'
summary: Alice is an Android-based autofocus controller that utilizes Intel RealSense
  depth sensors to provide external autofocus for cinema cameras. The system leverages
  a Zephyr RTOS-based nRF52840 wireless bridge to communicate with Tilta Nucleus Nano
  II focus motors, enabling AF capabilities for manual and adapted lenses.
slug: alice-autofocus-lens-interface-for-cinema-equipment
codeUrl: https://github.com/Stry233/alice
version: V0.2.0
lastUpdated: '2025-12-07'
licenses:
- MIT
image: /202604/alice_0.avif
rtos: zephyr
topics:
- android
- autofocus
- camera
- cinematography
- dslr
- dslr-camera-control
- face-detection
- filmmaking
- kotlin
- lens
- nrf52840
- realsense
isShow: true
createdAt: '2026-04-18T01:29:35+00:00'
updatedAt: '2026-04-18T01:29:35+00:00'
---

## Bridging the Gap in Cinema Focusing

In the world of professional cinematography, autofocus has historically been viewed with skepticism. However, for solo operators or those using adapted vintage glass, the lack of reliable autofocus can be a significant hurdle. Alice (Autofocus Lens Interface for Cinema Equipment) provides a sophisticated solution by bypassing the camera's internal systems entirely. Instead of relying on phase-detect or contrast-detect pixels on a camera sensor, Alice uses dedicated external depth-sensing hardware to measure distance and drive a wireless focus motor.

By decoupling the focusing logic from the camera body, Alice allows filmmakers to bring modern autofocus features—like face tracking and continuous point focus—to manual-focus lenses, adapted glass, or older camera systems with restrictive firmware.

## The Hardware Ecosystem

The Alice system is built around a modular hardware stack that combines mobile processing power with specialized sensors and embedded controllers. At its core, the system requires:

*   **Android Device:** A phone or tablet (Android 8.0+) acting as the primary interface and processing hub.
*   **Intel RealSense Depth Camera:** Models like the D415, D435, or D405 provide the raw spatial data required to calculate subject distance.
*   **Wireless Bridge:** An nRF52840 USB dongle running custom firmware built on the **Zephyr RTOS**. This bridge handles the low-latency communication between the Android device and the lens motor.
*   **Focus Motor:** The system is designed to work with the Tilta Nucleus Nano II wireless lens control system.

This setup creates a feedback loop: the RealSense camera captures depth information, the Android app processes this data to determine the correct focus position, and the nRF52840 bridge transmits the position commands to the Tilta motor via a reverse-engineered communication protocol.

## Advanced Focusing Modes

Alice offers several modes that mirror the functionality found in high-end mirrorless cameras, but applied to any lens attached to the rig:

### Continuous and Single-Point Focus
In **Single Point Focus (AF-S)**, a simple tap on the screen tells Alice to measure the depth at that specific coordinate and lock the motor to that distance. For moving subjects, **Continuous Point Focus (AF-C)** tracks the depth at a selected screen position in real-time, automatically adjusting the focus motor as the subject-to-camera distance changes.

### Face Tracking (AF-F)
Utilizing mobile vision processing, Alice can detect and track human faces. When multiple subjects are in the frame, users can tap to select which face the system should prioritize. This is particularly useful for gimbal work where the operator cannot manually pull focus while moving.

### Manual Overrides
Even in an automated system, manual control remains vital. Alice includes an on-screen slider for direct motor control, covering the full 0–4095 position range, along with preset buttons for jumping to common distances quickly.

## Technical Implementation and Firmware

The project utilizes the **Zephyr RTOS** for the wireless bridge firmware, ensuring robust and deterministic handling of the USB-to-wireless communication. The firmware (found in the `firmware/` directory) is configured as a USB CDC ACM device, allowing the Android app to communicate with the nRF52840 dongle as if it were a standard serial peripheral. 

One of the technical highlights of Alice is its adaptability to hardware constraints. While USB 3.0 is recommended for high-bandwidth depth and RGB streams, the system can automatically downgrade to a depth-only mode when connected via USB 2.0 (480 Mbps). This ensures that autofocus remains functional even on older mobile devices or through more restrictive USB hubs.

## Calibration and Constraints

Because Alice is an external system, it requires a calibration phase for every lens used. This process maps the relationship between the physical distance measured by the RealSense sensor and the specific motor position required to achieve focus at that distance. While this adds a few minutes to the initial setup, it allows the system to work with virtually any lens, including non-parfocal zooms (provided separate profiles are created for different focal lengths).

Alice represents a powerful example of how off-the-shelf depth sensors and embedded RTOS platforms can be combined to solve complex problems in the professional video industry, providing solo shooters with tools that were previously the exclusive domain of dedicated focus pullers.
