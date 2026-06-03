---
title: ESP32 Spartan Edge SPIFFS Loader
summary: A utility for the Spartan Edge Accelerator Board that enables loading FPGA
  bitstreams directly from the ESP32's internal SPIFFS flash memory. By utilizing
  the onboard 4MB flash chip, it allows the Spartan-7 FPGA to be configured without
  the need for an external microSD card.
codeUrl: https://github.com/Cellgalvano/ESP32_SEA_SPIFFS_Loader
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- arduino-ide
- esp32
- flash-memory
- fpga
- sea-s7
- seeedstudio
- spartan-7
- spartan-edge-accelerator
- spi-flash
- spiffs
- spiffs-bitstreamloader
star: 12
lastUpdated: '2020-05-22'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-fatfs-image-tool-and-example
- esp8266sdupdater
- avr-spiffs
- spiffs-for-esp8266-non-os-sdk
- easyini
- fileferry-click2flash
---

The Spartan Edge Accelerator Board is a powerful development platform that pairs an ESP32 with a Xilinx Spartan-7 FPGA. Traditionally, the ESP32 acts as a bridge, loading the FPGA bitstream from a microSD card into the Spartan-7 via Slave Serial Configuration Mode. While effective, this requirement for external storage can be a bottleneck for projects where the FPGA logic is static or where physical space and reliability are concerns. 

### Moving Beyond the SD Card

The **ESP32_SEA_SPIFFS_Loader** project offers a streamlined alternative. Instead of reaching for an SD card, this sketch utilizes the ESP32's onboard W25Q32JV 4MB SPI flash chip. By leveraging the SPIFFS (Serial Peripheral Interface Flash File System), developers can store the FPGA bitstream (`default.bit`) directly alongside the ESP32 application code. This makes the board more self-contained and robust for deployed applications.

### How It Works

The loader operates by initializing the SPIFFS partition and locating the bitstream file. It then manages the FPGA's configuration pins—specifically `XFPGA_PROGRAM_PIN`, `XFPGA_INTB_PIN`, and `XFPGA_DONE_PIN`—to reset the FPGA's configuration logic. Once the FPGA is ready, the ESP32 streams the bitstream data using the `shiftOut` function over the `XFPGA_DIN_PIN` and `XFPGA_CCLK_PIN` lines.

One interesting technical detail is that the loader does not need to manually parse or skip the bitstream header. The Xilinx configuration logic is designed to ignore incoming data until it detects a specific sync word (`0xAA995566`), at which point it begins processing the configuration frames.

### Technical Implementation

The core of the loading logic is handled in the `loadBitstream()` function:

```c
void loadBitstream(){
  Serial.println("Opening bitstream file: default.bit");
  
  File file = SPIFFS.open("/default.bit");
  if(!file || file.isDirectory()){
      Serial.println("Could not open default.bit!");
      while(true){}
  }

  Serial.print("Loading FPGA ... ");
  pinMode(XFPGA_DIN_PIN, OUTPUT);

  while(file.available()){
     int cnt = file.readBytes(buf, sizeof(buf));
     for(int i=0; i<cnt; i++){ 
      shiftOut(XFPGA_DIN_PIN, XFPGA_CCLK_PIN, MSBFIRST, buf[i]);
     }
  }
  
  Serial.println("DONE!");
  digitalWrite(XFPGA_CCLK_PIN, LOW); 
  file.close();
}
```

### Getting Started

To use this loader, you will need the Arduino IDE configured with the ESP32 Arduino Core and the ESP32 SPIFFS Upload Plugin. The workflow is straightforward:

1.  **Hardware Setup**: Set the "K5" switch on your Spartan Edge Board to the "Slave" position.
2.  **File Preparation**: Create a `data` folder within your Arduino sketch folder and place your Spartan-7 bitstream inside, named `default.bit`.
3.  **Deployment**: Upload the sketch to the ESP32 (selecting the "DOIT ESP32 DEVKIT" board) and then use the SPIFFS Upload Plugin to write the filesystem containing your bitstream to the flash memory.

This approach is particularly useful for developers who want to create "instant-on" FPGA projects or those looking to reduce the bill of materials by omitting the microSD card in final hardware implementations.
