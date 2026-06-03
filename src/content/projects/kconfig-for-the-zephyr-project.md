---
title: Kconfig for the Zephyr Project
summary: A Visual Studio Code extension providing comprehensive Kconfig language support
  specifically tailored for the Zephyr Project. It features syntax highlighting, autocompletion,
  and linting for Kconfig and property files, integrating directly with the West build
  tool and Zephyr's module system.
slug: kconfig-for-the-zephyr-project
codeUrl: https://github.com/trond-snekvik/vscode-kconfig
star: 21
version: v1.2.0
lastUpdated: '2021-09-26'
rtos: zephyr
topics:
- kconfig-language
- vscode
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- vs-code-zephyr-development-environment
- micropico-visual-studio-code-extension
- mbed-vscode-tools
- west-the-zephyr-rtos-meta-tool
- zig-language-toolchain-for-esp-idf
- zephyr-rtos-ai-harness
---

## Overview

Kconfig for the Zephyr Project is a Visual Studio Code extension designed to streamline the configuration process for developers working with the Zephyr RTOS. Kconfig is the configuration system used by Zephyr (inherited from the Linux kernel) to manage build-time options, and this extension brings IDE-grade features to these configuration files, which are traditionally edited as plain text.

While this extension provided foundational support for the Zephyr community, it is important to note that it is now being transitioned in favor of Nordic Semiconductor's Kconfig extension. However, it remains a significant tool for understanding the integration between VS Code and the Zephyr build ecosystem.

## Key Features

The extension provides a rich set of features for three distinct file types commonly found in Zephyr projects: Kconfig files, property files (.conf), and C source files.

### Kconfig Language Support
For Kconfig files, the extension adds essential IDE capabilities that simplify navigating complex configuration trees:
- **Syntax Highlighting & Autocompletion**: Makes keywords and symbols easy to identify and suggest.
- **Navigation**: Includes "Go to Definition," "Find All References," and the ability to follow `source` links directly to included files.
- **Workspace Symbols & Breadcrumbs**: Allows for quick jumping between configuration symbols across the entire project.
- **Environment Resolution**: Automatically resolves environment variable replacements within the Kconfig files.

### Properties and Configuration Files
Beyond the Kconfig definitions themselves, the extension provides deep contextual awareness for `.conf` files (like `prj.conf`):
- **Contextual Linting**: Performs type checking on configuration values, range checking, and identifies redundant entries or invalid combinations.
- **Dependency Checking**: Warns users about missing dependencies or entries that lack prompts.
- **Code Actions**: Offers automated fixes, such as adding missing dependencies or removing redundant entries with a single click.
- **Board Awareness**: Displays the active Zephyr board in the status bar and allows users to change boards using a quick-select menu populated by `west boards`.

### C File Integration
To bridge the gap between configuration and implementation, the extension adds symbol information for `CONFIG_` defines within C files. This allows developers to hover over a configuration macro in their source code to see its definition or jump directly to the Kconfig file where it was declared.

## Zephyr and West Integration

The extension is designed to work out of the box with the Zephyr Project's `west` tool. It parses the entire Kconfig tree, including external modules, upon startup. This process typically takes only a few seconds, after which the extension reports the number of entries found (often ranging from 5,000 to 10,000 in a standard Zephyr environment).

It follows the Zephyr `module.yml` specification to retrieve external projects and supports advanced configurations like multiple SoC roots and out-of-tree application support. This makes it a versatile tool for developers working on complex, multi-module embedded systems.

## Technical Implementation

Built as a TypeScript-based VS Code extension, it utilizes Webpack for bundling and integrates with the VS Code Language Server Protocol (LSP) concepts to provide diagnostics and navigation. It relies on the presence of the `west` tool (version 0.7.0 or newer) to automatically resolve the Zephyr base directory and board definitions, though these can be manually overridden in the extension settings if necessary.
