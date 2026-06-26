---
title: Obscura One
summary: Obscura One is an open-source, screenless digital camera based on the ESP32-CAM
  platform and housed in a 3D-printable enclosure. It captures JPEG images to a Micro
  SD card and features a minimalist single-button control scheme with haptic feedback
  and a Wi-Fi access point for wireless photo retrieval.
slug: obscura-one
codeUrl: https://github.com/chriko3/ObscuraOne
lastUpdated: '2026-05-25'
licenses:
- NOASSERTION
image: /202606/ObscuraOne_0.avif
rtos: ''
topics:
- arduino
- camera
- diy
- esp32
- retro
isShow: true
createdAt: '2026-06-25T23:50:47+00:00'
updatedAt: '2026-06-25T23:50:47+00:00'
relatedProjects:
- openrover-robotic-platform
- espframe-for-immich
- paperlesspaper-e-paper-photo-frame-hardware
- micropython-camera-driver-for-esp32
- micropython-camera-api-for-esp32
- esp32-cam-mjpeg-streaming-and-sd-capture
---

## Minimalist Photography with Obscura One
Obscura One is a minimalist, screenless camera project designed to bring back a nostalgic, distraction-free photography experience. Built with a focus on hackability and simplicity, the device is entirely open-source and utilizes a 3D-printable housing. It provides a modern take on the classic point-and-shoot vibe, stripping away the screen to encourage photographers to focus on the moment rather than the digital preview.


## Performance and Build Characteristics
The project is designed for accessibility, with an estimated build time of approximately four hours and a low component cost. Despite its simple appearance, it offers a robust battery life of two to three hours, depending on Wi-Fi usage. The housing is designed for PETG filament to ensure durability and heat resistance, especially important for the internal electronics during operation.

## Intuitive Control and Haptic Feedback
Operating the Obscura One is handled through a single-button interface. This minimalist approach uses specific click patterns to toggle between different capture modes and system states:

- **Standard Capture**: A single click takes a normal photo.
- **Flash Photography**: A double click triggers a photo with the integrated flash.
- **Wireless Management**: Holding the button for three seconds toggles the Wi-Fi mode for photo download.

![Obscura One camera side view](/202606/ObscuraOne_1.avif)

Since there is no screen, the camera communicates with the user via a PWM vibration motor. Different vibration patterns indicate successful power-on, photo capture, and Wi-Fi status changes. For example, three short vibrations signal that Wi-Fi has been activated, while three long vibrations indicate a return to photo mode.

## Hardware Architecture and Connectivity
The system is powered by the AI Thinker ESP32-CAM module, which integrates the camera sensor and Wi-Fi capabilities. A 1100 mAh LiPo battery provides portable power, managed by a TP4056 charging module and a step-up (boost) converter to maintain the 5V required by the ESP32. Storage is handled via a Micro SD card formatted to FAT32.

When Wi-Fi is activated, the camera creates a local access point named "Obscura One." Users can connect to this network to access a web interface for viewing and downloading JPEG images directly from the camera's storage.

## Assembly and Circuitry
The internal layout is optimized for a compact form factor. Components like the vibration motor, charging module, and boost converter are secured within the 3D-printed case using adhesive. 

![Internal assembly of the ESP32-CAM and battery](/202606/ObscuraOne_2.avif)

The electrical design follows a straightforward path from the battery through the charging and protection circuit to the boost converter. The tactile button for user interaction is mapped to GPIO 13, while the vibration motor is controlled via GPIO 12.

![Full wiring and circuit diagram](/202606/ObscuraOne_4.avif)

## Software Implementation
The firmware is developed using the Arduino IDE. It leverages the `esp_camera` library for low-level sensor management and `SD_MMC` for high-speed data writing to the storage card. The web server functionality is handled by the standard ESP32 `WebServer` library, providing a simple portal for file management when the device is in Wi-Fi mode. User preferences and system states are persisted using the `Preferences` library to ensure consistent behavior across power cycles.
