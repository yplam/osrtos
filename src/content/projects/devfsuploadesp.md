---
title: DevFsUploadESP
summary: A suite of Arduino libraries for ESP32 and ESP8266 that provides a browser-based
  UI for managing SPIFFS and LittleFS filesystems. It enables developers to list,
  upload, download, and delete files and directories directly through a web interface.
codeUrl: https://github.com/DaveBrad/DevFsUploadESP
isShow: false
rtos: ''
libraries:
- spiffs
- littlefs
topics:
- aid
- arduino
- browser
- directories
- directory
- esp32
- esp32webserver
- esp8266
- esp8266webserver
- file
- files
- littlefs
- spiffs
- tool
- upload
star: 4
lastUpdated: '2020-05-19'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- espxwebflmgr
- esp-fs-webserver
- esp32-ota-firmware-update-and-file-management
- multiftpserver-library
- esp32-asyncwebserver-file-upload-example
- simpleftpserver-library
---

Managing internal storage on ESP32 and ESP8266 devices can often be a bottleneck during development. Traditionally, updating a configuration file or a web asset required re-flashing the entire filesystem image or using specific IDE plugins. **DevFsUploadESP** simplifies this workflow by providing a browser-based user interface that runs directly on the ESP device, allowing for real-time file and directory management.

### A Modular Library Suite
The project is organized into three distinct libraries found within the `lib` folder, allowing developers to include only the components necessary for their specific implementation:
- **DevFsUploadCommon**: The core logic shared across different filesystem types.
- **DevFsUploadSPIFFS**: Specific implementation for the Serial Peripheral Interface Flash File System (SPIFFS).
- **DevFsUploadLittleFS**: Implementation for LittleFS, the modern, power-fail-safe successor to SPIFFS.

### Comprehensive Filesystem Control
DevFsUploadESP turns your ESP32 or ESP8266 into a mini file server with a surprisingly capable UI. Key features include:
- **File Management**: You can list all files currently stored on the flash, view their contents in the browser, download them to your local machine, or delete them to free up space.
- **Directory Operations**: The library supports hierarchical storage, allowing users to list directories, create new sub-directories, and remove empty ones.
- **Flexible Uploads**: A dedicated upload interface allows you to browse local files on your PC and send them to the ESP. You can manually specify a target directory or select one from the existing structure.

### Integration and Usage
To get started, developers need to install the libraries from the repository into their Arduino environment. Because the project is split into Common, SPIFFS, and LittleFS modules, you can maintain a lightweight firmware footprint by only compiling the code relevant to your chosen filesystem. 

The UI is accessible via a web browser once the ESP is connected to your network. The interface provides clear visual feedback for file lists and directory structures, making it an excellent development aid for projects that involve web servers, data logging, or dynamic configuration.

### Technical Considerations
While DevFsUploadESP is a robust tool for development, it is important to note that it currently does not include automatic checking for free space on the ESP flash during uploads. Developers should be mindful of their device's storage limits when transferring large files. 

By bridging the gap between the local development environment and the embedded filesystem, DevFsUploadESP significantly reduces the friction of iterating on data-heavy ESP32 and ESP8266 applications.
