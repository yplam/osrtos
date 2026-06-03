---
title: ContikiPy
summary: ContikiPy is a suite of Python scripts designed to automate Cooja simulations,
  parse logs, and generate plots for the Contiki-NG and Contiki-OS environments. It
  simplifies the workflow of extracting results from simulation logs using YAML configurations
  and integrated data processing with Pandas.
codeUrl: https://github.com/mbaddeley/contikipy
isShow: false
rtos: contiki-ng
libraries: []
topics:
- contiki
- contiki-os
- cooja
- parser
- plotting
- python
- simulation
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rpl-network-visualizer
- cooja-senseh
- home-automation-simulation-using-contiki-os
- svdsuite
- cmsis-parser
- computer-network-with-contiki-ng
---

ContikiPy is a specialized toolset designed for researchers and developers working with the Contiki-NG and Contiki-OS ecosystems. Anyone who has spent significant time with the Cooja simulator knows that while it is powerful, the process of manually running simulations, extracting log files, and transforming that raw data into meaningful plots can be repetitive and error-prone. ContikiPy addresses this by providing an automated pipeline for simulation management and data analysis.

### Streamlining the Contiki Workflow

The project began as a personal utility to simplify the task of getting results out of Contiki logs. It has since evolved into a comprehensive suite of Python scripts that handle the heavy lifting of simulation orchestration. By using YAML configuration files, users can define their simulation parameters once and then execute the entire process—from running the simulation in Cooja to parsing the resulting logs and generating comparative plots—with a single command.

### Key Features

ContikiPy is structured around three main functional pillars:

*   **Run Cooja**: Automates the execution of simulations based on the parameters defined in a YAML configuration file. This eliminates the need to manually interact with the Cooja GUI for repetitive experimental runs.
*   **Parse Logs**: Automatically processes simulation logs. It is specifically optimized for Contiki-NG logging formats and uses Python's Pandas library to handle data efficiently.
*   **Compare Results**: Allows for the comparison of different simulation runs, making it easier to visualize how changes in code or configuration affect network performance.

### Getting Started with Automation

To use ContikiPy, users typically interact with the main `contikipy.py` script. A standard execution command looks like this:

```bash
./contikipy.py --conf="my-config-file-xx.yaml" --runcooja=1 --parse=1 --comp=1
```

This command tells the tool to run the simulation, parse the logs, and generate comparison plots all in one go. The project includes several template YAML files, such as `config-usdn.yaml` and `config-sdn-wise.yaml`, which serve as excellent starting points for custom experiments.

### Extending and Customizing Plots

One of the most powerful aspects of ContikiPy is its extensibility. If the built-in plots do not meet your specific needs, you can add new ones by following a structured process:

1.  **Configuration**: Add the name of your new plot to the `plot:` section in your YAML file.
2.  **Mapping**: In `cplogparser.py`, map your plot name to a specific function in the `atomic_function_map` and define the required datasets in the `atomic_dict_map`.
3.  **Implementation**: Write a Python function that accepts a list of Pandas DataFrames and uses them to generate your custom visualization.

### Technical Foundation

ContikiPy leverages the Python ecosystem to provide a modern interface for legacy simulation tools. By utilizing Pandas for data manipulation, it allows researchers to use familiar snippets for data cleaning and analysis. The repository even includes a `useful-pandas-snippets.py` file to help users get started with data processing. Whether you are working on SDN-WISE, USDN, or standard Contiki-NG networking stacks, ContikiPy provides the automation necessary to speed up the research cycle.
