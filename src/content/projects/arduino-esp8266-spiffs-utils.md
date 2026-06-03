---
title: arduino-esp8266-spiffs-utils
summary: A collection of bash scripts designed to manage and back up the SPIFFS filesystem
  on ESP8266 devices over a network. The primary tool, nar.sh, allows users to create
  UStar-formatted tar archives of remote device files using a web server interface.
codeUrl: https://github.com/mhightower83/arduino-esp8266-spiffs-utils
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- spiffs
- backup
- esp8266-arduino
- flash
- filesystem
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- devfsuploadesp
- arduino-esp-utils
- espxwebflmgr
- esp-fs-webserver
- esp8266-arduino-serial-uploader
- esp32-ota-firmware-update-and-file-management
---

Managing files on an ESP8266 can often be a cumbersome process, especially when dealing with the SPIFFS (Serial Peripheral Interface Flash File System). The **arduino-esp8266-spiffs-utils** project provides a streamlined solution for developers needing to back up or archive data from their IoT devices without physical access or serial connections.

### Introducing NAR: The Network ARchiver

The centerpiece of this repository is `nar.sh`, a Network ARchiver specifically built for the Arduino ESP8266 ecosystem. This bash script automates the process of downloading files from an ESP8266 running a compatible web server and packaging them into a standard `.tar` archive. 

One of the clever aspects of `nar.sh` is how it handles the filesystem structure. By default, it adds a "data" prefix to the beginning of SPIFFS file names and ensures proper path formatting (inserting leading slashes where necessary). This makes the resulting archive easy to extract and use directly within an Arduino project's data folder for future uploads.

### Key Features and Capabilities

Despite being a lightweight bash script, `nar.sh` offers a robust set of features for managing remote files:

*   **Flexible Network Addressing**: Supports IP addresses, DNS names, and mDNS (e.g., `mydevice.local`). It also handles authenticated web servers using the `user:password@host` format.
*   **Regex Filtering**: Users can limit which files are downloaded using regular expressions, which is particularly useful for targeting specific directories or file types like `.gz` or `.jpg`.
*   **Archive Customization**: You can set custom prefixes, modify access mode bits (octal), and even set specific timestamps for all archived files.
*   **Compression Support**: The utility can automatically run `gzip` on the completed archive, either by detecting a `.tgz` extension or via an explicit `--gzip` flag.
*   **Dry Run Mode**: Using the `--list` or `--long` flags allows users to see exactly what would be archived before actually performing the download.

### Technical Requirements

To use these utilities, your ESP8266 must be running an Arduino sketch that includes a Web Server capable of serving the SPIFFS file list and content. On the client side, the script relies on standard Unix tools. It has been tested successfully on Ubuntu 18 and Windows 10 (via Git Bash).

Required dependencies include:
*   **curl**: For handling network requests.
*   **jq**: For parsing JSON data from the ESP8266.
*   **bash**: To execute the script.
*   **tar**: To generate the UStar format archives.

### Basic Usage Example

Creating a backup is straightforward. A typical command looks like this:

```bash
# Create a backup of all files from a local device
./nar.sh --file=my_backup.tar mydevice.local

# Create a compressed backup of specific images with authentication
./nar.sh -f=images.tgz admin:password@192.168.1.50 --filter="/*.jpg"
```

This project is an essential utility for developers who need a reliable way to perform remote maintenance and data recovery on ESP8266-based hardware.
