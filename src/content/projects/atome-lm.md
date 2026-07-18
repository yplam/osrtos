---
title: Atome LM
summary: Atome LM is a routed-ternary tiny language model designed for microcontroller-class
  RAM budgets, featuring bit-exact Python and C99 inference. It integrates ternary
  weights, a hybrid SSM/sparse-attention/local-conv block, and a byte tokenizer to
  enable efficient AI execution on hardware like the ESP32 and Cortex-M3.
slug: atome-lm
codeUrl: https://github.com/TilelliLab/atome-lm
siteUrl: https://atomelm.com
version: v2.0
lastUpdated: '2026-07-08'
licenses:
- Apache-2.0
rtos: freertos
topics:
- bitnet
- cortex-m
- edge-ai
- embedded
- esp32
- language-model
- llm
- machine-learning
- microcontroller
- on-device-ai
- qemu
- quantization
- small-language-model
- stm32
- ternary
- tinyml
isShow: false
createdAt: '2026-07-15T05:07:24+00:00'
updatedAt: '2026-07-15T05:07:24+00:00'
---

Datacenter-scale large language models assume datacenter-scale resources, but a $2 microcontroller stuck on a wall or embedded in a battery-powered toy doesn't have gigabytes of RAM. Atome LM bridges this gap by providing a reference implementation of a routed-ternary tiny language model specifically architected for the constraints of embedded systems. It is not just a model, but a complete integration kit that covers the entire pipeline from training in Python to bit-exact inference in C99.

### Architectural Innovations

Atome LM's efficiency stems from three integrated architectural choices. First, it utilizes ternary weights ({-α, 0, +α}), following the BitNet b1.58 approach. This removes the need for floating-point multiplications in the matrix multiplication stages during inference, which is a massive win for low-power MCUs. 

Second, the model employs a unique 3-pathway block. Each token is routed through a per-token soft router into one of three inductive biases: a local depthwise causal convolution (k=5), a diagonal State Space Model (SSM), or a top-k sparse attention mechanism. This hybrid approach allows the model to capture different types of dependencies efficiently. 

Finally, the system uses a byte tokenizer. By operating directly on bytes, the project eliminates the need to ship a large Byte Pair Encoding (BPE) table, further saving precious flash memory.

### Bit-Exact Inference and Hardware Support

The project emphasizes "bit-exact parity" between its Python training code and the C99 inference engine. This ensures that the behavior observed during development is identical to the behavior on the target silicon. The C engine is designed to be extremely lightweight; at the default configuration of 60,000 parameters, the packed binary blob occupies roughly 20 KB of flash. 

Hardware support is demonstrated through a real-silicon implementation on the ESP32-WROOM-32. Running fully offline, the model can generate coherent text at approximately one token per second. It also passes parity tests on QEMU ARM (Cortex-M3), making it highly portable across various microcontroller families such as the STM32, RP2040, and nRF52 series. For ESP32 targets, the project integrates with the ESP-IDF framework, leveraging FreeRTOS for task management.

### Metacognition and Uncertainty

An interesting byproduct of the routed architecture is the exposure of a "metacognition" signal. Because the router's entropy is observable at every position for free, it provides a per-layer, per-token uncertainty signal. Preliminary observations suggest that this entropy tracks out-of-domain inputs and correlates with per-token loss, offering a built-in calibration signal that is rare in models of this scale.

### Getting Started with Atome LM

The Python interface is designed to be intuitive for those familiar with PyTorch. A basic model can be initialized and run with just a few lines of code:

```python
import torch
from atome_llm.core.atome_lm import AtomeLM

# Defaults match the Atome C99 engine's compile-time #defines:
# d_model=64, n_layers=4, d_head=16, top_k=4, kernel=5, vocab=256.
model = AtomeLM()
print(f"params: {model.parameter_count():,}")

ids = torch.randint(0, 256, (1, 32))
logits = model(ids) # (1, 32, 256)

# Per-layer per-token uncertainty signal:
ent_per_layer = model.router_entropies(ids) 
```

While Atome LM is not a general-purpose chatbot, it is highly effective when trained on narrow, domain-specific corpora. It allows developers to add intelligent, natural-language interfaces to embedded devices where AI was previously considered impossible due to hardware limitations.
