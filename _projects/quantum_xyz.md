---
layout: page
title: Quantum state preparation
description: Synthesis algorithms for quantum circuits — exact CNOT synthesis and don't-care-based optimization behind our DATE'24 and ICCAD'24 papers.
importance: 2
category: research
related_publications: true
---

Preparing an arbitrary quantum state is a fundamental subroutine in quantum computing, and the qubit/gate cost of the preparation circuit is often the bottleneck. This line of work formulates state preparation as an exact synthesis problem {% cite wang2024cnot %} and further reduces circuit cost by exploiting don't cares in the target state {% cite wang2024dontcares %}.

The algorithms are implemented in [quantum-xyz](https://github.com/Nozidoali/quantum-xyz) (Python) and re-engineered in [exact-xyz](https://github.com/Nozidoali/exact-xyz) (C++) for performance.
