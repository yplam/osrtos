---
title: Smart Plant Monitoring System
summary: An ESP32-based IoT system for monitoring plant health using soil moisture,
  temperature, humidity, and ultrasonic sensors. It features automated watering, local
  LCD feedback, and remote monitoring via the Blynk mobile app.
slug: smart-plant-monitoring-system
codeUrl: https://github.com/Shishir3D/PlantMonitoringSystem
star: 18
lastUpdated: '2024-10-13'
rtos: ''
topics:
- arduino
- automation
- blynk
- dht11
- esp32
- home-automation
- iot
- lcd-display
- microcontroller
- plant-monitoring
- sensors
- smart-agriculture
- smart-farming
- soil-moisture-sensor
- water-pump
isShow: true
image: /202603/plant-monitoring.webp
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

The Smart Plant Monitoring System is a comprehensive IoT solution designed to automate and simplify plant care. Built around the versatile ESP32 microcontroller, the project combines environmental sensing with automated actuation to ensure plants receive optimal care without constant manual intervention.

### System Architecture and Hardware
The heart of the system is the ESP32, chosen for its built-in Wi-Fi capabilities and ample GPIO pins. The system employs a suite of sensors to gather a complete picture of the plant's environment:
- **DHT11 Sensor**: Monitors ambient temperature and humidity.
- **Soil Moisture Sensor**: Measures the volumetric water content in the soil to determine hydration needs.
- **Ultrasonic Sensor**: Used to monitor the water level in the reservoir or detect proximity for safety alerts.
- **LCD Display (I2C)**: Provides local, real-time feedback of sensor data for users physically near the plant.
- **Water Pump & Relay**: Executes the watering logic based on sensor thresholds.
- **Buzzer**: Acts as an audible alarm for critical states, such as low water levels in the supply tank.

### Intelligent Automation Logic
The firmware is designed to be proactive. In the integrated version of the code, the system monitors soil moisture levels and compares them against a predefined threshold. If the moisture level falls below a specific percentage (mapped from the analog sensor data), the system identifies the soil as "dry" and can trigger the water pump. Conversely, when the soil is sufficiently moist, the pump is deactivated to prevent overwatering.

Safety features are also integrated via the ultrasonic sensor. By measuring the distance to the water surface in a tank, the system can trigger a buzzer if the water level is too low, preventing the pump from running dry and potentially burning out. This distance data is also displayed on the LCD and synced to the cloud.

### IoT Integration with Blynk
One of the standout features of this project is its integration with the Blynk IoT platform. By using the Blynk library, the system connects to the cloud, allowing users to:
- View real-time temperature, humidity, and moisture graphs on their smartphones.
- Receive alerts and notifications regarding plant health.
- Manually override the water pump via a virtual switch on the mobile dashboard.
- Monitor the system's distance sensor readings to check water reservoir levels remotely.

### Technical Implementation
The project demonstrates good embedded programming practices by moving away from the standard `delay()` function in its final iteration. Instead, it utilizes `BlynkTimer` to schedule tasks. This allows the ESP32 to handle multiple operations—reading sensors, updating the LCD, and maintaining a cloud connection—concurrently without one task blocking the others. This non-blocking architecture is essential for maintaining a responsive IoT connection while performing real-time sensor polling.

```cpp
// Example of non-blocking timer setup in the project
void setup() {
  // ... initialization code ...
  timer.setInterval(2000L, moistureSensor); 
  timer.setInterval(2000L, readTemperatureAndHumidity); 
  timer.setInterval(2000L, ultrasonicSensor); 
  timer.setInterval(5800L, lcdClear); 
}
```

This modular approach makes the system robust and easily expandable. Future improvements suggested by the developer include the transition to capacitive moisture sensors for better durability and the potential for AI-driven disease detection using image recognition.
