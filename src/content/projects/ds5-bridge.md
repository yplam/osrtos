---
title: DS5 Bridge
summary: DS5 Bridge is a firmware and software suite that enables wireless Sony DualSense
  controller support on Windows via a Raspberry Pi Pico 2 W. It utilizes the TinyUSB
  and BTstack libraries to bridge Bluetooth HID reports to USB, featuring advanced
  support for HD haptics, adaptive triggers, and integrated audio. The project includes
  a dedicated Windows companion app for real-time configuration and profile management.
slug: ds5-bridge
codeUrl: https://github.com/SundayMoments/DS5_Bridge
version: v1.5.1
lastUpdated: '2026-06-01'
licenses:
- AGPL-3.0
image: /202606/DS5_Bridge_2.avif
rtos: ''
topics:
- bluetooth
- companion-app
- dualsense
- dualsense-edge
- firmware
- hid
- pico-w
- raspberry-pi-pico
- windows
isShow: true
createdAt: '2026-06-02T23:23:14+00:00'
updatedAt: '2026-06-02T23:23:14+00:00'
relatedProjects:
- esp-usb-ble-hid-bridge
- dshare-hid
- midi2piousbhub
- picogamepadconverter
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- m5-keyboard-and-mouse-emulator
---

DS5 Bridge provides a high-performance wireless solution for using Sony DualSense and DualSense Edge controllers on a Windows PC. By leveraging the Raspberry Pi Pico 2 W as an intermediary hardware bridge, the system allows the controller to pair over Bluetooth while the Pico connects to the PC via USB. This architecture ensures that Windows recognizes the device as a standard DualSense-compatible USB controller, maintaining compatibility with modern games and applications.

### Core Functionality and Setup

The bridge simplifies the wireless experience by handling the complex Bluetooth pairing and HID translation on the Pico hardware. Getting started involves flashing the Pico 2 W with a provided `.uf2` firmware file. Once flashed, the Pico handles Bluetooth inquiry and pairing automatically when the controller is placed in pairing mode. After the initial connection, the Windows companion app serves as the primary interface for managing the bridge without requiring the user to reflash the firmware for configuration changes.

### Comprehensive Feature Set

Beyond basic button inputs, DS5 Bridge focuses on preserving the premium features of the DualSense hardware. Users can wirelessly access HD haptics, classic rumble, and adaptive trigger effects. The system also supports integrated audio, allowing for the use of the controller's built-in speaker and the 3.5mm headphone jack. To ensure smooth audio performance, the project implements Host Encoding, which manages the data stream to prevent stuttering or static during gameplay.

### Companion App Tour

The Windows companion app is the central hub for monitoring the bridge and fine-tuning controller behavior. It provides a clean, visual interface for adjustments that are usually locked or difficult to access in standard drivers.

#### Overview and Monitoring

The dashboard offers a real-time look at the connection status, including battery levels, active audio routing, and Bluetooth signal quality. This view ensures that players can monitor their hardware health at a glance while managing active profiles.


#### Haptics and Vibration

Precision control over haptic feedback allows users to adjust the strength of both HD haptics and traditional rumble motors. The app includes testing tools to feel the vibration strength before launching a game, ensuring the feedback matches personal preference.

![Haptics and rumble controls in the DS5 Bridge companion app](/202606/DS5_Bridge_3.avif)

#### Audio Management

The audio suite manages the complex task of routing sound to the controller. It provides levels for the speaker and microphone, along with a toggle for Host Encoding. This feature is critical for maintaining high-quality audio through the controller's headphone jack.

![Audio controls in the DS5 Bridge companion app](/202606/DS5_Bridge_4.avif)

#### Adaptive Triggers

One of the standout features of the DualSense is its adaptive triggers. DS5 Bridge allows users to set trigger strength and experiment with different sample effects directly within the companion app, providing a tactile preview of how the triggers will respond in-game.

![Adaptive trigger controls in the DS5 Bridge companion app](/202606/DS5_Bridge_5.avif)

#### Lighting and Customization

Users can customize the lightbar's brightness and color. The app can also take over lighting behavior automatically, providing visual feedback for different states or profiles. Furthermore, the system includes a visual button remapping tool, allowing for complete layout customization that is saved to the bridge's runtime settings.

### Technical Architecture

The project is divided into several specialized modules that handle the complexity of the DualSense protocol. The firmware is built on the Raspberry Pi Pico SDK and utilizes several key components:

*   **USB & HID**: `src/usb.cpp` and `src/usb_descriptors.c` manage the TinyUSB stack, presenting the device as a standard controller to the host PC.
*   **Bluetooth Stack**: `src/bt.cpp` manages Bluetooth L2CAP HID channels and report queueing using BTstack.
*   **Audio Processing**: `src/audio.cpp` handles the ingestion of USB audio, haptic resampling, and Opus encoding for the controller speaker.
*   **Companion Protocol**: `src/companion.cpp` implements a vendor-specific HID protocol that allows the Windows app to communicate with the firmware for status reports and command acknowledgments.

The companion app itself is built with Electron and includes a native Windows host audio helper to facilitate high-quality audio encoding. This multi-layered approach ensures that the bridge remains responsive while handling high-bandwidth audio and haptic data.
