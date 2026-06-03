---
title: Senko - OTA Updater for MicroPython
summary: A lightweight Over The Air (OTA) update solution for MicroPython projects
  targeting ESP8266 and ESP32 microcontrollers. It synchronizes local files with remote
  GitHub repositories by comparing SHA1 hashes to ensure devices are running the latest
  code.
slug: senko-ota-updater-for-micropython
codeUrl: https://github.com/RangerDigital/senko
star: 100
version: v2.0.4
lastUpdated: '2021-02-07'
rtos: ''
libraries:
- micropython
topics:
- esp32
- esp8266
- microcontroller
- micropython
- ota-update
- ota-updater
- over-the-air
- senko
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sdcard-boot-with-ota-for-micropython
- esp32-ble-ota-arduino
- esp-async-http-update-server
- esp32-ota-firmware-update-and-file-management
- mqboard-micropython-mqtt-micro-framework
- bleota-esp32-ota-updates-over-ble
---

## Overview

Senko provides a straightforward approach to Over The Air (OTA) updates for MicroPython-based IoT devices. Specifically designed for the ESP8266 and ESP32 platforms, it allows developers to keep their fleet of sensors or controllers synchronized with the latest code hosted in a GitHub repository. 

Unlike complex firmware update systems, Senko operates at the file level. It compares the SHA1 hashes of local files on the microcontroller with their remote counterparts on GitHub. If a discrepancy is found, Senko downloads the newer version and saves it to the local filesystem. This mechanism makes it an ideal choice for rapid deployment and remote maintenance of MicroPython applications.

## Operating Principle

The core logic of Senko revolves around two primary methods: `.fetch()` and `.update()`. When these methods are invoked, the library performs the following steps:
1. It retrieves the SHA1 hash of the specified files from the remote GitHub repository.
2. It calculates or retrieves the hash of the local files on the microcontroller.
3. If the hashes do not match, the remote file is fetched and written to the local storage.

Because MicroPython typically loads modules at startup, a system reboot is generally required after an update to execute the newly downloaded code. Senko leaves the responsibility of network connectivity and the reboot strategy (e.g., using `machine.reset()`) to the developer, allowing for flexible integration into various application workflows.

## Technical Implementation

Senko is distributed as a single Python module, `senko.py`, making it extremely easy to include in projects. It can be installed via `upip` from PyPi or manually uploaded using tools like Ampy or WebREPL. 

### Configuration and Usage

To use Senko, you initialize a `Senko` object with your GitHub credentials and the list of files you wish to track. You can specify a specific branch and a working directory within the repository.

```python
import senko
import machine

# Define the OTA configuration
OTA = senko.Senko(
  user="your-github-username",
  repo="your-repo-name",
  branch="master",
  files=["boot.py", "main.py"]
)

# Check and apply updates
if OTA.update():
    print("Updated to the latest version! Rebooting...")
    machine.reset()
```

Alternatively, if your files are hosted in a specific subdirectory or a non-standard path, you can provide a direct URL to the GitHub directory containing the raw files.

### Checking for Updates

If you want to check for updates without immediately downloading them—perhaps to notify a user or wait for a low-activity period—you can use the `.fetch()` method. This returns a boolean indicating whether a newer version is available on the remote server.

```python
if OTA.fetch():
    print("A newer version is available!")
else:
    print("System is up to date.")
```

## Target Platforms

Senko is optimized for the MicroPython ecosystem, specifically targeting the ESP8266 and ESP32 series of microcontrollers. These chips are widely used in the IoT space due to their integrated Wi-Fi capabilities, and Senko leverages this connectivity to provide a seamless update experience without requiring physical access to the hardware.
