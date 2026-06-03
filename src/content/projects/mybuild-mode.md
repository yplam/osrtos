---
title: mybuild-mode
summary: An Emacs major mode for editing Mybuild files, the configuration language
  used by the Embox RTOS. It provides syntax highlighting, intelligent indentation,
  and automatic file association based on the official Embox grammar.
slug: mybuild-mode
codeUrl: https://github.com/easimonenko/mybuild-mode
siteUrl: https://embox.github.io/
star: 3
version: v0.2.0
lastUpdated: '2022-10-07'
rtos: embox
topics:
- emacs
- emacs-mode
- embox
- os
- syntax-highlighting
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- kconfig-for-the-zephyr-project
- mbed-vscode-tools
- rtems-cmake-build-support
- mbed-vim
- snu-2d-programming-tools-ide-for-nesc
- freertos-rust
---

## Enhancing Embox Development with mybuild-mode

Developing for the Embox operating system involves working with Mybuild files—a specialized configuration language that defines modules, dependencies, and build parameters. To streamline this process for Emacs users, `mybuild-mode` provides a dedicated environment for editing these files with precision and ease.

## Overview

`mybuild-mode` is a major mode for GNU Emacs specifically tailored for the Mybuild syntax used in the Embox RTOS project. Embox is known for its highly modular architecture, where almost every component is defined as a module. Mybuild files (`.my`, `Mybuild`, and `mods.conf`) are the blueprints for these modules, and having proper editor support is crucial for maintaining large-scale embedded projects.

## Key Features

The mode focuses on providing a clean and accurate editing experience by implementing several core features:

- **Syntax Highlighting**: Using the standard `font-lock-mode`, it provides visual cues for keywords, types, constants, and preprocessor directives.
- **Intelligent Indentation**: It calculates proper indentation levels based on the nested structure of Mybuild files, ensuring code remains readable and consistent.
- **Automatic File Association**: The mode automatically activates when opening `Mybuild`, `*.my`, or `mods.conf` files, integrating seamlessly into the developer's workflow.

## Technical Foundation

The implementation of `mybuild-mode` is grounded in the formal grammar of the Mybuild language. The author utilized the official grammar specification (`mk/mybuild/myfile.grm`) from the Embox source tree to ensure that the highlighting and indentation logic align with the language's actual structure.

Built upon `prog-mode`, the package follows Emacs best practices for language modes. It defines a custom syntax table to handle comments (using `//` and `/* ... */` styles) and character classes correctly. The mode uses lexical binding for improved performance and modern Emacs Lisp compatibility.

## Customization

Developers can easily adjust the behavior of the mode to match their personal or project-wide coding styles. The primary customization option is `mybuild-indent-offset`, which controls the width of indentation. By default, this is set to 2 spaces, but it can be modified via the Emacs customization interface or directly in a configuration file:

```elisp
(setq mybuild-indent-offset 4)
```

## Integration with the Embox Ecosystem

For developers working on Embox, this mode fills a vital gap in the tooling ecosystem. By providing a structured way to interact with configuration files, it reduces the likelihood of syntax errors and improves the overall developer experience when configuring complex embedded systems. 

The mode is available via MELPA, making it easy to install and update using the standard Emacs package manager. While it focuses on the core editing experience, it provides a solid foundation for developers who need to manage the intricate module dependencies that define an Embox build.
