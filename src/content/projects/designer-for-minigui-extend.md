---
title: Designer for MiniGUI Extend
summary: A visual development tool for the MiniGUI Extend framework designed to streamline
  the creation of Harbour and xHarbour applications. It features a CRUD form wizard,
  native support for RDDSQL, and seamless integration with databases like PostgreSQL,
  SQLite, and Firebird.
codeUrl: https://github.com/ivanilmarcelino/designer
siteUrl: https://www.hmgextended.com/
isShow: false
rtos: ''
libraries:
- sqlite
topics:
- adodb
- clipper
- database
- dbf
- designer
- expert
- forms
- harbour
- ide
- minigui
- modal
- mysql
- sqlite
- wizard
- xbase
- xharbour
- xls
- youtube
star: 15
lastUpdated: '2025-11-11'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- awtk-toolkit-anywhere
- esp32-mpy-jama
- db-wrapper
- luavgl
- sqlite3-for-esp-idf
- littledb-sql-like-database-for-esp32
---

### Bringing Visual Productivity to Harbour and MiniGUI

The **Designer for MiniGUI Extend** is a specialized visual development environment created by Ivanil Marcelino to empower the xBase community. For developers working with Harbour and xHarbour, this tool aims to restore the rapid application development (RAD) capabilities that once made Clipper a household name in the software industry. By providing a graphical interface for building forms and managing data, it significantly reduces the boilerplate code required to create professional Windows-based applications.

### Modern Database Integration with RDDSQL

One of the most significant updates to the Designer, introduced in early 2024, is its robust support for **RDDSQL**. This feature allows developers to transition from traditional DBF files to modern SQL environments with minimal friction. Through an intuitive wizard, users can generate complete CRUD (Create, Read, Update, Delete) forms in just a few clicks. 

What makes this particularly powerful is that the generated code is independent; once the form is created, it does not require the Designer to run. This allows for high levels of customization while maintaining a clean, portable codebase. The tool supports a wide array of database backends, including:
- **Native Access:** PostgreSQL, Firebird, and SQLite.
- **AdoDB/ADO:** Access, SQL Server, and MySQL.

### Bridging the Gap: From Console to GUI

For many legacy developers, migrating from a text-based console environment to a modern graphical user interface (GUI) can be a daunting task. The Designer addresses this "trauma" by providing specific samples and workflows designed for migration. It includes specialized logic for handling "Pilha e Desempilha" (Stacking and Unstacking) of forms, which is often a point of confusion when managing complex Child windows in a GUI environment.

### Flexible Distribution Packages

The project is distributed in several tiers to accommodate different developer needs:
- **DesignerFull:** A complete package including the designer and all necessary samples to get started immediately.
- **DesignerExpert:** A streamlined version for veteran users who prefer to manage their own Harbour or MiniGUI updates manually, providing only the base files needed for the tool to function.

### Getting Started and Community

The project is supported by a wealth of video tutorials on YouTube, covering everything from basic setup to advanced database connectivity. Developers are encouraged to join the `designerminigui@googlegroups.com` community to share tips, report bugs, and collaborate on the evolution of the xBase ecosystem. 

Because the tool is portable, it does not require administrative access to run. Users can simply unzip the package into a directory (preferably one with a short path to avoid legacy string limitations) and begin building. Whether you are migrating a legacy system or starting a new database-driven project, the Designer for MiniGUI Extend provides the visual tools necessary to stay productive in the modern era of Harbour development.
