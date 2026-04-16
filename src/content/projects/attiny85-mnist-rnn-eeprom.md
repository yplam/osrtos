---
title: ATtiny85 MNIST RNN EEPROM
summary: This project implements a Recurrent Neural Network (RNN) on an ATtiny85 microcontroller
  to perform MNIST digit recognition with approximately 95% accuracy. It utilizes
  the device's internal 512-byte EEPROM to store quantized model weights and biases,
  enabling deep learning inference on a highly resource-constrained 8-bit platform.
slug: attiny85-mnist-rnn-eeprom
codeUrl: https://github.com/GiorgosXou/ATTiny85-MNIST-RNN-EEPROM
siteUrl: https://github.com/GiorgosXou/NeuralNetworks
lastUpdated: '2026-03-06'
image: /202604/ATTiny85-MNIST-RNN-EEPROM_0.avif
rtos: ''
topics:
- attiny85
- cpp11
- eeprom
- int8-quantization
- microcontrollers
- mnist
- mnist-classification
- mnist-dataset
- mnist-model
- rnn
isShow: true
createdAt: '2026-04-16T03:44:03+00:00'
updatedAt: '2026-04-16T03:44:03+00:00'
---

This project demonstrates the capability of running a lightweight Recurrent Neural Network (RNN) model on the ATtiny85 microcontroller. Despite the hardware's significant constraints, the model achieves approximately 95% accuracy in recognizing handwritten digits from the MNIST dataset. The core of the implementation relies on utilizing the internal 512-byte EEPROM to store the model's parameters, allowing the device to perform inference without exhausting its limited SRAM.

![MNIST digit recognition example showing number 7](/202604/ATTiny85-MNIST-RNN-EEPROM_1.avif)

## Implementation Workflow

The project is structured into three primary phases to prepare the hardware and execute the neural network. 

First, the environment must be configured with the appropriate board support and libraries. This includes the ATTinyCore for Arduino IDE and a specialized NeuralNetwork library designed for embedded systems. 

Second, the model parameters must be persisted. Because the ATtiny85 has very limited program memory and RAM, the pre-trained, int8-quantized RNN weights, biases, and layer configurations are written directly to the internal EEPROM. This is handled by a dedicated utility sketch that transfers the model from program memory (PROGMEM) to the non-volatile EEPROM storage.

Finally, the inference sketch is flashed to the device. This application reads the input pixel data, performs the matrix operations required by the RNN architecture, and outputs the predicted digit. In the provided example, the result is signaled via an onboard LED, such as the one found on a DigiSpark board.

## Testing and Validation

To verify the legitimacy of the results, the model can be tested natively on a standard operating system. By cloning the repository and compiling the provided C++ source with `g++`, users can run the same inference logic against the full MNIST training and test CSV files. This environment allows for high-speed validation of the model's accuracy before deploying it to the 8-bit hardware.

```bash
g++ -std=c++11 main.cpp -o main.o -O3 -march=native -ffast-math
./main.o
```

## Visualizations

The internal workings and historical iterations of the model provide insight into how the network interprets digit data. These visualizations show the mathematical representations and activations within the layers as the RNN processes the input stream.

![Neural network model visualization example](/202604/ATTiny85-MNIST-RNN-EEPROM_4.avif)
![Internal representation visualization of the RNN model](/202604/ATTiny85-MNIST-RNN-EEPROM_5.avif)

By combining efficient int8 quantization with clever use of the ATtiny85's internal storage, this project serves as a powerful example of "TinyML"—bringing machine learning to the smallest class of microcontrollers.
