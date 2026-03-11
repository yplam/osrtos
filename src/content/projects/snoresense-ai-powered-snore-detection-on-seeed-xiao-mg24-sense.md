---
title: 'SnoreSense: AI-Powered Snore Detection on Seeed XIAO MG24 Sense'
summary: SnoreSense is a TinyML application designed for the Seeed XIAO MG24 Sense
  to detect snoring in real-time. It utilizes TensorFlow Lite Micro for on-device
  inference, processing audio from the onboard PDM microphone to provide a privacy-focused,
  low-power sleep monitoring solution.
codeUrl: https://github.com/rjrishabh/Snore-detection-MG24
isShow: true
image: /202512/SnoreSense.webp
rtos: ''
libraries:
- tensorflow-micro
topics:
- silicon-labs
- xiao-showdown
star: 2
lastUpdated: '2025-10-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
---

SnoreSense is an innovative TinyML project designed to tackle a common health and lifestyle issue: snoring. While often dismissed as a mere nuisance, snoring can be a symptom of more serious conditions like sleep apnea. Traditional monitoring solutions often rely on cloud-based processing, which raises privacy concerns, or expensive specialized hardware. SnoreSense addresses these challenges by performing real-time snore detection entirely on the edge using the Seeed XIAO MG24 Sense.

### The Hardware: Seeed XIAO MG24 Sense
The project is built around the Seeed XIAO MG24 Sense, a compact development board powered by the Silicon Labs EFR32MG24 SoC. This board is particularly well-suited for audio-based TinyML applications because it features an onboard PDM microphone and sufficient processing power to run TensorFlow Lite Micro models locally. By leveraging this hardware, SnoreSense can operate in a low-power state, making it ideal for overnight monitoring on battery power.

### Intelligent Audio Processing
Detecting a snore isn't just about measuring volume; it requires distinguishing specific acoustic patterns from background noise. The SnoreSense implementation includes several sophisticated features to improve accuracy and reduce false positives:

*   **Adaptive Silence Threshold:** The system tracks baseline ambient noise to adjust its sensitivity dynamically.
*   **RMS-based Detection:** Instead of relying on raw peak values, it uses Root Mean Square (RMS) calculations to evaluate the energy of the audio signal.
*   **Confidence Margin Filtering:** The TFLite model output is filtered to ensure that a 'snore' classification is significantly more probable than 'no snore' before triggering an event.
*   **Time-based Smoothing:** To avoid flickering detections, the system implements smoothing logic and a minimum interval between detections.

### Technical Implementation
The project utilizes the Silicon Labs TensorFlow Lite Micro integration. The core logic is contained within an Arduino sketch (`snore_spp.ino`), which manages the microphone buffer and the inference engine. Below is a snippet of how the system initializes the TFLite environment and the microphone:

```c
// Initialize TFLite Micro model
sl_tflite_micro_init();
model_input = sl_tflite_micro_get_input_tensor();
interpreter = sl_tflite_micro_get_interpreter();
model_output = sl_tflite_micro_get_output_tensor();

// Initialize microphone
micAnalog.begin(mic_buffer, NUM_SAMPLES);
micAnalog.startSampling(mic_samples_ready_cb);
```

The audio data is captured in frames that match the model's input requirements (637 samples). Once the `data_ready_flag` is set by the DMA callback, the main loop processes the buffer, feeds it into the TFLite interpreter, and evaluates the results against the `SNORE_THRESHOLD` and `SNORE_MARGIN` constants.

### Privacy and Future Potential
Because SnoreSense runs completely offline, no audio data ever leaves the device. This "privacy-by-design" approach is crucial for a device intended to be used in a bedroom environment. Looking forward, the project is designed to be extensible. While the current version focuses on local detection (lighting an LED or logging to memory), future updates aim to integrate Bluetooth Low Energy (BLE) to sync detection statistics with a smartphone app for long-term sleep quality tracking.
