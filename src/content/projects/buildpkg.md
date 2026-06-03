---
title: buildpkg
summary: buildpkg is a command-line utility designed to streamline the creation and
  management of RT-Thread packages. It automates the generation of standardized package
  templates, including READMEs, SConscript files, and CI scripts, and facilitates
  the migration of existing open-source repositories into the RT-Thread ecosystem.
codeUrl: https://github.com/rtpkgs/buildpkg
siteUrl: https://github.com/rtpkgs/buildpkg
isShow: false
rtos: rt-thread
libraries: []
topics:
- pkg
- rt-thread
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rtems-cmake-build-support
- mbed-vscode-tools
- rtduino-pinout-generator
- mbed-tools
- cmsis-rp2040
- micropy-cli
---

Developing for an RTOS like RT-Thread often involves creating or porting libraries into the official package ecosystem. To maintain high quality, a package should ideally include elegant code, usage examples, SConscript files for the build system, comprehensive documentation, and clear licensing. However, setting up this boilerplate manually can be tedious. This is where **buildpkg** comes in—a dedicated toolkit designed to automate the creation of RT-Thread package templates.

### Simplifying the RT-Thread Package Lifecycle

buildpkg is a Python-based tool (also available as a standalone Windows executable) that helps developers quickly scaffold new packages or migrate existing ones. Its primary goal is to reduce the friction of preparing open-source repositories for the RT-Thread environment by providing standardized templates for essential files.

The tool supports three main workflows:
1.  **Constructing a New Package**: It creates a package directory with a specified name and automatically populates it with a README, versioning information, GitHub CI scripts, demo code, and open-source license files.
2.  **Migrating Open Source Repositories**: By pointing the tool at a Git URL, it can pull existing code and wrap it in the RT-Thread package structure, though users may still need to perform manual adjustments for specific hardware or logic requirements.
3.  **Updating Existing Packages**: If you need to change the version number, update the license, or modify the SCons scripts after the package has been generated, buildpkg provides an update command to handle these metadata changes efficiently.

### Getting Started with buildpkg

The tool is designed for simplicity. For Windows users, a pre-compiled `.exe` is available, while other platforms can run the `buildpkg.py` script directly. Here are the core commands used to manage your packages:

To create a new package named `pkgdemo`:
```bash
buildpkg.exe make pkgdemo
```

To migrate an existing repository, such as a string library:
```bash
buildpkg.exe make cstring https://github.com/liu2guang/cstring.git
```

To update an existing package's configuration:
```bash
buildpkg.exe update pkgname
```

### Configuration and Customization

Beyond basic generation, buildpkg allows for fine-grained control through command-line arguments. Developers can specify the package version (e.g., `--version=v1.0.0`), set the preferred license (e.g., `--license=MIT`), or even manage Git submodules during the migration process using the `--submodule` flag.

The project includes a robust set of templates located in the `templates/` directory. These include GitHub Action YAML files for continuous integration, Kconfig templates for RT-Thread configuration menus, and SConscript examples to ensure the package integrates seamlessly with the RT-Thread build system.

### Platform Support and Community

Currently, buildpkg is fully tested on Windows 10 (both as an executable and a Python script). While it is a Python-based tool, compatibility for Linux and macOS is in progress. The project is open-source and welcomes contributions from the RT-Thread community to expand its template library and platform support, ensuring that the RT-Thread package ecosystem continues to grow with high-quality, standardized components.
