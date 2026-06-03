---
title: Apache NuttX Driver for Bosch BME280 Sensor
summary: A comprehensive sensor driver for the Bosch BME280 (Temperature, Humidity,
  and Pressure) ported from Zephyr OS to Apache NuttX. It supports I2C communication
  and is optimized for platforms like the BL602 and ESP32, providing standard NuttX
  sensor character device interfaces.
codeUrl: https://github.com/lupyuen/bme280-nuttx
siteUrl: https://lupyuen.github.io/articles/bme280
isShow: false
rtos: nuttx
libraries: []
topics:
- bl602
- bl604
- bme280
- driver
- esp32
- i2c
- nuttx
- pinecone
- pinedio
- riscv32
- sensor
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
- bme680-sensor-package-for-rt-thread
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- bl602-adc-and-temperature-sensor-library-for-apache-nuttx
- mongoose-os-bme680-library
- dhtxx-sensor-driver-for-rt-thread
---

The Bosch BME280 is a popular environmental sensor capable of measuring temperature, humidity, and atmospheric pressure in a single package. While Apache NuttX previously had support for the BMP280 (which lacks humidity sensing), this project brings a full-featured BME280 driver to the NuttX ecosystem by porting the robust implementation found in Zephyr OS.

## Bridging the Gap: From Zephyr to NuttX

Porting a driver between RTOSes can be a complex task, but this project simplifies the process by wrapping the Zephyr BME280 driver logic into a NuttX-compatible layer. The driver is structured to handle the specific nuances of different hardware platforms. For instance, the BL602 microcontroller has a peculiar I2C implementation that requires sending the Register ID as a "Sub Address" rather than standard I2C data. This driver includes the necessary patches to ensure reliable communication on such hardware.

## Key Features and Architecture

Because NuttX does not have a single sensor type that encompasses temperature, humidity, and pressure simultaneously, this driver elegantly splits the BME280 into two logical devices:
1.  **Barometer Sensor**: Provides atmospheric pressure and ambient temperature.
2.  **Humidity Sensor**: Provides relative humidity data.

These appear in the NuttX file system as `/dev/sensor/baro0` and `/dev/sensor/humi0`, allowing standard tools and applications to interact with them using the unified NuttX Sensor API.

## Getting Started

To integrate this driver into your NuttX build, you can add it as a git submodule within your `drivers/sensors` directory. The installation involves creating symbolic links for the source and header files to maintain a clean project structure:

```bash
pushd nuttx/nuttx/drivers/sensors
git submodule add https://github.com/lupyuen/bme280-nuttx bme280
ln -s bme280/bundle.c bme280.c
popd

pushd nuttx/nuttx/include/nuttx/sensors
ln -s ../../../drivers/sensors/bme280/bundle.h bme280.h
popd
```

After updating your `Kconfig` and `Makefile`, you can enable the driver via `menuconfig` under `Device Drivers -> Sensor Device Support -> Bosch BME280 Sensor`.

## Hardware Integration

The driver has been successfully tested on the Pine64 PineCone (BL602) and ESP32. Registering the driver in your board's bring-up code is straightforward:

```c
#ifdef CONFIG_SENSORS_BME280
  struct i2c_master_s *i2c_bus = bl602_i2cbus_initialize(0);
  if (i2c_bus)
    {
      bme280_register(0, i2c_bus);
    }
#endif
```

## Testing with the NuttX Shell

Once the driver is loaded, you can verify its operation using the `sensortest` application. This allows you to pull real-time data directly from the NSH command line:

```text
nsh> sensortest -n 1 baro0
baro0: timestamp:256220000 value1:981.34 value2:28.73

nsh> sensortest -n 1 humi0
humi0: timestamp:553560000 value:92.90
```

This output confirms a pressure of 981.34 mbar, a temperature of 28.73°C, and a relative humidity of 92.90%. The driver also handles power management, allowing the sensor to be suspended or resumed to save energy in battery-powered applications.
