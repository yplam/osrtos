---
title: ESP32 AsyncWebServer File Upload Example
summary: A practical demonstration of handling file uploads and management on the
  ESP32 using the ESPAsyncWebServer library and SPIFFS. It features examples ranging
  from simple single-page uploads to advanced implementations with authentication
  and real-time progress bars.
codeUrl: https://github.com/smford/esp32-asyncwebserver-fileupload-example
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- asyncwebserver
- esp32
- file
- listing
- server
- spiffs
- upload
- web
star: 100
lastUpdated: '2021-10-12'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-async-web-server-with-spiffs-and-ota
- esp32-web-server-using-spiffs
- esp32-ota-firmware-update-and-file-management
- esp32-spiffs-with-directory-support-example
- devfsuploadesp
- esp32-monaco-editor-spiffs
---

Managing files on an embedded device like the ESP32 can often be a complex task, especially when trying to provide a user-friendly interface for uploading data. The **esp32-asyncwebserver-fileupload-example** repository by smford provides a clear, step-by-step guide to implementing these features using the powerful `ESPAsyncWebServer` library and the SPIFFS (SPI Flash File System).

### The Challenge of File Uploads
While many ESP32 tutorials cover basic web servers, handling multi-part form data for file uploads is significantly more involved. This project addresses the common confusion surrounding asynchronous file handling, providing two distinct examples that cater to different levels of complexity and user experience requirements.

### Example 1: Simple File Management
The first example is designed for simplicity. It provides a single-page interface that allows users to:
- View a list of files currently stored on the SPIFFS.
- See storage statistics (Free, Used, and Total storage).
- Upload new files via a standard HTML form.

While functional, this version is basic; it lacks a progress indicator, meaning the user must wait for the page to refresh to confirm a successful upload. It serves as an excellent starting point for developers who want to understand the underlying mechanics of `server->onFileUpload` without the complexity of modern JavaScript frameworks.

### Example 2: Advanced Features and Progress Bars
For developers looking for a production-ready solution, the second example significantly improves the user experience. It moves beyond basic functionality to include:
- **Web Authentication**: Secures the interface with a username and password.
- **AJAX-based Progress Bar**: Uses JavaScript to provide real-time feedback during the upload process, solving the 'blind upload' issue found in simpler implementations.
- **File Management**: Adds the ability to download or delete specific files directly from the web interface.
- **System Control**: Includes a remote reboot button to restart the ESP32 via the web UI.

### Technical Implementation
The project relies on the `ESPAsyncWebServer` and `AsyncTCP` libraries, which allow the ESP32 to handle multiple connections without blocking the main loop. The file system is managed via `SPIFFS.h`. Below is a snippet showing how the project handles the file upload stream asynchronously:

```cpp
// Example of handling the upload process
void handleUpload(AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final) {
  if (!index) {
    Serial.printf("UploadStart: %s
", filename.c_str());
    // Open file for writing in SPIFFS
    request->_tempFile = SPIFFS.open("/" + filename, "w");
  }
  if (len) {
    // Write data chunks as they arrive
    request->_tempFile.write(data, len);
  }
  if (final) {
    Serial.printf("UploadEnd: %s, %u B
", filename.c_str(), index + len);
    request->_tempFile.close();
    request->redirect("/");
  }
}
```

### Getting Started
To use these examples, you will need an ESP32 development board and the Arduino IDE (or PlatformIO) configured with the following dependencies:
1. `ESPAsyncWebServer` library
2. `AsyncTCP` library
3. The standard `SPIFFS` library included with the ESP32 core.

After cloning the repository, you can open either `example-01.ino` or `example-02.ino`, update the WiFi credentials (`ssid` and `password`), and flash the code to your device. The project is particularly useful for IoT applications that require data logging, configuration file updates, or hosting custom web assets directly on the microcontroller.
