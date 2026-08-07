---
layout: page
title: "Quantum State Preparation Using an Exact CNOT Synthesis Formulation"
description: "The first design automation algorithm to surpass manual design for state preparation: an exact CNOT synthesis formulation that halves the best known CNOT count for Dicke states and reduces CNOT count by 9% (dense) and 32% (sparse) for general states up to 20 qubits. DATE 2024."
citation:
  title: "Quantum State Preparation Using an Exact CNOT Synthesis Formulation"
  authors: [Hanyu Wang, Jason Cong, Giovanni De Micheli]
  date: "2024/03"
  conference: "Design, Automation & Test in Europe Conference & Exhibition (DATE)"
  pages: "1-6"
  doi: "10.23919/DATE58400.2024.10546633"
  arxiv: "2401.01009"
  pdf_url: "https://arxiv.org/pdf/2401.01009"
---

**Hanyu Wang, Jason Cong, Giovanni De Micheli** · DATE 2024 · [DOI](https://doi.org/10.23919/DATE58400.2024.10546633) · [arXiv:2401.01009](https://arxiv.org/abs/2401.01009)

## Abstract

Minimizing the use of CNOT gates in quantum state preparation is a crucial step in quantum compilation, as they introduce coupling constraints and more noise than single-qubit gates. Reducing the number of CNOT gates can lead to more efficient and accurate quantum computations. However, the lack of compatibility to model superposition and entanglement challenges the scalability and optimality of CNOT optimization algorithms on classical computers. In this paper, we propose an effective state preparation algorithm using an exact CNOT synthesis formulation. Our method represents a milestone as the first design automation algorithm to surpass manual design, reducing the best CNOT numbers to prepare a Dicke state by 2x. For general states with up to 20 qubits, our method reduces the CNOT number by 9% and 32% for dense and sparse states, on average, compared to the latest algorithms.

## Plain-language summary

Preparing a target quantum state is one of the first steps of almost every quantum algorithm, and its cost is dominated by CNOT gates. Hand-crafted constructions by experts have long beaten automated tools for important state families. This work formulates state preparation as an exact synthesis problem — searching for a provably CNOT-minimal circuit — and makes the search practical on classical computers. It is, to our knowledge, the first design automation method to beat the best manual designs: it halves the CNOT count of the best known Dicke-state preparation, and it also improves general dense and sparse states of up to 20 qubits.

## Key contributions

- An exact CNOT synthesis formulation for quantum state preparation.
- A search strategy that scales the exact formulation to practical state sizes.
- First automated method to surpass expert manual designs for Dicke states.

## Key results

| Target | Metric | Result |
| --- | --- | --- |
| Dicke states | best known CNOT count | 2× reduction |
| General dense states (≤ 20 qubits) | CNOT count vs. latest algorithms | 9% average reduction |
| General sparse states (≤ 20 qubits) | CNOT count vs. latest algorithms | 32% average reduction |

## Resources

- Paper: [IEEE Xplore (DOI)](https://doi.org/10.23919/DATE58400.2024.10546633) · [arXiv:2401.01009](https://arxiv.org/abs/2401.01009) ([PDF](https://arxiv.org/pdf/2401.01009))
- Code: [quantum-xyz](https://github.com/Nozidoali/quantum-xyz) (Python) · [exact-xyz](https://github.com/Nozidoali/exact-xyz) (C++)

## How to cite

```bibtex
@inproceedings{wang2024cnot,
  author    = {Wang, Hanyu and Cong, Jason and De Micheli, Giovanni},
  title     = {Quantum State Preparation Using an Exact CNOT Synthesis Formulation},
  booktitle = {Design, Automation \& Test in Europe Conference \& Exhibition (DATE)},
  pages     = {1--6},
  publisher = {IEEE},
  year      = {2024}
}
```
