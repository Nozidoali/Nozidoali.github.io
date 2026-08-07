---
layout: page
title: "A Cost-Generic Resubstitution Algorithm with Customizable Cost Functions"
description: "A resubstitution algorithm for logic synthesis that accepts arbitrary user-defined cost functions (area, depth, fanout, and beyond), shipped in the EPFL mockturtle library and winner of the IWLS 2022 programming contest. IWLS 2022."
citation:
  title: "A Cost-Generic Resubstitution Algorithm with Customizable Cost Functions"
  authors: [Hanyu Wang, Siang-Yun Lee, Giovanni De Micheli]
  date: "2022/07"
  conference: "International Workshop on Logic & Synthesis (IWLS)"
---

**Hanyu Wang, Siang-Yun Lee, Giovanni De Micheli** · IWLS 2022 · [algorithm documentation](https://mockturtle.readthedocs.io/en/latest/algorithms/cost_generic_resub.html)

## Summary

Classical logic optimization algorithms hard-code their objective — usually AND-gate count or circuit depth — which makes them a poor fit for emerging technologies whose cost models differ from CMOS. This work generalizes Boolean resubstitution so that the optimization objective is a *parameter*: users plug in any customizable cost function, and the same engine optimizes for it. The algorithm ships in [mockturtle](https://mockturtle.readthedocs.io/en/latest/algorithms/cost_generic_resub.html), the EPFL open-source logic network library, and won **1st place in the IWLS 2022 programming contest**. The framework was later extended into [AnySyn (arXiv:2311.14721)](https://arxiv.org/abs/2311.14721), which shows 14% and 19% average improvements over non-specialized size and depth optimization, approaching specialized algorithms at a fraction of the development effort.

## Key contributions

- Boolean resubstitution with the cost function as a user-supplied parameter rather than a hard-coded objective.
- Production implementation in the mockturtle logic synthesis library.
- 1st place, IWLS 2022 programming contest.

## Resources

- Extended version: [AnySyn, arXiv:2311.14721](https://arxiv.org/abs/2311.14721) ([PDF](https://arxiv.org/pdf/2311.14721))
- Code: [cost-generic resubstitution in mockturtle](https://mockturtle.readthedocs.io/en/latest/algorithms/cost_generic_resub.html)

*A PDF of the original workshop paper is available on request ([email me](mailto:hanyuwang@g.ucla.edu)).*

## How to cite

```bibtex
@inproceedings{wang2022costgeneric,
  author    = {Wang, Hanyu and Lee, Siang-Yun and De Micheli, Giovanni},
  title     = {A Cost-Generic Resubstitution Algorithm with Customizable Cost Functions},
  booktitle = {International Workshop on Logic \& Synthesis (IWLS)},
  year      = {2022}
}
```
