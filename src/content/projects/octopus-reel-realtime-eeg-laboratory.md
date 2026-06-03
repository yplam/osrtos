---
title: Octopus-ReEL (Realtime EEG Laboratory)
summary: A comprehensive real-time EEG laboratory system designed for high-channel
  acquisition and auditory stimulation. It utilizes the RTAI real-time kernel extension
  for Linux and Comedi for hardware interfacing, supporting up to 128 channels of
  synchronized data acquisition.
slug: octopus-reel-realtime-eeg-laboratory
codeUrl: https://github.com/4e0n/octopus-reel
star: 7
lastUpdated: '2025-12-25'
rtos: rtai
topics:
- beowulf-cluster
- boundary-element-method
- classification
- comedi
- computer-network
- debian-gnu-linux
- deformable-model
- eeg-erp
- forward-modeling
- fuzzy-cmeans-clustering
- inverse-problems
- k-means-clustering
- mri-data
- opengl
- petsc
- qt4
- realtime-application
- rtai
- source-localization
- tissue-classification
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rthybrid
- rtai-irq-latency-experiments
- simple-open-ethercat-master-library-rtnet-version
- elk-audio-rtdm-driver-for-raspberry-pi
- rtdm-shift-register-driver-for-elk-pi
- str-xenomai-real-time-systems-practices
---

Octopus-ReEL, short for Octopus Realtime EEG Laboratory, is a specialized software suite designed for high-performance electroencephalography (EEG) research. The project provides a robust framework for synchronized data acquisition, real-time stimulation, and online data visualization, specifically targeting environments where hard real-time constraints are critical for experimental accuracy.

## System Architecture

The project is built on a distributed architecture that separates low-level hardware interaction from high-level user interfaces. It is designed to run on Debian/GNU Linux systems enhanced with the RTAI (Real-Time Application Interface) kernel extension. This setup allows the system to handle high-frequency data acquisition and precise stimulus timing that standard general-purpose operating systems cannot guarantee.

The codebase is split between kernel-space backends written in C, which handle the time-critical tasks, and frontend applications written in C++. Communication between these layers is managed through a set of common headers that define command structures and data formats, ensuring consistency across the system.

## Core Components

### Octopus-ACQ (Acquisition Server)
This is the heart of the data collection system. It acts as a daemon with an associated real-time kernel-space backend. It is capable of handling 128-channel acquisition synchronized over a parallel-port interrupt. It relies on the Comedi library for interfacing with A/D conversion hardware, making it compatible with a wide range of industrial and scientific data acquisition boards.

### Octopus-STIM (Stimulation Server)
Designed for auditory research, this component handles stereo auditory event stimulation. It includes tools for the calibration and normalization of individual amplifiers. Like the acquisition server, it utilizes a real-time backend to ensure that stimulus delivery is perfectly timed relative to the acquisition clock.

### Octopus-Recorder and Analyzer
The suite includes graphical tools for both online and offline workflows:
- **Octopus-Recorder**: A GUI frontend that allows for online averaging and real-time monitoring of all 128 channels. It is designed to run on multi-core systems with OpenGL acceleration to handle the significant rendering load of high-density EEG data.
- **Octopus-Analyzer**: A dedicated tool for offline data viewing and post-processing averaging.
- **Octopus-Patt**: A specialized tool for generating random patterns for binaural auditory paradigms.

## Technical Implementation

The project makes extensive use of the Comedi (Control and Measurement Device Interface) project to maintain hardware abstraction. This allows researchers to swap out A/D and D/A conversion hardware without rewriting the core acquisition logic. The system also leverages standard networking protocols for client-server communication, allowing the acquisition and stimulation servers to run on headless machines while the GUI frontend runs on a high-performance workstation.

Key configuration files in the `online/` directory, such as `fbcommand.h` and `acq_common.h`, define the low-level communication protocols between the frontend and backend, as well as the electrode mapping for standard 128-channel caps. This structured approach to metadata ensures that event codes and channel names remain consistent throughout the entire pipeline from acquisition to analysis.
