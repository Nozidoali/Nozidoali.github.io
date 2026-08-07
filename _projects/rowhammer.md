---
layout: page
title: Flip Feng Shui RowHammer exploit
description: Taking over a QEMU VM from a co-hosted attacker VM using RowHammer-triggered bit flips against OpenSSH RSA keys.
importance: 2
category: coursework
---

A hardware-security course project at ETH Zurich: an end-to-end Flip Feng Shui attack that uses RowHammer-induced bit flips and memory deduplication to corrupt a co-hosted victim VM's `authorized_keys` RSA modulus, then factorizes the weakened key to gain SSH access. [Report and artifacts](https://polybox.ethz.ch/index.php/s/PSRpAq8jXCDD5YB).
