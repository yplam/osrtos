---
title: RFID Access Control (ESP32-S3)
summary: A standalone RFID access control system built for the ESP32-S3, utilizing
  a PN532 reader over hardware SPI and an I2C 16x2 LCD. It supports up to 70,000 user
  credentials stored in an on-flash LittleFS binary database with PSRAM caching, CRC32
  integrity verification, and serial administration via a Python CLI.
slug: rfid-access-control-esp32-s3
codeUrl: https://github.com/Hyacinthe-primus/RFID_Access_Control
version: v1.0.1
lastUpdated: '2026-07-30'
licenses:
- MIT
rtos: ''
libraries:
- littlefs
topics:
- arduino
- electronics
- embedded-systems
- esp32
- esp32-s3
- management
- python3
isShow: false
createdAt: '2026-10-13T10:51:19+00:00'
updatedAt: '2026-10-13T10:51:19+00:00'
---

## High-Capacity Standalone Access Control

Many micro-controller access control projects are limited to managing a handful of hardcoded RFID tags or relying on continuous cloud connectivity. The **RFID Access Control** project turns the ESP32-S3 into a high-capacity, standalone access controller capable of managing up to 70,000 user records locally without requiring an active network connection.

Built around the Espressif ESP32-S3 microcontroller, the system interfaces directly with an NXP PN532 NFC/RFID module over hardware SPI for fast card reads, accompanied by an industry-standard 16x2 character LCD via I2C for real-time status output.

## High-Performance Storage with LittleFS and PSRAM

To accommodate tens of thousands of users on an embedded device, the firmware implements a fixed-width binary record database stored in flash memory using LittleFS. To maintain instant response times during badge scans, the system takes advantage of the ESP32-S3's Octal SPI (OPI) PSRAM to buffer and look up database records in memory.

Data reliability and protection against flash corruption are central to the design:

- **CRC32 Checksums:** Applied per individual record as well as across the entire database to detect data tampering or corruption.
- **Task Watchdog:** Leverages the ESP-IDF task watchdog subsystem (`esp_task_wdt.h`) to ensure the main execution loops stay responsive and auto-recover from unexpected stalls.
- **Custom Partitioning:** Employs a dedicated partition layout across 16MB flash space to maximize LittleFS storage capacity alongside application firmware.

## Administration via Serial and Python CLI

While badge authentication runs entirely autonomously on the microcontroller, provisioning and maintenance are handled through a companion Python CLI over USB-serial. The CLI supports both an interactive shell and scripted single-shot execution for administrative workflows:

```bash
cd python_cli
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run interactive administration shell
python cli.py

# Or execute direct status and management commands
python cli.py status
```

Administrators can add, update, revoke, and query user credentials, inspect storage statistics, and perform batch import and export operations without taking the controller offline.

## Firmware Configuration and Deployment

The firmware is developed for the Arduino IDE (v2.x) targeting the **ESP32S3 Dev Module**. Proper operation requires specific board settings tailored to high-speed memory and storage:

- **Flash Size:** 16MB
- **Partition Scheme:** Custom (using `partitions.csv`)
- **PSRAM:** OPI PSRAM enabled
- **USB CDC On Boot:** Disabled

External dependencies include `Adafruit PN532`, `LiquidCrystal I2C`, and `ArduinoJson` (v7.x) to handle hardware communication and serialized commands.

## Verification and Testing

The repository includes an extensive test suite comprising 137 tests that execute without physical hardware connected. Running `pytest tests/ -v` validates binary serialization, database record packing, protocol exchanges, and CLI utility logic, ensuring reliability before flashing to production hardware.
