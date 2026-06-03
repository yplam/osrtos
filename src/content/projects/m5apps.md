---
title: M5Apps
summary: A comprehensive multi-application launcher and management system for the
  M5 CardPuter. Built on ESP-IDF and FreeRTOS, it enables users to install and run
  multiple applications from cloud repositories, SD cards, and USB storage.
slug: m5apps
codeUrl: https://github.com/d4rkmen/M5Apps
star: 16
version: '2.3'
lastUpdated: '2026-02-03'
rtos: freertos
libraries:
- lwip
topics:
- cardputer
- esp-idf
- esp32-s3
isShow: true
image: /202602/m5apps.webp
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- tab5-launcher
- esp32-graphical-bootloader
- ultimate-remote-for-m5cardputer
- m5pi-launcher
- m5-crystal
- esp8266sdupdater
---

## Overview

M5Apps is a full-featured firmware bundle designed to transform the M5 CardPuter into a versatile multi-application platform. Rather than being limited to a single flashed binary, M5Apps provides a sophisticated launcher and management system that allows users to install up to 16 different applications, limited only by the device's flash size. The system provides an intuitive user interface for navigating between installed tools and managing system-wide preferences.

## Core Functionality and Built-in Apps

The project includes a suite of essential built-in applications that provide immediate utility upon flashing:

- **Launcher**: The central hub featuring smooth menu navigation, boot animations, and quick access to all installed software.
- **Installer**: A versatile tool for adding new software from various sources, including remote cloud repositories via WiFi, SD cards, and USB mass storage devices.
- **Flood**: An advanced mesh chat application utilizing ESP-NOW for communication, featuring channel support and message history.
- **Finder**: A dual-panel file manager that allows users to browse and manage files on both SD cards and USB drives.
- **FDISK**: A partition management tool specifically designed for managing the flash storage on the ESP32-S3.
- **Settings**: A centralized configuration app for WiFi setup, screen dimming, sound preferences, and battery monitoring.

## Technical Implementation

M5Apps is built using the **ESP-IDF (v5.5.2)** framework and leverages the **Mooncake** application framework for its lifecycle management. The system architecture is designed around a Hardware Abstraction Layer (HAL) that supports both the original M5 CardPuter v1.x and the newer ADV version. 

One of the standout technical features is the **Installer's cloud source**, which mirrors the M5Burner CardPuter category. It automatically refreshes its list of available apps and allows for direct flashing of remote binaries to the device without requiring an intermediate download to an SD card. The project also implements custom bootloader components and a specific partition layout to manage the multi-app environment effectively.

## Hardware and System Features

The firmware takes full advantage of the CardPuter's hardware capabilities:
- **Connectivity**: Full WiFi support for repository access and ESP-NOW for mesh networking.
- **Storage**: Support for FAT32 and exFAT filesystems on both SD cards and USB drives (via USB MSC).
- **User Interface**: Real-time battery monitoring, automatic screen dimming, and customizable boot sounds/logos.
- **Input**: Full keyboard navigation support, including specialized shortcuts like `CTRL + SPACE` for capturing BMP screenshots to the SD card.

## Development and Extensibility

For developers, M5Apps offers a structured environment for creating new applications. Apps are implemented as C++ classes inheriting from the Mooncake framework, which provides standardized UI components, dialogs, and a database for inter-app communication. The build system is based on CMake, following standard ESP-IDF project structures, making it accessible for developers familiar with the Espressif ecosystem.
