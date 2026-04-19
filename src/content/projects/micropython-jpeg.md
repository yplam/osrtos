---
title: MicroPython JPEG
summary: A high-performance JPEG decoder and encoder module for MicroPython, specifically
  optimized for the Espressif ESP32 platform. It leverages the ESP-IDF component system
  to provide fast, memory-efficient image processing with support for block decoding,
  scaling, and rotation.
slug: micropython-jpeg
codeUrl: https://github.com/cnadler86/mp_jpeg
version: v0.4.0
lastUpdated: '2025-12-13'
licenses:
- MIT
rtos: freertos
libraries:
- micropython
topics:
- esp32
- jpeg
- jpeg-decoder
- jpeg-encoder
- jpg
- micropython
isShow: false
createdAt: '2026-04-19T23:04:34+00:00'
updatedAt: '2026-04-19T23:04:34+00:00'
---

Processing high-resolution images on microcontrollers has traditionally been a challenge due to limited RAM and processing power. MicroPython JPEG addresses this by providing a dedicated C-based module for MicroPython that focuses on speed and memory efficiency. Primarily targeting the ESP32 port, this module enables developers to handle JPEG decoding and encoding tasks with performance levels that rival native applications.

## High-Performance Decoding and Encoding

The project provides a robust API for both decoding and encoding. The decoder is particularly flexible, supporting various output pixel formats such as RGB565 (Big Endian and Little Endian), RGB888, and CbYCrY. Beyond simple decompression, the decoder includes built-in support for image rotation (90, 180, and 270 degrees), scaling, and clipping. These features allow developers to resize or crop images during the decoding process, which is critical for fitting images onto small displays without wasting memory on intermediate buffers.

For those working with extremely tight memory constraints, the module introduces a "block decoding" mode. In this mode, the decoder processes the image in small chunks (8 or 16 lines at a time). This approach significantly reduces the peak memory footprint and can lead to faster performance by utilizing different types of RAM more effectively.

On the encoding side, the module allows for converting raw image data into JPEG format. It supports multiple input formats including RGB888, RGB565, RGBA, and various YCbCr formats, with adjustable quality settings and rotation support.

## Benchmarks and Efficiency

Performance is a key highlight of this implementation. Benchmarks performed on an ESP32S3 demonstrate the efficiency of the underlying C implementation. For a 240x320 image, standard decoding reaches over 20 FPS, while block decoding can push performance up to 74 FPS depending on the image complexity and output format. Encoding is similarly performant, achieving approximately 17-21 FPS at standard quality levels.

## Technical Integration

MicroPython JPEG is designed as an external C module. It integrates directly into the MicroPython build system using CMake and depends on the `esp_new_jpeg` component from the Espressif component registry. This architecture allows it to tap into hardware-specific optimizations available in the ESP-IDF (versions 5.2 through 5.4 are supported).

### Usage Example

Integrating the decoder into a MicroPython script is straightforward. The following example demonstrates how to decode an image with a 180-degree rotation:

```python
import jpeg

# Create a JPEG decoder object
decoder = jpeg.Decoder(rotation=180, pixel_format="RGB888")

# Prepare the JPEG data for decoding
with open("image.jpg", "rb") as f:
    jpeg_data = f.read()

# Decode the JPEG image
decoded_image = decoder.decode(jpeg_data)
```

For encoding, the process is equally simple, requiring only the dimensions and the desired quality:

```python
import jpeg

# Create a JPEG encoder object
encoder = jpeg.Encoder(pixel_format="RGB888", quality=80, width=320, height=240)

# Encode raw image data
with open("raw_image.bin", "rb") as f:
    image_data = f.read()
    
encoded_jpeg = encoder.encode(image_data)
```

## Target Platforms

While the project is technically a MicroPython module, it is currently optimized for the Espressif ESP32 ecosystem. It has been tested thoroughly on the ESP32S3, making it an excellent choice for developers building cameras, image viewers, or web servers on Espressif hardware where MicroPython is the preferred environment.
