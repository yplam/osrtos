---
title: Broccoli
summary: Broccoli is a distributed task queue framework designed for ESP32 clusters,
  enabling parallel task execution across multiple MicroPython-based nodes. Inspired
  by Celery, it provides a scalable way to manage workloads in embedded environments
  using a cluster of low-cost microcontrollers.
codeUrl: https://github.com/Wei1234c/Broccoli
isShow: false
rtos: ''
libraries:
- micropython
topics:
- celery
- cluster
- distributed
- esp32
- iot
- micropython
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- embeddedmqttbroker
- mqboard-micropython-mqtt-micro-framework
- micros
- micropython-smarthome-node-pysmartnode
- raspberry-pi-pico-web-server-control
- microhomie
---

Broccoli is an innovative project that brings the power of distributed computing to the world of microcontrollers. Specifically designed for ESP32 clusters, Broccoli implements a distributed task queue system inspired by the popular Python library, Celery. By leveraging the capabilities of MicroPython, it allows developers to distribute computational workloads across multiple ESP32 nodes, effectively creating a mini-cluster for embedded tasks.

### The Concept of an ESP32 Cluster

While high-performance computing usually involves powerful servers, Broccoli explores the potential of using numerous low-cost, low-power microcontrollers to solve problems in parallel. The project provides the necessary infrastructure to manage these nodes, dispatch tasks, and handle results. This is particularly useful for IoT applications where data processing can be offloaded from a single gateway to several edge nodes, or for educational purposes in demonstrating distributed systems architecture.

### Technical Architecture

The project is structured into several key components that facilitate the distributed workflow:

- **Nodes**: These are the ESP32 microcontrollers running MicroPython. They act as the workers in the cluster, waiting for tasks to be assigned and executing them locally.
- **Client**: The interface used to submit tasks to the cluster. This can run on a standard PC (amd64) or another controller.
- **Task Management**: Inspired by Celery, Broccoli uses a decorator-based approach to define tasks. This makes the code highly readable and familiar to Python developers.

The repository includes specialized code for different environments, including `amd64` for desktop-side management and `micropython` for the embedded nodes. It also features configuration utilities to manage cluster settings efficiently.

### Getting Started with Broccoli

Setting up a Broccoli cluster involves flashing ESP32 modules with MicroPython and deploying the Broccoli node software. The project provides comprehensive documentation in the form of Jupyter Notebooks (`.ipynb`), which serve as both tutorials and live demonstrations. 

For example, defining a task in Broccoli looks very similar to standard Python code:

```python
# Example of a task definition (conceptual)
@broccoli.task
def add(x, y):
    return x + y
```

Once defined, these tasks can be dispatched to the cluster, where an available ESP32 node will pick up the job, execute the logic, and return the result to the caller.

### Hardware and Ecosystem

Broccoli is optimized for the ESP32, a versatile SoC with built-in Wi-Fi and Bluetooth. The project documentation references specific hardware like the WeMos LOLIN32 and provides insights into battery interfaces, suggesting a focus on portable or remote cluster deployments. 

By combining the ease of MicroPython with the architecture of distributed task queues, Broccoli offers a unique toolkit for developers looking to push the boundaries of what a collection of microcontrollers can achieve together.
