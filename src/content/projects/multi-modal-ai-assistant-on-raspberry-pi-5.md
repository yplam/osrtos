---
title: Multi-Modal AI Assistant on Raspberry Pi 5
summary: A fully offline, edge AI assistant for the Raspberry Pi 5 integrating local
  LLM (Gemma 3), YOLOv8 object detection, and RAG-based memory. It features a hardware
  interface with an OLED display, physical buttons for control, and voice interaction
  via Vosk STT and espeak TTS.
slug: multi-modal-ai-assistant-on-raspberry-pi-5
codeUrl: https://github.com/Chappie02/Multi-Modal-AI-Assistant-on-Raspberry-Pi-5
star: 17
lastUpdated: '2026-03-01'
rtos: ''
isShow: true
image: /202603/raspberry-pi-5-ai-assistant.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

The Multi-Modal AI Assistant is a sophisticated edge computing project that transforms the Raspberry Pi 5 into a fully autonomous, offline intelligent agent. By integrating local Large Language Models (LLMs), computer vision, and voice processing, the system provides a private and responsive AI experience without relying on external cloud APIs or internet connectivity.

The system is built around a hardware-centric design, utilizing the Raspberry Pi 5's increased processing power to handle demanding AI workloads. Interaction is handled through a physical interface consisting of an SSD1306 OLED display and three GPIO-connected push buttons, allowing for a tactile user experience that bypasses the need for a traditional terminal or keyboard.

## Multi-Threaded Architecture

To maintain responsiveness, the assistant employs a multi-threaded architecture. A dedicated button listener thread polls GPIO pins at 10ms intervals, ensuring low-latency event detection. Simultaneously, an animation thread manages the OLED display, rendering "idle eyes" to give the assistant a personality. The main thread acts as the controller, orchestrating events between the various AI subsystems.

## Intelligent Modalities

The assistant operates in three primary modes, each mapped to a physical button:

- **LLM Conversation (K1):** Utilizing a quantized Gemma 3 4B model via `llama-cpp-python`, the assistant engages in natural language dialogue. It uses Vosk for offline speech-to-text and espeak for text-to-speech. Interaction is handled via push-to-talk logic.
- **Object Detection (K2):** The system leverages YOLOv8 Nano to identify objects in the environment. When triggered, it captures a frame from the Pi Camera, runs inference, and announces the detected object through the speaker and OLED.
- **Image Capture (K3):** A utility mode for saving timestamped JPEG images to local storage, providing visual confirmation on the display.

## Retrieval-Augmented Generation (RAG)

One of the standout features is the implementation of local RAG. Using ChromaDB and the `all-MiniLM-L6-v2` sentence transformer, the assistant maintains a persistent memory of past conversations and a local knowledge base. When a user asks a question, the system retrieves relevant context to augment the LLM prompt, significantly reducing hallucinations and providing a more personalized experience. This memory is persisted locally, ensuring that the assistant "remembers" previous interactions even after a reboot.

## Performance on the Edge

Optimized for the 4GB Raspberry Pi 5, the system balances model quantization and memory usage. The Gemma 3 4B model is run using 4-bit quantization (IQ4_XS), allowing it to fit within the Pi's RAM while maintaining a generation rate of 5-10 tokens per second. This makes the Raspberry Pi 5 a viable platform for sophisticated, multi-modal AI applications that were previously reserved for desktop-class hardware.

## Technical Implementation

The project is written in Python and leverages several key libraries for its operation:

```python
# Example of the event-driven controller logic
def handle_event(self, event):
    if event.type == ButtonEvent.K1_HOLD:
        self.recorder.start_recording()
    elif event.type == ButtonEvent.K1_RELEASE:
        audio_path = self.recorder.stop_recording()
        text = self.stt.transcribe(audio_path)
        response = self.llm.generate(text)
        self.tts.speak(response)
```

By combining specialized hardware interfaces with modern AI frameworks, this project demonstrates the potential for private, secure, and capable AI assistants that operate entirely on local hardware.
