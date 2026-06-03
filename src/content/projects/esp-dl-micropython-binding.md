---
title: ESP-DL MicroPython Binding
summary: A MicroPython binding for the ESP-DL deep learning library, enabling computer
  vision tasks on ESP32 devices. It supports face detection, recognition, human and
  cat detection, and image classification using ESP-IDF 5.4.2 and MicroPython 1.26.0
  or later.
slug: esp-dl-micropython-binding
codeUrl: https://github.com/cnadler86/mp_esp_dl_models
star: 10
lastUpdated: '2025-09-02'
rtos: freertos
libraries:
- micropython
topics:
- ai
- esp32
- face-detection
- face-recognition
- imagenet-classifier
- micropython
- pedestrian-detection
isShow: false
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- sparkfun-micropython-opencv
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
- ncnn-mp-neural-network-inference-for-micropython
- micropython-camera-api-for-esp32
- micropython-camera-driver-for-esp32
- maixface
---

## Bringing Deep Learning to MicroPython on ESP32

The ESP-DL MicroPython Binding project bridges the gap between high-performance deep learning and the ease of use provided by MicroPython. By wrapping Espressif's ESP-DL (Deep Learning) library, this project enables developers to implement sophisticated computer vision tasks—such as face recognition, human detection, and image classification—directly within a MicroPython environment on ESP32 hardware.

This binding is particularly powerful for IoT developers who want to add "intelligence" to their edge devices without diving deep into C++ or low-level ESP-IDF development. It leverages the hardware acceleration features of the ESP32-S3 and other compatible chips to provide real-time or near-real-time inference for various neural network models.

## Comprehensive Model Support

The repository provides a suite of pre-configured models ready for deployment:

- **FaceDetector**: Detects faces in images, providing bounding boxes and facial feature points (eyes, nose, mouth).
- **FaceRecognizer**: Manages a local face database, allowing for the enrollment and recognition of specific individuals.
- **Human & Cat Detectors**: Specialized models for detecting people or felines in a frame.
- **ImageNet & COCODetector**: General-purpose object classification and detection using standard datasets.

## Technical Architecture and Requirements

The project is built on top of **ESP-IDF v5.4.2** and requires **MicroPython 1.26.0** or higher. It integrates closely with other MicroPython components like the `micropython-camera-API` for image acquisition and `mp_jpeg` for efficient JPEG decoding. 

One of the critical aspects of using deep learning on embedded systems is data formatting. This binding supports several pixel formats, including `RGB888`, `RGB565`, and `GRAYSCALE`. The `mp_jpeg` library is often used as a companion to decode camera streams into the `RGB888` format required by the ESP-DL inference engines.

## Practical Implementation

Using the library is designed to be idiomatic for MicroPython users. After initializing the camera and a decoder, running a model like the `FaceDetector` is a matter of a few lines of code:

```python
from espdl import FaceDetector
import camera
from jpeg import Decoder

# Initialize hardware and decoder
cam = camera.Camera()
decoder = Decoder(pixel_format="RGB888")
face_detector = FaceDetector()

# Capture and process
img = cam.capture()
framebuffer = decoder.decode(img)
results = face_detector.run(framebuffer)

for face in results:
    print(f"Face detected with confidence: {face['score']}")
    print(f"Bounding box: {face['box']}")
```

For more advanced use cases, the `FaceRecognizer` module includes a persistent database system. You can enroll a face with a name, and the system will save the feature embeddings to a file (e.g., `face.db`), allowing the device to recognize the same person after a reboot.

## Performance and Benchmarks

Performance is a key consideration for embedded AI. On an ESP32-S3, the `FaceDetector` can achieve frame rates ranging from approximately 3.6 FPS at HD resolution to over 20 FPS at lower resolutions like 128x128. The `HumanDetector` is more computationally intensive, generally hovering around 6.6 FPS at lower resolutions. These benchmarks demonstrate that the ESP32-S3 is a capable platform for responsive, localized computer vision tasks without requiring cloud connectivity.

## Building and Customization

The project supports a flexible build system. Users can enable or disable specific models during the build process using CMake flags (e.g., `MP_DL_FACE_DETECTOR_ENABLED`) to save flash and RAM. This is crucial for projects where memory is at a premium. The repository provides detailed instructions for building from source using the standard `idf.py` toolchain, as well as precompiled images via GitHub Actions for those who want to get started quickly.
