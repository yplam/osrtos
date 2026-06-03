---
title: 'MTDS Projects: IoT and Distributed Systems'
summary: A collection of IoT and distributed systems projects focusing on noise level
  analysis and smart building management. It utilizes the Contiki RTOS for sensor
  nodes alongside modern data processing frameworks like Akka, Kafka, and Spark for
  data enrichment and control loops.
slug: mtds-projects-iot-and-distributed-systems
codeUrl: https://github.com/AlessandroMessori/MTDS-Projects
star: 1
lastUpdated: '2022-09-14'
rtos: contiki-os
topics:
- akka
- contiki-ng
- distributed-systems
- kafka
- mpi
- node-red
- spark
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- iot-labs-with-contiki-os
- low-power-wireless-networking-for-iot-lpiot
- internet-of-things-home-challenges
- building-wireless-sensor-networks-with-openthread
- smart-dc-maintenance
- mongoose-os-samples-for-esp32
---

## Overview

The MTDS (Mobile and Transvasive Data Systems) Projects repository is a comprehensive collection of implementations focusing on the intersection of embedded systems, the Internet of Things (IoT), and distributed data processing. Developed by Alessandro Messori, Daria Preda, and Simone Tagliente, these projects demonstrate how low-power sensor networks can be integrated with robust backend architectures to solve real-world monitoring and control problems.

## Project 1: Noise Level Simulation and Analysis

The first project focuses on the simulation and analysis of environmental noise levels. This implementation leverages a multi-tiered architecture to handle data from the edge to the cloud:

- **Edge Layer**: Utilizes the Contiki RTOS to manage sensor data acquisition. Contiki is a specialized operating system for the Internet of Things, designed for low-power microcontrollers and networked embedded systems.
- **Data Pipeline**: Data is streamed and processed using a powerful distributed stack including Akka for actor-based concurrency, Apache Kafka for distributed messaging, and Apache Spark for large-scale data processing.
- **Functionality**: The system performs sophisticated data cleaning and enrichment, ensuring that raw sensor inputs are transformed into actionable insights regarding urban noise pollution.

## Project 2: Smart Buildings and Neighborhoods

The second project shifts focus toward automation and control within smart environments. By combining Contiki-based nodes with Node-Red, the project implements responsive control loops. Node-Red provides a flow-based programming environment that simplifies the orchestration of IoT devices, allowing for intelligent building management systems that can adjust environmental parameters based on real-time sensor feedback.

## Technical Implementation and Demos

Beyond the primary projects, the repository includes an MPI (Message Passing Interface) demo, showcasing parallel computing concepts often used in high-performance distributed environments. The project structure is organized into specific directories for noise sensors and smart building logic, reflecting a modular approach to system design.

### Key Technologies Used:
- **Contiki RTOS**: Used for the embedded sensor node logic and networking.
- **Node-Red**: Used for visual programming and IoT orchestration in the smart building project.
- **Distributed Frameworks**: Integration with Akka, Kafka, and Spark for high-throughput data processing.

## Documentation

For developers interested in the architectural details, the repository includes a comprehensive PDF document (`MTDS_Project_Documentation.pdf`) that outlines the design choices, data flow, and implementation specifics for both the noise monitoring and smart building systems. This documentation serves as a guide for understanding how constrained embedded devices (running Contiki) can effectively interface with modern big data engineering tools.
