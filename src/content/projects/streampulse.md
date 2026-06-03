---
title: StreamPulse
summary: StreamPulse is a lightweight Python-based microservice designed to monitor
  the operational health of IP camera networks. It tracks RTSP and MJPEG stream availability,
  logging heartbeats to an SQLite database and providing real-time status via a Flask
  dashboard and MQTT. The system is optimized for edge computing platforms like Raspberry
  Pi and Orange Pi.
slug: streampulse
codeUrl: https://github.com/855princekumar/streampulse
star: 34
version: v2.2
lastUpdated: '2025-12-13'
rtos: ''
libraries:
- sqlite
topics:
- camera-monitoring
- flask
- iot
- microservices-architecture
- mjpeg
- python
- rtsp
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- espmonitor-iot-environment-monitoring-system
- pulse-real-time-vibration-anomaly-detection
- pymc-repeater
- espmonitor-iot-environmental-monitoring-system
- smart-dc-maintenance
- pulse
---

StreamPulse is a minimal microservice architecture designed to solve the problem of monitoring heterogeneous IP camera networks. In environments where mixed infrastructure—such as consumer-grade TP-Link Tapo cameras and custom Raspberry Pi nodes running MotionEye—is deployed, traditional NVR monitoring often fails to provide granular health data. StreamPulse fills this gap by providing a dedicated heartbeat mechanism that goes beyond simple ping checks to verify actual video stream availability.

## System Architecture

The project is built as a modular suite of three independent microservices, typically orchestrated by Supervisor within a Docker container. This modularity ensures that a failure in the MQTT publisher or the Web GUI does not interrupt the core monitoring logic.

- **Monitor Service**: This is the core engine that periodically connects to configured RTSP and MJPEG endpoints. It captures a frame to verify stream integrity and records success or failure, along with latency metrics, into a local SQLite database.
- **Web GUI Service**: A Flask-based dashboard that provides a visual overview of camera health. It allows users to edit configurations, view heartbeat logs, and perform on-demand live frame verification.
- **MQTT Service**: Introduced in version 2.2, this service publishes per-stream JSON heartbeat data to an external broker. It is designed for integration with broader IoT ecosystems, cloud monitoring pipelines, or custom Home Assistant dashboards.

## Technical Implementation

StreamPulse is optimized for low-spec edge hardware. By utilizing SQLite for data persistence, it avoids the overhead of a full-scale database management system while maintaining reliable logs. The configuration is managed via a simple YAML file, which supports hot-reloading, allowing users to add or remove camera streams without restarting the entire service stack.

### Configuration Example

Users define their camera network in a `config.yaml` file. The service supports various stream types and allows for custom heartbeat intervals:

```yaml
heartbeat_seconds: 15
timezone: Asia/Kolkata

streams:
  - name: GateCamera
    url: rtsp://user:pass@192.168.1.1:554/stream1

  - name: LabCam1
    url: http://192.168.1.1:9081
```

## Edge Deployment

Designed specifically for single-board computers (SBCs) like the Raspberry Pi and Orange Pi, StreamPulse is distributed as a Docker image. This containerized approach includes all dependencies and uses Supervisor to manage the Python processes. The system ensures data persistence by mounting the SQLite database and configuration file as volumes, allowing the monitoring history to survive container updates.

With its focus on low resource consumption and real-time reachability logging, StreamPulse provides a robust alternative to heavy Video Management Systems (VMS) for users managing small to medium-scale distributed camera deployments.
