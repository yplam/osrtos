---
title: AES67/RAVENNA for ESP32-P4
summary: A high-performance ESP-IDF component implementing AES67 and RAVENNA audio-over-IP
  standards on the ESP32-P4 microcontroller. It features hardware-accelerated PTP
  synchronization, sub-millisecond latency, and ISR-driven DMA playback to ensure
  glitch-free audio streaming over Ethernet.
slug: aes67-ravenna-for-esp32-p4
codeUrl: https://github.com/DatanoiseTV/aes67-esp32p4
version: v2.6.0
lastUpdated: '2026-06-13'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
topics:
- aes67
- asp32
- esp-idf
- esp32-p4
- network-audio
- ravenna
- streaming
isShow: false
createdAt: '2026-07-20T10:47:36+00:00'
updatedAt: '2026-07-20T10:47:36+00:00'
---

The transition of professional audio to IP-based networks has traditionally required significant processing power, often necessitating dedicated Linux-based hardware or expensive FPGAs. The AES67/RAVENNA implementation for the ESP32-P4 changes this landscape by providing a robust, low-latency audio-over-IP stack for a dual-core RISC-V microcontroller. By leveraging the specific hardware capabilities of the ESP32-P4, this project achieves performance levels previously reserved for much more complex systems.

### High-Performance Audio Networking

At the heart of this project is a focus on extreme low latency and reliability. In professional audio, timing is everything. This component achieves an end-to-end latency as low as 0.7ms when using a 0.125ms packet time (ptime). It maintains 100% DMA utilization and zero underruns even at high packet rates of up to 8000 packets per second. 

One of the most critical design choices is the use of an Ethernet Layer 2 (L2) hook. By intercepting RTP packets directly at the MAC layer, the system bypasses the standard lwIP TCP/IP stack overhead entirely. This optimization is crucial for meeting the tight timing requirements of AES67 without the jitter typically introduced by software-heavy networking stacks.

### Precision Timing and Synchronization

AES67 relies on the Precision Time Protocol (PTP/IEEE 1588v2) for clock synchronization. This implementation utilizes the ESP32-P4's EMAC hardware timestamping to ensure sample-accurate alignment across the network. The system can operate in both Slave mode, synchronizing to an external grandmaster, or Grandmaster mode, where it takes over clock leadership if no other master is present. A PI controller with adaptive gain ensures fast locking and stable tracking of the network clock.

### Advanced Audio Engine

The audio engine is designed for professional-grade fidelity and flexibility. It supports a wide range of codecs, including L16, L24, L32, and AM824, with support for up to 8 channels per stream. The playback mechanism is entirely ISR-driven, eliminating task scheduling overhead and jitter. 

To handle network instability, the engine includes sophisticated features like sample-hold on underruns, which produces a smooth decay instead of the audible silence clicks common in lesser implementations. It also utilizes the ESP32-P4's APLL (Audio PLL) to generate exact clock frequencies, such as 18.432MHz for 48kHz audio, ensuring high-quality I2S output.

### Integration and Usage

Integrating the AES67 component into an ESP-IDF project is straightforward. The API allows for quick node initialization and session management. Developers can define sources (TX) and sinks (RX) using standard SDP (Session Description Protocol) and SAP (Session Announcement Protocol) for discovery.

```c
#include "aes67.h"
#include "aes67_session.h"

/* Configure and start the AES67 node */
aes67_config_t cfg = AES67_CONFIG_DEFAULT();
cfg.net.eth_handle = my_eth_handle;

aes67_node_handle_t node;
aes67_node_init(&cfg, &node);
aes67_node_start(node);

/* Add a 2-channel L24 source */
aes67_session_handle_t session;
aes67_node_get_session(node, &session);

uint8_t id;
aes67_session_add_source(session, "My Source", 2, AES67_CODEC_L24, &id);
```

For custom processing, the component supports multiple output routing modes. While it defaults to direct I2S output for DACs, it can also provide a user callback with int32 sample buffers or feed a FreeRTOS StreamBuffer for application-level processing.

### Hardware Considerations

The project is optimized for the ESP32-P4-NANO board, utilizing its RMII Ethernet interface and onboard audio codecs like the ES8311. It makes extensive use of the ESP32-P4's internal memory architecture, pinning all high-priority tasks to a single core to maintain cache coherency and utilizing IRAM for hot-path conversion functions to maximize execution speed.
