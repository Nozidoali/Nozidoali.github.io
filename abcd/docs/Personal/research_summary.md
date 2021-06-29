# Logic Synthesis Research Summary

## Timeline & Overview

!!! note "Declaration"
    - [X] : useful work
    - [ ] : not work

#### 2019 Oct
- [x] Read `ABC` base Code: understand the data structures inside ABC, e.g. `Abc_Ntk_t`, `Abc_Obj_t`, `Abc_Cut_t`, `Vec_Ptr_t`, ...
- [x] Read `BLIF`, `AIGER` format: understand how to use tools to convert between different format: e.g. `aig2aag`, `aag2aig`
- [x] Read `EPFL` benchmarks: understand the contest of `best depth` and `best size`. 
- [x] Write a python BLIF parser

#### 2019 Dec
- [x] Read `graphviz`: visualize the logic network based on `dot` and `graphviz`, can be then converted to post script format.
- [ ] Write Idea 1.

#### 2020 Mar
- [ ] Help Zhou Zhuoer
- [x] Write Idea 2

#### 2020 Jun
- [x] Help Mao Xingyun
- [ ] Write Idea 3
- [ ] Read `SAT` based algorithms, `RL` algorithms: understand recent efforts to apply machine learning algorithms on improving logic synthesis.
- [ ] Read `Yosys` and `EPFL LS Library`: parse verilog files and convert to `BLIF` files. learn `EPFL` toolkits, including `Alice`, `Mockturtles` and try `ALSO` which is implemented based on `EPFL` toolkit. Moreover, visit `Open Source EDA` tools on `OpenRoad`.

#### 2020 Jul
- [x] Read `ABC` advanced commands `dc2` and `dch`. understand 3 basic operations in logic synthesis are `rewrite`, `refactor` and `resub`
- [ ] Write Idea 4

#### 2020 Oct
- [x] Read `Stochastic Algorithms` studied by `Fiser`, including `paritial network`, `Cartesian Genetic Programming`, and `Random Permuation`.
- [x] Read `LEKO` and `LEKU` from `J. Cong`, which studies the optimality of logic synthesis.
- [x] Write ABC Rewrite Pre-literature Search Report, which concludes the logic synthesis as a combinatorial optimization problem, which includes local optimizations and global scheduling.
- [x] Write Visualization Engine for Capstone project, which visualize the logic rewriting process.

#### 2020 Dec
- [x] Write Idea 5
- [ ] Read `GNN` algorithms

#### 2021 Jan
- [x] Read verification algorithms. understand how to combine simulation and `SAT` solver and the relationship between logic synthesis and verifications.
- [x] Read `Fanout Optimization` Related Works. including `TechMap Algorithms`, `Gate Duplciation`, `Buffer Insersion`, and `Rewiring` algorithms. 
- [ ] Help Huang Shen

#### 2021 Apr
- [x] Write Idea 6

#### 2021 Jun

*[Idea 1]: Tried to fix the fanout overload by first mapping the local LUT networks to AIG and do the fanout limited mapping.
*[Idea 2]: Use MFS to reduce the fanout overload by changing the resub criteria in the original mfs implementation.
*[Idea 3]: ABC Rewrite sequence research, changing the order of original ABC rewrite function, running random order, simulated annealing
*[Idea 4]: Improve the rewrite function by introducing a priority scheduler which decide the sequence of operations based on the potential gain.
*[Idea 5]: Fanout Optimization based on Gate Duplication.
*[Idea 6]: Fanout Optimization based on Gate Duplication and Rewiring.

## Problems, Solutions, & Results

!!! note "Problem 1: Fanout Optimization with strict limit (2019.10 - 2020.03)"
    Develop an algorithm to fix fanout overload in LUT network. The fanout limit for emerging circuit is low but current designs have large fanuot nodes, e.g. `dec_depth_2018`'s maximum fanout number is 64.  
    **Keywords: fanout**  

    !!! success "Solution:"  
        1. convert local LUT network $N$ to AIG $N'$.
        2. fix fanout number using buffer or duplication, get $N''$
        3. map to LUTs $N'''$

    !!! bug "Results:"
        - [x] our method works on the network with small fanouts
        - [ ] local network (MFFC) is usually big, sometimes the local extracted network is equivalent to the whole network.
        - [ ] ABC mapper will run redundancy removal and revert our operations to fix fanout overload.

!!! note "Problem 2: Fanout Optimization with soft limit (2020.03 - 2020.04)"
    Develop an algorithm to reduce the fanout delay on the critical path. The delay model is given by $Delay(G) = A+B\times fanout(G))$.  
    **Keywords: fanout, delay optimization**

    !!! success "Solution: MFS (2020.03)"
        Modify the target function in `ABC` `mfs`, find the new divisors to represent a function and optimize the fanout distribution upon nodes. On the other hand, if the area is optimized during `mfs`, new nodes are added to duplicate the high fanout nodes.  
        **mfs pseudocode**
        ```python
        for node in network: 
            for n_old in node.fanin: 
                n_new <= TryResub(node, n_old)
                if fanout(n_old) < fanout (n_new):
                    Update(node): n_old => n_new
        ```
        **duplication pseudocode**
        ```python
        _ntk <= MFS(ntk)
        area_saved <= node_num(ntk)-node_num(_ntk)
        while area_saved > 0:
            Duplicate(highest_fanout_node)
            area_saved--
        ```
        !!! bug "Result:"
            - [x] 18% TFCP reduction on average (on selected `EPFL` benchmarks, whose network is large enough and has room of improvement.)
            - [ ] all of the reduction are caused by the area optimization and the duplication, but not our "modified" mfs method.

    !!! success "Update: critical path update & larger window size (2020.11)"
        1. Improve the duplication and mfs performance by updating the critical path after each network rewriting.  
        2. Manually set the hyperparameters of ABC `mfs` function and increase the default window size of `mfs` while area optimization and rewiring.

        !!! danger "Result"
            - [x] 28% (previous +10%) TFP reduction on average.

    !!! success "Update: refine rewiring criteria & enable area increasement (2021.04)"
        1. write the project `ReFO` and provide more options to the user.  
        2. optimize the rewiring criteria and avoid making negative fanout changes to the network.  

        !!! danger "Result"
            - [x] 35% Delay Optimization ($1+0.2\times fanout(G)$ model) without Area increase on average.

!!! note "Problem 3: Improve ABC rewrite performance on area optimization (2021.03 - present)"
    The target of ABC rewrite is to reduce the AND nodes number in the AIG without increasing the level of it. There are several aspects that could be potentially optimized (sub-problems):  
        1. the combination of `rewrite`, `refactor`, `resub`.  
        2. the node traversal order and rewrite task scheduling of `rewrite` function.  
        3. the local 4-feasible cut rewrite machanism.  
    Note that the 3 problems are listed from the upper level to the lower level.   
    **keywords: AIG, area optimization**
    !!! success "Solution: optimize the combination of `rewrite`, `refactor`, `resub` -- Priority Scheduler (2020.08)"
        **keywords: priority scheduler**  
        Add a filter the operation procedure and make decision for each node if it should be operated based on the evaluation result.  
        **priority scheduler pseudocode**
        ```python
        seq <= compress2rs sequence
        for op in seq:
            next_op <= op.next
            for node in network:
                gain <= EvalGain(op, node)-EvalGain(next_op, node)
                if gain > 0:
                    Run(op, node)
        ```
        `EvalGain(op, node)` means try operation `op` (one of the `rewrite`, `refactor`, `rewrite`) on the `node`, and return the gain (node number reduction for area optimization) can get from this operation. We only run operation on this node if and only if the current operation is better than the later operation.  

        !!! bug "Result"
            - [x] 0.1% area improvement on the EPFL benchmark
            - [ ] hard to decide which solution is better (although the target does not consider level, ABC rewrite is able to reduce the delay. Sometime our area is better but delay is worse). 

    !!! success "Solution: the node traversal order and rewrite task scheduling of `rewrite` function (2020.03 - 2020.08)"
        **keywords: simulated annealing**  
        Modify the traversal order and rewrite update decision making by including a simulated annealing process into the rewrite engine.  
        **simulated annealing pseudocode**
        ```python
        T <= T_start # initial temperature
        while T > T_end:
            node <= RandomPick(network)
            op <= RandomPick({rewrite,refactor,resub}) 
            gain <= Eval(op, node)
            with exp(gain/T) as probability:
                Run(op, node)
                T <= CoolDown(T)
        ```
        !!! bug "Result"
            - [ ] converge to the same result no matter how we set the parameters.
            - [ ] the probability of getting "coincidence" that "accidently" negatively change the neighbour nodes in the correct way is extremely low (the probability is equal to evolutionary algorithms like CGP).
            - [ ] do not have enough theoretical proofs of our negative moves.

            !!! success "Update: ALTERSEQ (2020.05)"
                **keywords: alternately**  
                In order to increase the probability of getting useful negative rewriting and make more changes to the current state, we alternately run `Negative` rewriting and `Positive` rewriting, which is similar to the Espresso expand and reduce operations.  
                **ALTERNEQ pseudocode**  
                ```python
                iter <= num_iterations # set the number of iterations
                for iter times:
                    # negative rewrite
                    nodes <= RandomPick(network, num_nodes)
                    NegRewrite(nodes)
                    # positive rewrite
                    PosRewrite(network)
                ```

                !!! bug "Reuslt"
                    - [x] found some useful negative rewrite on one trail but the probability is still low.
                    - [ ] the runtime is long due to the large iteration numbers (we have to make sure the value of `num_nodes*num_iterations` is about the number of nodes we have)

            !!! success "Update: QUICKSEQ (2020.06)"
                **keywords: quick**  
                To accelarate previous method, we develop a faster script.  
                **QUICKSEQ pseudocode**  
                ```python
                iter <= num_iterations # set the number of iterations
                for iter times:
                    # negative rewrite
                    nodes <= RandomPick(network, num_nodes)
                    modified_nodes <= NegRewrite(nodes)
                    # positive rewrite
                    PosRewrite(modified_nodes)
                ```
                The difference is that, instead of doing the positive rewrite on the whole network, we only run it on the area we have changed in this iteration.

                !!! bug "Result"
                    - [x] The run-time is significantly reduced.
                    - [ ] The nodes are not properly marked and the result is different from ALTERSEQ. 


*[TFCP]: Total Fanout number on Critical Path
