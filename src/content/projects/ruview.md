---
title: RuView
summary: RuView is an open-source WiFi sensing platform that leverages Channel State
  Information (CSI) from ESP32-S3 sensors to perform human pose estimation, vital
  sign monitoring, and environment mapping. It utilizes a high-performance Rust-based
  processing pipeline and FreeRTOS-powered firmware to enable camera-free, privacy-preserving
  spatial intelligence at the edge.
slug: ruview
codeUrl: https://github.com/ruvnet/RuView
siteUrl: https://Cognitum.One
version: v0.6.2-esp32
lastUpdated: '2026-04-20'
licenses:
- MIT
image: /202604/RuView_0.avif
rtos: freertos
libraries:
- lwip
topics:
- agentic-ai
- densepose
- esp32
- firmware
- mcu
- mincut
- monitoring
- pose-estimation
- rf
- self
- self-learning
- wifi
- wifi-hacking
- wifi-security
isShow: true
createdAt: '2026-04-23T00:48:54+00:00'
updatedAt: '2026-04-23T00:48:54+00:00'
---

RuView represents a significant leap in environmental sensing by repurposing standard WiFi signals into a sophisticated spatial intelligence system. Instead of relying on cameras or wearable devices, RuView analyzes Channel State Information (CSI)—the data that describes how WiFi signals propagate through and interact with an environment—to detect people, track movement, and even monitor biological functions like breathing and heart rate.

### Sensing Without Sight

The core of the project lies in its ability to "see" through obstacles. Because radio waves pass through walls, furniture, and debris, RuView can maintain awareness in scenarios where traditional optical sensors fail. It uses a multistatic mesh of low-cost ESP32-S3 nodes to capture these signals. By analyzing the scattering patterns caused by human bodies, the system can reconstruct a 17-point COCO keypoint skeleton, providing high-fidelity pose estimation without the privacy concerns associated with video surveillance.

### Technical Architecture and Edge Intelligence

RuView is built on a high-performance stack that bridges embedded firmware with advanced signal processing. The ESP32-S3 sensor nodes run firmware based on the Espressif IoT Development Framework (ESP-IDF) and FreeRTOS, optimized for high-throughput CSI streaming and local signal cleanup. The use of the lwIP stack ensures efficient network communication between the sensing nodes and the orchestration backend.

The processing pipeline is primarily written in Rust, offering the performance necessary to handle 54,000 frames per second. This pipeline transforms raw radio data into structured body representations through a multi-stage process involving Hampel filters, SpotFi algorithms, and Fresnel zone geometry. For intelligence, the system leverages Spiking Neural Networks (SNN) and contrastive learning, allowing it to adapt to new rooms in under 30 seconds without requiring pre-labeled datasets.

### Key Capabilities

*   **Vital Signs Monitoring**: Contactless detection of breathing (6-30 BPM) and heart rate (40-120 BPM) using phase analysis of the WiFi signal.
*   **Through-Wall Detection**: Tracking motion and presence through up to 5 meters of solid material using multipath modeling.
*   **Multi-Person Tracking**: Using Stoer-Wagner min-cut algorithms to separate subcarrier clusters and identify multiple individuals simultaneously.
*   **Edge Deployment**: The system can run entirely on local hardware, such as an ESP32 mesh paired with a Cognitum Seed for persistent storage, kNN search, and cryptographic attestation.

### Getting Started with WiFi Sensing

The project offers several ways to engage with the technology, from simulated Docker environments to live hardware deployments. For those with hardware, provisioning an ESP32-S3 node involves flashing the firmware and configuring the WiFi credentials to start streaming CSI data to a central processor.

```bash
# Flash firmware and provision a node
python -m esptool --chip esp32s3 --port COM9 --baud 460800 \
  write_flash 0x0 bootloader.bin 0x8000 partition-table.bin \
  0xf000 ota_data_initial.bin 0x20000 esp32-csi-node.bin

python firmware/esp32-csi-node/provision.py --port COM9 \
  --ssid "YourWiFi" --password "secret" --target-ip 192.168.1.20
```

Once the nodes are active, users can run various sensing applications, such as the RF room scanner or the SNN processor, to begin mapping their environment in real-time.

### A Privacy-First Future

By design, RuView is a privacy-preserving technology. It complies with strict data regulations like GDPR and HIPAA because it never captures images or video. This makes it an ideal solution for healthcare, elderly care, and secure facilities where monitoring is required but visual privacy is paramount. Whether it is detecting a fall in an assisted living facility or locating survivors in a disaster zone, RuView demonstrates the power of using the radio signals already surrounding us to understand and protect the world.
