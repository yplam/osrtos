---
title: Mbed Support for CLion
summary: A dedicated CLion plugin for Mbed OS development that integrates Mbed CLI
  functionality directly into the IDE. It simplifies project lifecycle management,
  from creation and target selection to build profile configuration and dependency
  tracking.
slug: mbed-support-for-clion
codeUrl: https://github.com/zero9178/Mbed-Support-for-CLion
siteUrl: https://os.mbed.com/docs/mbed-os/v5.15/tools/working-with-mbed-cli.html
star: 10
lastUpdated: '2020-07-29'
rtos: mbed-os
topics:
- clion
- mbed-cli
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-vim
- mbed-tools
- clion-for-stm32
- mbed-vscode-tools
- micropython-plugin-for-pycharm-and-intellij
- micropy-cli
---

## Streamlining Mbed OS Development in CLion

Mbed Support for CLion is a powerful plugin designed to bridge the gap between the Mbed OS ecosystem and the JetBrains CLion IDE. By integrating the Mbed CLI directly into the development environment, it provides a seamless workflow for developers targeting ARM-based microcontrollers. The plugin automates the complex setup processes typically associated with Mbed OS, allowing developers to focus on writing firmware rather than managing build scripts.

## Core Features and Capabilities

The plugin transforms CLion into a full-featured Mbed IDE by providing deep integration with the underlying command-line tools. Key functionalities include:

### Project Lifecycle Management
Developers can create new Mbed projects directly from the CLion 'New Project' dialog. The plugin handles the initial download of Mbed OS and prompts the user to select a target board immediately. For existing projects, the plugin integrates `mbed import` functionality, allowing users to pull repositories from Git or Mercurial directly into their workspace.

### Intelligent Configuration
Mbed OS uses `mbed_app.json` for configuration. This plugin enhances the editing experience by providing a schema that enables code completion, documentation tooltips, and validity checks within the JSON file. When changes are made to the configuration, the plugin automatically prompts to reload the project, regenerating the necessary CMake files to reflect the new settings.

### Target and Build Management
One of the most convenient features is the ability to change the target board at any time through a dedicated UI, eliminating the need to manually run CLI commands. It also supports switching between Debug and Release modes, which automatically adjusts optimization levels for the compiler. 

### Advanced Build Profiles
For fine-grained control over the compilation process, the plugin provides a GUI for managing Mbed Build Profiles. Users can add multiple JSON profile files to customize C, C++, and Assembly flags, as well as linker options. The plugin even handles the ordering of these profiles, ensuring that build flags are applied in the correct sequence.

## Technical Implementation

The plugin acts as a wrapper around the `mbed-cli`. When a project is created or modified, the plugin triggers the CLI to generate a `CMakeLists.txt` file. CLion then uses this file to index symbols and manage the build process. To improve performance, the plugin recommends using the Ninja build system, which significantly reduces compile times for both incremental and full builds compared to traditional Makefiles.

## Package and Dependency Tracking

A dedicated "Mbed" tool window provides a visual tree view of all project dependencies. This allows developers to inspect the package hierarchy and change versions of specific libraries or sub-dependencies without leaving the IDE. This level of visibility is crucial for maintaining stable firmware builds in complex projects.

## Getting Started

To use the plugin, developers must have the `mbed-cli` installed and accessible in their system PATH (or explicitly configured in the plugin settings). Once installed, the plugin handles the heavy lifting of environment synchronization. For optimal performance, users are encouraged to enable repository caching via the CLI (`mbed cache on`), which speeds up project creation and allows for offline development.
