---
title: Bayesian Disease Mapping Code Examples
summary: A comprehensive collection of code examples for fitting hierarchical Bayesian
  models to small area health data. The repository covers multiple statistical frameworks
  including Win/OpenBUGS, Nimble, CARBayes, and INLA for spatial and spatio-temporal
  applications.
codeUrl: https://github.com/Andrew9Lawson/Bayesian-DM-code-examples
isShow: false
rtos: ''
libraries:
- nimble
topics:
- bdm
- icar
- inla
- nimble
- openbugs
- sccongen-inla-models
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32-cortex-m4-code-examples
- esp32-repo
- modm-devices-curated-microcontroller-device-data
- hsmcpp-hierarchical-state-machine-c-library
- esp-mesh-lite-examples
- xiao-esp32c6-sketches
---

Bayesian Disease Mapping (BDM) is a critical field in public health and epidemiology, providing the statistical tools necessary to understand the distribution of diseases across geographic areas and time. The **Bayesian-DM-code-examples** repository, maintained by Andrew Lawson, serves as an open-source resource for researchers and statisticians looking to implement hierarchical Bayesian models using a variety of modern software packages.

### A Multi-Package Approach to Bayesian Modeling

One of the primary strengths of this repository is its breadth. Rather than focusing on a single tool, it provides comparable examples across several major statistical frameworks. This allows users to choose the tool that best fits their computational needs or existing workflows. The repository categorizes its examples into two main computational approaches:

*   **MCMC-Based Packages**: Traditional Markov Chain Monte Carlo methods are represented through examples in **Win/OpenBUGS**, **CARBayes**, and **Nimble**. These tools offer high flexibility for complex hierarchical structures.
*   **Laplace Approximation**: For those requiring faster computation, the repository includes examples using **INLA** (Integrated Nested Laplace Approximations), which is often preferred for large spatial datasets where MCMC might be computationally prohibitive.

### Key Applications and Data Examples

The code examples provided are not just theoretical; they are applied to real-world datasets, making them highly valuable for practitioners. The repository covers a range of spatial and spatio-temporal scenarios:

*   **Spatial Mapping**: Examples include lip cancer data in South Carolina and oral cancer in Georgia using convolution models.
*   **Spatio-Temporal Analysis**: The repository features models for respiratory cancer in Ohio, utilizing the Knorr-Held model structure to account for both space and time interactions.
*   **Multivariate and Multi-scale Models**: Advanced examples demonstrate how to handle data at multiple scales or involving multiple correlated variables, such as the MVCAR (Multivariate Conditionally Autoregressive) models for Georgia counties.

### Technical Implementation

The repository is organized by file type and package. For instance, users interested in **Nimble**—a flexible system for hierarchical modeling—can find specific implementations for lognormal models and Gamma-Poisson toy data. Users of **CARBayes** can find scripts specifically tailored for lip cancer mapping in South Carolina using the `carbayes_lipcancer_SCcongen90.txt` examples.

For those working with **INLA**, the repository provides R scripts like `FMD_INLA_ST_Rcode.txt` and `OHIO_STmapping_INLA_RcodeFAL.txt`, which demonstrate how to set up spatial effects and temporal trends within the INLA framework.

### Getting Started

To use these examples, researchers typically need an environment set up for R, as many of the scripts (like `fillmap.R` and the various `_Rcode.txt` files) are designed to be run within the R statistical computing environment. Depending on the specific model, you may need to install the corresponding R packages:

```r
# Example of packages often required for these scripts
install.packages("CARBayes")
install.packages("nimble")
install.packages("INLA", repos=c(getOption("repos"), INLA="https://inla.r-inla-download.org/R/stable"), dep=TRUE)
```

This repository stands as a vital bridge between complex statistical theory and practical implementation, offering a clear path for epidemiologists to apply sophisticated Bayesian techniques to their own health data.
