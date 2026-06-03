---
title: Weather Station with Google Cloud IoT Core and Mongoose OS
summary: An IoT weather station project utilizing Mongoose OS to connect ESP32 or
  ESP8266 microcontrollers to Google Cloud Platform. It features a complete data pipeline
  from device telemetry to BigQuery storage and a Firebase-hosted web dashboard.
slug: weather-station-with-google-cloud-iot-core-and-mongoose-os
codeUrl: https://github.com/alvarowolfx/weather-station-gcp-mongoose-os
siteUrl: https://weather-station-iot-170004.firebaseapp.com
star: 49
lastUpdated: '2018-08-01'
rtos: mongoose-os
topics:
- bigquery
- cloud-iot
- firebase
- google-cloud
- iot
- iot-core
- mongoose-os
- serverless
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-environmental-sensors-application
- mongoose-os-programs-and-examples
- mongoose-os-environment-logger
- losant-mqtt-example-for-mongoose-os
- swarmsense-iot-platform-with-mongoose-os
- mbed-to-google-cloud-iot
---

This project provides a comprehensive guide and codebase for building a professional-grade IoT weather station. By combining the power of Mongoose OS with Google Cloud Platform (GCP), it demonstrates how to bridge the gap between embedded hardware and cloud-based data analytics.

## Project Overview

The system is designed to collect environmental data using microcontrollers like the ESP32 or ESP8266. The firmware, built on Mongoose OS, handles the complexities of secure cloud connectivity, allowing the device to communicate seamlessly with Google Cloud IoT Core. Once the data reaches the cloud, it is routed through a series of services to enable storage, analysis, and real-time visualization.

## Technical Architecture

The project leverages a modern IoT stack to ensure scalability and reliability:

- **Embedded OS**: Mongoose OS provides the foundation for the firmware, offering built-in support for GCP IoT Core and simplified provisioning via the `mos` tool.
- **Cloud Gateway**: Google Cloud IoT Core acts as the secure entry point for device data, managing authentication and communication via MQTT.
- **Data Ingestion**: Google Cloud Pub/Sub handles the asynchronous messaging between the IoT Core and downstream services.
- **Storage and Analytics**: Data is funneled into BigQuery, a serverless data warehouse, allowing for high-performance SQL queries and integration with reporting tools like Google Data Studio.
- **Web Application**: A Firebase-hosted web app provides a user-friendly interface for viewing live sensor data and historical reports.

## Firmware and Provisioning

One of the standout features of this project is the use of Mongoose OS Tools (`mos`). The development workflow is streamlined through commands that handle building for specific architectures (ESP32/ESP8266), flashing the hardware, and configuring WiFi. 

Security is a primary focus; the project utilizes `mos gcp-iot-setup` to automate the creation of device identities and the exchange of security keys with the Google Cloud registry. This ensures that every weather station connected to the system is properly authenticated and authorized to publish telemetry data.

## Cloud Integration and Visualization

Beyond the hardware, the project includes the necessary configuration for the GCP backend. This includes setting up Pub/Sub subscriptions and BigQuery datasets. A Firebase Cloud Function serves as the glue, automatically moving data from Pub/Sub into the BigQuery `raw_data` table as it arrives.

The frontend web application, built with Firebase, allows users to interact with the collected data. It demonstrates how to use Firebase Functions to query BigQuery and present that data in a web-based dashboard, completing the end-to-end journey from a physical sensor to a digital interface.
