---
layout: page
title: "Quantum Circuit Synthesis Using an Exact T Library"
description: "We formulate exact T-count synthesis by canonicalizing Boolean functions under Clifford equivalence, precompute T-optimal implementations up to seven variables, and build a customized mapper — reducing T count by up to 14.3% on EPFL benchmarks and up to 40% on cryptographic modules. DAC 2026."
citation:
  title: "Quantum Circuit Synthesis Using an Exact T Library"
  authors: [Hanyu Wang, Mingfei Yu, Xinrui Wu, Jason Cong]
  date: "2026"
  conference: "63rd ACM/IEEE Design Automation Conference (DAC)"
  arxiv: "2605.15476"
  pdf_url: "https://arxiv.org/pdf/2605.15476"
---

**Hanyu Wang, Mingfei Yu, Xinrui Wu, Jason Cong** · DAC 2026 · [arXiv:2605.15476](https://arxiv.org/abs/2605.15476)

## Abstract

In fault-tolerant quantum circuit synthesis, T gates supplied via magic states dominate space-time cost, while Clifford gates incur negligible overhead. Conventional flows minimize AND count in an {XOR, AND, NOT} basis as a proxy for T, which neglects phase cancellation and can be far from T-optimal. We instead formulate an exact T synthesis problem and canonicalize Boolean functions under Clifford equivalence. By precomputing T-optimal implementations up to seven variables and developing a customized mapper, we reduce the T count by up to 14.3% on EPFL benchmarks and improve the T counts of several cryptographic modules by up to 40%.

## Plain-language summary

Running programs on a fault-tolerant quantum computer is expensive mainly because of one gate type: the T gate, which must be "fed" by costly magic states. Standard toolchains do not minimize T gates directly — they minimize AND gates in a classical logic representation and hope the T count follows. This misses cancellation effects that only exist in the quantum domain. This work builds a library of provably T-optimal circuits for all small Boolean functions (up to seven inputs), grouped by Clifford equivalence so the library stays compact, and then maps large circuits onto that library with a mapper designed for T-count cost. The result is a synthesis flow that targets the true cost metric of fault-tolerant quantum computing instead of a proxy.

## Key contributions

- An exact T-count synthesis formulation, rather than minimizing AND count as a proxy.
- Canonicalization of Boolean functions under Clifford equivalence, making a precomputed T-optimal library (up to 7 variables) tractable.
- A customized technology mapper that rewrites large circuits using the T-optimal library.

## Key results

| Benchmark | Metric | Improvement |
| --- | --- | --- |
| EPFL benchmarks | T count | up to 14.3% reduction |
| Cryptographic modules | T count | up to 40% reduction |

## Resources

- Paper: [arXiv:2605.15476](https://arxiv.org/abs/2605.15476) ([PDF](https://arxiv.org/pdf/2605.15476))
- Code: [exact-t-map on GitHub](https://github.com/Nozidoali/exact-t-map)

## How to cite

```bibtex
@inproceedings{wang2026exactt,
  author    = {Wang, Hanyu and Yu, Mingfei and Wu, Xinrui and Cong, Jason},
  title     = {Quantum Circuit Synthesis Using an Exact T Library},
  booktitle = {63rd ACM/IEEE Design Automation Conference (DAC)},
  year      = {2026}
}
```
