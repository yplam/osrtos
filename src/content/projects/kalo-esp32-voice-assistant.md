---
title: KALO ESP32 Voice Assistant
summary: An ESP32-based voice assistant that integrates I2S audio recording, Deepgram
  speech-to-text, and multiple text-to-speech engines like OpenAI and Google TTS.
  It utilizes the latest ESP-IDF I2S drivers to handle digital microphones and amplifiers
  while managing audio storage on a microSD card.
slug: kalo-esp32-voice-assistant
codeUrl: https://github.com/kaloprojects/KALO-ESP32-Voice-Assistant
lastUpdated: '2025-09-10'
image: /202603/KALO-ESP32-Voice-Assistant_0.avif
rtos: freertos
topics:
- audio
- deepgram
- deepgram-stt
- esp32
- google-tts
- i2s
- i2s-audio
- i2s-microphone
- inmp441
- is2-audio
- max98357
- openai-tts
- recording
- sd-card
- speechgen
- speechgen-io
- speechtotext
- stt
- texttospeech
- tts
isShow: true
createdAt: '2026-03-31T23:33:03+00:00'
updatedAt: '2026-03-31T23:33:03+00:00'
---

Building a functional voice assistant on a microcontroller requires a delicate balance of peripheral management, network stability, and integration with cloud-based AI services. The KALO ESP32 Voice Assistant provides a comprehensive framework for achieving this on the ESP32 platform, moving beyond simple 'offline' commands to a fully connected system capable of complex speech processing.

### System Architecture and Audio Handling

The project is designed around the ESP32-WROOM-32 and leverages the updated I2S drivers found in the Arduino ESP32 core 3.1.x (based on ESP-IDF 5.3.x). By utilizing I2S (Inter-IC Sound), the system maintains high digital audio quality for both input and output. For recording, it typically interfaces with a digital microphone like the INMP441. The software manages the raw I2S stream, applies a configurable gain booster, and wraps the data in a standard 44-byte WAV header before saving it to a microSD card. This allows for variable recording lengths, triggered by physical user input such as a button press.

On the output side, the project uses an I2S audio amplifier, such as the MAX98357A, to drive a speaker. Audio playback is handled by the `ESP32-audioI2S` library, which supports a variety of formats and streaming sources, including local files and internet radio streams.

### Speech-to-Text and Transcription

Once a voice command is captured and stored on the SD card, the system initiates a Speech-to-Text (STT) request. It utilizes the Deepgram API, known for its low latency and high accuracy. The ESP32 streams the recorded WAV file via an HTTPS POST request using `WiFiClientSecure`. The project is optimized for performance, with the author noting that a five-second voice recording can be transcribed in approximately 2.5 seconds. The resulting JSON response is parsed to extract the text, which can then be used to trigger local GPIO actions—such as turning on LEDs—or passed to a secondary AI service for a response.

### Multi-Engine Text-to-Speech

One of the standout features of this project is its flexibility regarding Text-to-Speech (TTS). It supports multiple providers to suit different needs:

*   **Google TTS:** A free option that requires no registration, ideal for short, simple sentences.
*   **OpenAI TTS:** Provides high-quality, multilingual voices that sound significantly more natural and support longer text strings.
*   **SpeechGen.IO:** A newer addition to the project that offers a vast library of hundreds of different voices for specialized applications.

When a response is generated, the system retrieves the audio (often as an MP3 URL or stream) and plays it back through the I2S hardware, completing the voice interaction loop.

### Software Implementation and Modern Drivers

The project is structured as a main sketch split into modular components (`lib_audio_recording.ino`, `lib_audio_transcription.ino`, etc.), making it easier to maintain or port specific features to other projects. A key technical requirement is the use of the latest ESP32 framework versions. Older versions of the ESP32 core lack the specific I2S standard drivers required by the current implementation. By targeting the 3.1.x core, the project ensures better compatibility with modern encryption ciphers for secure HTTPS connections and more robust I2S bus management.

For developers looking to extend the project, the modular nature of the code allows for easy swapping of APIs. While the current version focuses on a 'parroting' or action-triggering workflow, it serves as the foundational architecture for more advanced implementations, such as integrating with ChatGPT for a fully conversational AI assistant.
