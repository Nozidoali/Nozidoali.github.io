---
layout: page
title: "Quantum State Preparation Circuit Optimization Exploiting Don't Cares"
description: "A peephole optimization that identifies local unitaries whose replacement does not change the prepared state (don't cares), reducing two-qubit gate count of state preparation circuits by 36% over prior methods. ICCAD 2024."
citation:
  title: "Quantum State Preparation Circuit Optimization Exploiting Don't Cares"
  authors: [Hanyu Wang, Daniel Bochen Tan, Jason Cong]
  date: "2024/10"
  conference: "IEEE/ACM International Conference on Computer-Aided Design (ICCAD)"
  pages: "31:1-31:9"
  doi: "10.1145/3676536.3676646"
  arxiv: "2409.01418"
  pdf_url: "https://arxiv.org/pdf/2409.01418"
---

**Hanyu Wang, Daniel Bochen Tan, Jason Cong** · ICCAD 2024 · [DOI](https://doi.org/10.1145/3676536.3676646) · [arXiv:2409.01418](https://arxiv.org/abs/2409.01418)

## Abstract

Quantum state preparation initializes the quantum registers and is essential for running quantum algorithms. Designing state preparation circuits that entangle qubits efficiently with fewer two-qubit gates enhances accuracy and alleviates coupling constraints on devices. Existing methods synthesize an initial circuit and leverage compilers to reduce the circuit's gate count while preserving the unitary equivalency. In this study, we identify numerous conditions within the quantum circuit where breaking local unitary equivalences does not alter the overall outcome of the state preparation (i.e., don't cares). We introduce a peephole optimization algorithm that identifies such unitaries for replacement in the original circuit. Exploiting these don't care conditions, our algorithm achieves a 36% reduction in the number of two-qubit gates compared to prior methods.

## Plain-language summary

A quantum program starts by preparing a specific quantum state, and the dominant cost of that preparation is two-qubit gates — the noisiest operations on real hardware. Existing compilers only apply rewrites that keep every intermediate step exactly equivalent. But state preparation has a fixed known input (all zeros), so many intermediate differences simply do not matter — the classical logic-synthesis notion of "don't cares" carries over to quantum circuits. This work scans a synthesized circuit window by window (peephole optimization), detects where local behavior is under-constrained, and replaces those windows with cheaper circuits that prepare the same final state.

## Key contributions

- Identifies don't-care conditions in quantum state preparation: local unitary changes that cannot affect the final prepared state.
- A peephole optimization algorithm that finds and replaces such local unitaries automatically.

## Key results

Compared to prior state preparation methods, the algorithm reduces two-qubit gate count by **36%** on average.

## Resources

- Paper: [ACM DL (DOI)](https://doi.org/10.1145/3676536.3676646) · [arXiv:2409.01418](https://arxiv.org/abs/2409.01418) ([PDF](https://arxiv.org/pdf/2409.01418))
- Related code: [quantum-xyz](https://github.com/Nozidoali/quantum-xyz)

## How to cite

```bibtex
@inproceedings{wang2024dontcares,
  author    = {Wang, Hanyu and Tan, Daniel Bochen and Cong, Jason},
  title     = {Quantum State Preparation Circuit Optimization Exploiting Don't Cares},
  booktitle = {IEEE/ACM International Conference on Computer-Aided Design (ICCAD)},
  pages     = {31:1--31:9},
  publisher = {ACM},
  year      = {2024}
}
```
