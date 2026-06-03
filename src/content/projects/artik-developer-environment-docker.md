---
title: ARTIK Developer Environment Docker
summary: A comprehensive Docker-based development environment tailored for Samsung
  ARTIK modules. It provides pre-configured toolchains and environments for TizenRT,
  RPM-based Fedora builds, and DEB-based Ubuntu builds, simplifying the complex setup
  required for cross-compilation and firmware development.
codeUrl: https://github.com/webispy/docker-artik-devenv
siteUrl: https://hub.docker.com/r/webispy/artik_devenv/
isShow: false
rtos: tizenrt
libraries: []
topics:
- artik
- deb
- docker
- fed-artik-tools
- mk-sbuild
- rpm
- sbuild
- tizenrt
star: 2
lastUpdated: '2019-04-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- tock-os-docker-image
- nuttx-development-docker-environment
- swedish-embedded-workstation
- nrf-connect-sdk-docker-environment
- sel4-camkes-and-l4v-docker-build-environments
- docker-containers-for-the-zephyr-rtos
---

Setting up a development environment for embedded systems often involves a complex dance of toolchains, dependencies, and cross-compilation configurations. The **ARTIK Developer Environment Docker** project simplifies this process for developers working with Samsung ARTIK modules by providing a ready-to-use containerized workspace. Whether you are building real-time applications for the ARTIK-05x series or full Linux distributions for the ARTIK 530/710, this environment has you covered.

## A Versatile Development Hub

This Docker image is more than just a compiler wrapper; it is a full-featured development suite. It includes support for several critical workflows:
- **TizenRT Build Environment:** Specifically designed for the ARTIK-05x series.
- **RPM Build Environment:** Utilizing `fed-artik-tools` for ARTIK 520/710 Fedora-based development.
- **DEB Build Environment:** Using `sbuild` for ARTIK 530 (armhf) and 710 (arm64) Debian/Ubuntu development.
- **Modern Shell Support:** Includes `zsh` with `oh-my-zsh` and a non-root user account named 'work' for a more comfortable terminal experience.

One of the standout features is its robustness in restricted network environments. It provides built-in support for proxies and custom SSL certificates, which are often major hurdles in corporate development settings.

## Getting Started with the Environment

To get started, you need to have Docker installed and `qemu-user-static` configured on your host to handle cross-architecture execution. Once the prerequisites are met, you can pull the prebuilt image and start a container with a single command:

```sh
# Basic usage
$ docker run -it --name artik-dev webispy/artik_devenv
```

For more advanced workflows, such as flashing hardware or using SSH keys, you can mount host devices and volumes:

```sh
$ docker run -it -v /dev/bus/usb:/dev/bus/usb -v ~/.ssh:/home/work/.ssh --privileged --name artik-dev webispy/artik_devenv
```

## Building TizenRT for ARTIK-05x

One of the primary use cases for this environment is building TizenRT. Once inside the container, the process is straightforward. You can clone the official TizenRT repository, configure it for your specific board (like the ARTIK 053), and compile the OS:

```sh
# Inside the docker container
➜  ~ git clone https://github.com/SamsungARTIK/TizenRT.git
➜  ~ cd TizenRT/os/tools
➜  tools git:(artik) ./configure.sh artik053/nettest
➜  tools git:(artik) cd ..
➜  os git:(artik) make
➜  os git:(artik) sudo make download os
```

## Advanced Package Building

For developers working on higher-end ARTIK modules running Linux, the environment supports both RPM and DEB package creation. For ARTIK 710 users, the environment can initialize a chroot using a specific rootfs image, allowing for native-like building of Fedora packages using `fed-artik-build`.

Similarly, for Debian-based projects, the container supports `mk-sbuild`. This allows you to create an `armhf` or `arm64` native environment to build packages for Ubuntu Xenial or other distributions, ensuring that your binaries are perfectly compatible with the target hardware.

## Customization and Optimization

The project provides extensive documentation on customizing the Docker service itself. This includes instructions for configuring proxy settings at the systemd level, moving the Docker data storage to an external SSD for better performance, and switching to the `overlay2` storage driver for improved efficiency. These optimizations ensure that the development environment remains fast and responsive even when handling large builds.
