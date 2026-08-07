---
layout: page
title: "LLM-DSE: Searching Accelerator Parameters with LLM Agents"
description: "LLM-DSE is a multi-agent LLM framework (Router, Specialists, Arbitrator, Critic) for optimizing HLS directive parameters of hardware accelerators, achieving 2.55× performance gains over state-of-the-art design-space-exploration methods on HLSyn."
citation:
  title: "LLM-DSE: Searching Accelerator Parameters with LLM Agents"
  authors: [Hanyu Wang, Xinrui Wu, Zijian Ding, Su Zheng, Chengyue Wang, Neha Prakriya, Tony Nowatzki, Yizhou Sun, Jason Cong]
  date: "2025/05/18"
  journal: "arXiv preprint arXiv:2505.12188"
  arxiv: "2505.12188"
  pdf_url: "https://arxiv.org/pdf/2505.12188"
---

**Hanyu Wang, Xinrui Wu, Zijian Ding, Su Zheng, Chengyue Wang, Neha Prakriya, Tony Nowatzki, Yizhou Sun, Jason Cong** · arXiv 2025 · [arXiv:2505.12188](https://arxiv.org/abs/2505.12188)

## Abstract

Even though high-level synthesis (HLS) tools mitigate the challenges of programming domain-specific accelerators (DSAs) by raising the abstraction level, optimizing hardware directive parameters remains a significant hurdle. Existing heuristic and learning-based methods struggle with adaptability and sample efficiency. We present LLM-DSE, a multi-agent framework designed specifically for optimizing HLS directives. Combining LLM with design space exploration (DSE), our explorer coordinates four agents: Router, Specialists, Arbitrator, and Critic. These multi-agent components interact with various tools to accelerate the optimization process. LLM-DSE leverages essential domain knowledge to identify efficient parameter combinations while maintaining adaptability through verbal learning from online interactions. Evaluations on the HLSyn dataset demonstrate that LLM-DSE achieves substantial 2.55× performance gains over state-of-the-art methods, uncovering novel designs while reducing runtime. Ablation studies validate the effectiveness and necessity of the proposed agent interactions.

## Plain-language summary

High-level synthesis lets developers write accelerators in C-like code, but its performance hinges on dozens of directive parameters (pipelining, unrolling, array partitioning) whose best combination is hard to find. Classical auto-tuners treat the problem as black-box search and waste many expensive tool runs; they also cannot read the code they are tuning. LLM-DSE replaces the black box with a team of language-model agents — a Router that picks strategies, Specialists that propose directive changes, an Arbitrator that selects among proposals, and a Critic that turns tool feedback into lessons — which reason about the source code and accumulated experience in natural language while interacting with the real HLS toolchain.

## Key contributions

- A multi-agent LLM architecture (Router / Specialists / Arbitrator / Critic) purpose-built for HLS directive optimization.
- Verbal online learning: the Critic converts tool feedback into reusable natural-language lessons, keeping the search adaptive without retraining.
- Tool-grounded evaluation loop connecting the agents to real HLS flows.

## Key results

On the HLSyn benchmark, LLM-DSE achieves **2.55× performance gains** over state-of-the-art design-space-exploration methods while reducing search runtime, and ablations show every agent role is necessary.

## Resources

- Paper: [arXiv:2505.12188](https://arxiv.org/abs/2505.12188) ([PDF](https://arxiv.org/pdf/2505.12188))
- Code: [LLM-DSE on GitHub](https://github.com/Nozidoali/LLM-DSE)

## How to cite

```bibtex
@article{wang2025llmdse,
  author  = {Wang, Hanyu and Wu, Xinrui and Ding, Zijian and Zheng, Su and Wang, Chengyue and Prakriya, Neha and Nowatzki, Tony and Sun, Yizhou and Cong, Jason},
  title   = {LLM-DSE: Searching Accelerator Parameters with LLM Agents},
  journal = {arXiv preprint arXiv:2505.12188},
  year    = {2025}
}
```
