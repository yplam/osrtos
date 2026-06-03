---
title: RTHybrid
summary: A real-time neuron and synapse model library designed for electrophysiological
  hybrid circuits using dynamic-clamp. It supports Linux systems with Preempt-RT and
  Xenomai 3 patches, providing a standardized framework for experimental neuroscience.
slug: rthybrid
codeUrl: https://github.com/GNB-UAM/RTHybrid
siteUrl: http://arantxa.ii.uam.es/~gnb/
star: 8
lastUpdated: '2020-07-15'
rtos: xenomai
topics:
- electrophysiology
- hybrid-circuits
- linux
- neuroscience
- preempt
- real-time
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- octopus-reel-realtime-eeg-laboratory
- simple-open-ethercat-master-library-rtnet-version
- xenomai-3-for-raspberry-pi-4
- archminix
- rtai-irq-latency-experiments
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
---

RTHybrid is a specialized real-time software library designed for the field of experimental neuroscience. Its primary purpose is to facilitate the creation of electrophysiological hybrid circuits, where living neurons are interfaced with computational models in real-time. This technique, known as dynamic-clamp, requires extremely low and predictable latency to maintain the biological relevance of the interaction between model and tissue.

Developed by the Grupo de Neurocomputación Biológica (GNB) at the Universidad Autónoma de Madrid, RTHybrid provides a standardized and open-source framework for researchers. By offering a library of pre-implemented neuron and synapse models, it allows scientists to focus on experimental design rather than low-level real-time programming and hardware interfacing.

### Real-Time Performance and RTOS Support

The core requirement for dynamic-clamp is a hard real-time execution environment. RTHybrid is built to run on Linux systems enhanced with real-time patches. It specifically supports:

- **Xenomai 3**: A real-time development framework that runs alongside the Linux kernel, providing deterministic response times through a co-kernel or Mercury core approach.
- **Preempt-RT**: A patch that transforms the standard Linux kernel into a fully preemptible RTOS.

The build system, managed via Qt project files, automatically detects the target environment. If Xenomai is detected, the project configures itself to use the Analogy framework for hardware interaction. Otherwise, it defaults to standard Linux with the Comedi library. This flexibility allows researchers to develop on standard workstations and deploy on high-performance real-time rigs.

### Comprehensive Model Library

RTHybrid includes an extensive collection of mathematical models for both neurons and synapses. These models are implemented in C for maximum performance and integrated into a Qt-based graphical user interface for ease of use. Some of the included models are:

- **Neuron Models**: Izhikevich (2003), Hindmarsh-Rose (1986), Wang (1993), Rulkov (2002), and Ghigliazza-Holmes (2004).
- **Synapse Models**: Electrical synapses, Destexhe et al. (1994), Golowasch et al. (1999), and Greenberg-Manor (2005).

The library architecture is modular, allowing for the integration of custom models. Each model typically consists of the mathematical implementation, an XML parser for configuration, and a GUI component for parameter adjustment during experiments.

### Hardware Interfacing and Control

To interact with biological samples, RTHybrid must communicate with Data Acquisition (DAQ) hardware with minimal jitter. The project includes dedicated drivers and functions for:

- **Analogy**: Used for real-time I/O in Xenomai environments, ensuring that the control loop meets strict timing constraints.
- **Comedi**: Used for general-purpose DAQ in standard Linux or Preempt-RT setups.
- **RT-Threads**: The system employs dedicated real-time threads to handle the simulation loop, ensuring that model updates and I/O operations occur at precise intervals.

### Getting Started

The project is primarily managed through Qt Creator. Users can compile the system using the provided `compile.sh` script, which supports core isolation to further improve real-time performance by binding the real-time tasks to specific CPU cores. Configuration is handled through XML files, which define the circuit topology and model parameters. For detailed guidance, the project maintains a comprehensive User Manual covering installation, hardware setup, and model configuration.
