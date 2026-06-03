---
title: RT-Thread Package List
summary: A curated collection of portable open-source libraries identified for integration
  with the RT-Thread RTOS. The repository tracks various C-based projects including
  networking stacks, GUI modules, and file parsers, providing a roadmap for community-driven
  porting efforts.
slug: rt-thread-package-list
codeUrl: https://github.com/rtpkgs/rtpkg_list
star: 15
lastUpdated: '2018-10-16'
rtos: rt-thread
libraries:
- ugui
topics:
- package
- rt-thread
- rtpkgs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- c-common-for-rt-thread
- awesome-zephyr-rtos
- micro-ros-for-rt-thread
- rtt-validator
- stm32h5-classic-core-middleware-coremw-mcu-firmware-package
- freertos-wrapper-for-rt-thread
---

## Overview

The RT-Thread Package List (rtpkg_list) serves as a centralized directory for high-quality, portable open-source libraries that are suitable for the RT-Thread ecosystem. The project aims to identify useful C and C++ repositories from across the web and organize them into a structured list to encourage developers to port them to RT-Thread, thereby expanding the available middleware for embedded developers.

## Curated Library Categories

The repository covers a broad spectrum of functionality essential for modern embedded systems. By focusing on libraries that are "interesting, useful, and easy to port," the list provides a diverse set of tools for developers:

*   **Data Parsing & Serialization:** Includes tools like `iniparser` for configuration files, `libnxml` for XML processing, `libyaml` for YAML support, and `pbc` for Protocol Buffers.
*   **Networking & Communication:** Features lightweight implementations such as `lwmqtt` for IoT connectivity, `Tinyhttpd` for minimal web serving, and `libIEC61850` for industrial protocols.
*   **Graphics & UI:** Lists several GUI frameworks suitable for resource-constrained hardware, including `SimpleGUI` for monochrome displays and the popular `UGUI` module.
*   **Mathematics & AI:** Highlights specialized libraries like `Tinn` (a 200-line neural network library), `TinyEKF` for Kalman filtering, and `linmath` for 3D graphics math.
*   **Utilities:** Covers essential system utilities such as `minmea` for GPS NMEA parsing, `id3v2lib` for MP3 metadata, and `TinyJPEG` for image decoding.

## Porting and Community Status

One of the primary functions of this repository is to track the progress of porting these libraries to the RT-Thread environment. The list maintains a status column indicating whether a library is "pending" or "completed." For example, the `cstring` library has been successfully ported by the community, while many others remain open for contributors to take ownership.

This collaborative approach allows the RT-Thread community to prioritize high-value libraries and avoid redundant efforts. It serves as an excellent entry point for developers looking to contribute to the RT-Thread package ecosystem but who may not know which external libraries are currently needed.

## Technical Characteristics

The libraries selected for this list generally share common traits that make them ideal for embedded systems:
- **Minimal Dependencies:** Most are written in ANSI C or C99 with few external requirements.
- **Small Footprint:** Many are single-header libraries or have very low memory overhead.
- **Permissive Licensing:** The majority of the listed projects use MIT, BSD, or Apache 2.0 licenses, making them suitable for both open-source and commercial RT-Thread projects.
