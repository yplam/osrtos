---
title: Sistema de Apertura de Portón con Módulo GSM
summary: An ESP32-based application designed to control an electric gate remotely
  using SMS via a SIM800L GSM module. The system manages authorized users through
  a text file in SPIFFS and ensures gate state persistence across reboots using the
  Preferences library.
slug: sistema-de-apertura-de-port-n-con-m-dulo-gsm
codeUrl: https://github.com/andrey-08/Sistema-de-apertura-de-porton-con-modulo-GSM---Taller-comunicaciones-electricas
star: 0
lastUpdated: '2022-06-13'
rtos: ''
libraries:
- spiffs
topics:
- adafruit
- arduino
- esp32
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freebees-access-control-for-esp32
- rcs-avr-relay-control-system-with-sms
- blynkgsm-manager
- esp32-dynamic-iphone-keyless-system
- sms-server
- vortex-cannon-esp32-access-point-controller
---

## Overview

This project implements a remote gate opening system using an ESP32 microcontroller and a SIM800L GSM module. Developed as a practical implementation of communication protocols, it allows users to operate an electric gate via SMS commands. The system is built on a model scale but includes the logic necessary for real-world application, including user authorization, administrative controls, and safety checks.

## Key Features

The system provides several core functionalities managed through cellular communication:

- **Remote Control**: Open or close the gate by sending simple "Open" or "Close" text messages.
- **User Management**: An administrator (defined by a hardcoded phone number) can add or remove authorized phone numbers via SMS commands like "Add +number" or "Remove +number".
- **Security**: Only authorized numbers stored in the system's internal memory can trigger gate actions. Unauthorized attempts are logged and rejected.
- **State Persistence**: The system tracks whether the gate is open or closed. If the ESP32 restarts or loses power, it automatically checks its previous state and closes the gate if it was left open for security.

## Technical Implementation

The project is written in C++ using the Arduino framework for ESP32. It leverages several key components to ensure reliability and data persistence:

- **GSM Communication**: Uses the `Adafruit_FONA` library to interface with the SIM800L module over hardware serial. It handles SMS reception, parsing, and transmission.
- **Storage (SPIFFS)**: Authorized phone numbers are stored in a `user.txt` file within the ESP32's SPIFFS (Serial Peripheral Interface Flash File System). This allows the user list to survive power cycles.
- **Preferences**: The `Preferences` library is used to store the gate's current state (open/closed) in non-volatile memory, ensuring the system knows the gate position immediately upon boot.
- **Motor Control**: A stepper motor is controlled via STEP and DIR pins, simulating the mechanical movement of a sliding or swinging gate.

## SMS Command Structure

The system responds to specific text commands from authorized users:

- `Open`: Initiates the opening sequence if the gate is currently closed.
- `Close`: Initiates the closing sequence if the gate is currently open.
- `Users`: Returns a list of all authorized users via SMS.
- `Add +[number]`: (Admin only) Appends a new authorized user to the SPIFFS storage.
- `Remove +[number]`: (Admin only) Removes an existing user from the storage.

## Hardware Configuration

The project targets the ESP32 v1.3 and requires a SIM800L module for cellular connectivity. The motor driver is connected to pins 33 (STEP) and 32 (DIR), while the GSM module communicates via pins 26 (TX) and 27 (RX). A blue LED on pin 13 provides a heartbeat status indicator to show the system is running.
