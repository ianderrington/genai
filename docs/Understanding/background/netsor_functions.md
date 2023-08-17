https://www.kolda.net/publication/TensorReview.pdf

https://arxiv.org/pdf/2308.01814.pdf



??? code "[The Tensor Programs: 1](https://arxiv.org/pdf/1910.12478.pdf)"

    Ouput embeddings of two samples will be i.I.d. under randompermutations.
    Introduces generalization to Tensors and creates 
    NETSOR  Computation Programs
    Introduces three general mapping types of function variables.

    ```
    NETSOR programs are straight-line programs, where each variable follows one of three types, G, H, or A (such variables are called G-vars, H-vars, and A-vars), and after input variables, new variables can be introduced by one of the rules MatMul, LinComb, Nonlin to be discussed shortly. G and H are vector types and A is a matrix type; intuitively, G-vars should be thought of as vectors that are asymptotically Gaussian, H-vars are images of G-vars by coordinatewise nonlinearities, and A-vars are random matrices with iid Gaussian entries. Each type is annotated by dimensionality information:

    If x is a (vector) variable of type G (or H) and has dimension n, we write x : G(n) (or x : H(n)).
    If A is a (matrix) variable of type A and has size n1 × n2, we write A : A(n1, n2)
    G is a subtype of H, so that x : G(n) implies x : H(n). 
    ```

    G is petty much a ‘pass through’ like an activation function. 


    This a [Github](https://github.com/thegregyang/GP4A) implementation

??? code "[Tensor Programs IVb: Adaptive Optimization in the ∞-Width Limit](https://arxiv.org/pdf/2308.01814.pdf) Demonstrates how to scale hyperparameters when changing widths of feature parameters generally"
