---
title: RP2040 DAC-Amp
summary: An experimental USB DAC and Class-D amplifier implemented on the Raspberry
  Pi RP2040. The project uses PIO-based H-bridge control and a 4th-order delta-sigma
  modulator to drive external MOSFETs directly from the microcontroller.
slug: rp2040-dac-amp
codeUrl: https://github.com/thisiseth/rp2040-dac-amp
lastUpdated: '2024-10-16'
licenses:
- MIT
image: /202605/rp2040-dac-amp_0.avif
rtos: ''
topics:
- rp2040
- usb-dac
isShow: true
createdAt: '2026-05-10T00:53:18+00:00'
updatedAt: '2026-05-10T00:53:18+00:00'
---

The RP2040 DAC-Amp is an ambitious project that explores the limits of the Raspberry Pi RP2040 microcontroller by transforming it into a fully functional USB DAC and a 5-watt Class-D amplifier. While most audio projects on the Pico rely on external DAC chips or simple PWM, this project implements the entire signal chain—from receiving USB audio packets to driving a high-power MOSFET H-bridge—directly on the RP2040 hardware.

### Architectural Concept

The project operates on three main pillars: USB communication, digital signal processing, and high-speed hardware control. It uses the TinyUSB stack to act as a standard USB audio device, accepting 16-bit or 24-bit audio at 48kHz or 96kHz. Once the PCM data is received, the RP2040 performs a PCM-to-PDM (Pulse Density Modulation) conversion.

Because the RP2040 lacks a floating-point unit (FPU), the processing is handled via a 4th-order CIFF (Cascade-of-Integrators, Feed-Forward) topology modulator using fixed-point arithmetic. By sticking to int32 addition, multiplication, and bit-shifting with power-of-two coefficients, the system achieves a theoretical Signal-to-Noise Ratio (SNR) of at least 75 dB in the passband. This processing is hardware-accelerated by the RP2040's integer divider, though the design avoids division where possible to maintain the required 1.536MHz sampling rate.

### Driving the Hardware with PIO

The output stage is where the RP2040 truly flexes its versatility. Using the Programmable I/O (PIO) blocks, the system drives a series of MOSFETs arranged in an H-bridge configuration. This allows for +5V, -5V, and 0V states across the load. The PIO is essential here for managing signal timing and ensuring dead-time insertion, which prevents "shoot-through"—a condition where both high-side and low-side transistors are open simultaneously, causing a short circuit and potentially blowing the transistors.

The physical implementation requires six MOSFETs per channel and a low-pass LC filter to reconstruct the analog waveform from the high-frequency PDM pulses. To handle the gate charge required for switching, the project parallels multiple GPIO pins to boost the available current to the transistors. For example, the left channel H-bridge is connected across GPIO pins 6 through 13, with signals doubled up to increase driving strength.

### Technical Challenges and Real-World Results

Despite the impressive 75 dB SNR in theory, real-world hardware presents unique challenges. At low volumes, the output can suffer from artifacts like rattling or screeching, which is a common hurdle in high-order Delta-Sigma Modulators when implemented without high-end gate drivers or multibit quantizers. To avoid overloading the modulator, the input is limited to approximately 70% of full scale.

The project currently delivers roughly 1.5 watts per channel into a 4-ohm load. While it may not replace a dedicated audiophile amplifier, it serves as a fascinating demonstration of what can be achieved with clever software and the RP2040's unique PIO peripheral. It even supports modern hosts like the USB-C equipped iPhone 15 Pro, making it a portable, if experimental, audio solution.

### Hardware Configuration

The H-bridge wiring is logic-intensive, requiring careful connection to the Raspberry Pi Pico. The default configuration uses GPIO pins 6 through 21 to manage the stereo output:

```text
                 left channel                      right channel
GPIO      6  7    8  9   10  11  12  13     14  15  16  17  18  19  20  21
          |__|    |__|    |__|    |__|       |__|    |__|    |__|    |__|
           |       |       |       |          |       |       |       |
H-bridge   L-      H+      L+      H-         L-      H+      L+      H-
```

To prevent damage, the logic ensures that the H-bridge never enters a short-circuit state. A +5V state is achieved when L- and H+ are active, while a -5V state occurs when L+ and H- are active. The final output is then passed through an LC filter (suggested values: 5.6uH inductor and 2.2uF capacitor) to achieve a ~30kHz cutoff before reaching the speakers.

### Conclusion

The RP2040 DAC-Amp is a testament to the "software-defined hardware" philosophy enabled by the RP2040. By moving the complexity of audio modulation and power stage timing into the MCU's PIO and ARM cores, it reduces the bill of materials to basic discrete components while providing a deep dive into the mechanics of modern digital audio conversion.
