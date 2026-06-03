---
title: ESP32 Offline OSM Maps
summary: This project provides a workflow and demo for displaying offline OpenStreetMap
  (OSM) data on ESP32 microcontrollers using the LVGL graphics library. It includes
  a Python-based map converter to transform raster tiles into LVGL-compatible image
  formats, specifically targeting hardware like the TTGO-Camera Plus.
codeUrl: https://github.com/mryndzionek/esp32_offline_osm
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- esp32
- esp32-idf
- lvgl
- offline-maps
- openstreetmap
- osm
- raster-map
star: 45
lastUpdated: '2023-11-24'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- map-tiles-projects-for-esp32
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- esp32-lvgl-8-x-sdspi-template
- lvgl-demo-embarcadores
- lilygo-t-display-s3-boilerplate
- lvgl-port-for-esp32
---

Displaying rich, interactive maps on resource-constrained microcontrollers has traditionally been a significant challenge. The **esp32_offline_osm** project by mryndzionek addresses this by providing a streamlined pipeline for bringing OpenStreetMap (OSM) data to the ESP32 platform using the Light and Versatile Graphics Library (LVGL).

### How it Works: From QGIS to ESP32

The core of the project is a bridge between standard GIS tools and embedded graphics. The workflow begins with **QGIS**, a professional-grade Open Source Geographic Information System, which is used to download raster map tiles. Once these tiles are obtained, the project provides a utility called `map_converter.py`. 

This Python script converts standard raster map tiles into LVGL image files. By converting tiles into a format that LVGL can natively understand (and potentially store on an SD card or flash memory), the ESP32 can render map segments without requiring an active internet connection. This is particularly useful for outdoor navigation devices, remote data loggers, or any portable device operating in areas with poor connectivity.

### Technical Implementation

The project includes two demo applications specifically tailored for the **TTGO-Camera Plus** hardware. These demos showcase how to integrate the converted map images into an LVGL-based user interface. 

The software stack relies on the **ESP-IDF** (Espressif IoT Development Framework), which utilizes FreeRTOS for task management. The graphics rendering is handled by **LVGL**, supported by the `lvgl_esp32_drivers` component to interface with the specific display hardware of the TTGO board.

### Getting Started with Map Conversion

To use your own maps, you first need to prepare the data using the provided Python tools. The `map_converter` directory contains the necessary logic to process tiles. While the repository focuses on the ESP32 implementation, the conversion logic is a vital piece of the puzzle:

```python
# Example of the map converter logic (simplified)
# The script processes raster tiles and outputs LVGL-compatible C arrays or binary files
# map_converter.py is used to bridge the gap between QGIS and the embedded display
```

### Hardware and Demos

The repository contains two main demo folders:
- **ttgo_tcamplus_map_demo**: A basic implementation showing map rendering.
- **ttgo_tcamplus_map_demo2**: An evolved version of the demo, likely featuring improved UI or performance.

Both demos are structured as standard ESP-IDF projects. They include `sdkconfig` files pre-configured for the ESP32 and `CMakeLists.txt` files for the modern ESP-IDF build system. The project also makes use of git submodules to manage dependencies like LVGL and its associated drivers, ensuring that the environment is reproducible.

### Why This Matters

For developers building wearable GPS devices or localized tracking systems, this project provides a clear path to implementing offline maps without the overhead of a full operating system like Linux. By leveraging the power of LVGL and the efficiency of the ESP32, it demonstrates that sophisticated geographic visualization is possible even on low-cost, low-power hardware.
