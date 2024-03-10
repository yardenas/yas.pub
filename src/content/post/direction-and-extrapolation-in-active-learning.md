---
publishDate: 2024-03-17T00:00:00Z
title: Direction and Extrapolation in Active Learning
excerpt: A note on Information-based Transductive Active Learning
image: https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1651&q=80
category: Paper Notes
tags:
  - Active Learning
---

### Learning as an Iterative Process

One key challenge that resonates in numerous learning tasks, is the process of deciding what to learn next. For example, imagine you are trying to learn a new hobby. One way to learn your hobby quickly, would be to keep track of a reading list of books that will allow you to learn from experts. As you keep reading these books from your reading list, you’ll need to decide which of them is worth investing time in order to cover all the learning material. For example, if your goal is learning chess, there’s no need to repeat two books for beginners when you can already progress to learning new opening strategies.

How can you intelligently choose the next book? Active learning algorithms [cite classical papers] can methodologically guide you in your quest.

Let’s take our chess learning problem and model it as an Active Learning Problem. Suppose that each book can be represented as a set of features that uniquely identify it. Let’s also suppose that you can freely order any book in Amazon Books. Let’s denote the set of all of these books as $\mathcal{X}$ and assume that there is some stochastic process $\{f(x)\}_{x \in \mathcal{X}}$ that maps features of books to your ability to win chess games. Let’s further denote our reading list (from which we “sample” new books) as $\mathcal{S}$. Classical Active Learning algorithms try to solve the following question:

<aside>
🌴 *How can we globally learn* $f$ *by sampling (noisy) observations of it within* $\mathcal{S}$*?*

</aside>

### Uncertainty Sampling

So how a “classical” Active Learning algorithm generally works? First, assume that at each round $n$ the agent has to choose a point $x_n \in \mathcal{S}$, given this choice, it observes a noisy measurement $y = f(x) + \varepsilon(x)$ where $\varepsilon$ is an independent, but possibly [heteroscedastic](https://en.wikipedia.org/wiki/Homoscedasticity_and_heteroscedasticity), noise. Deciding how to sample $x_n$ (typically) depends on all previously collected data $\mathcal{D}_{n -1} = \{(x_i, y_i)\}_{i < n}$. One classical method for Active Learning is “Uncertainty Sampling” (UnSa). The main principle that guides UnSa is to query $x_n = \arg\max_{x \in \mathcal{X}}\sqrt{\mathrm{Var}[y \mid \mathcal{D}_{n - 1}]}$[^Note that if we model $f$ with a Gaussian Process, the computation of UnSa is exact, i.e., the variance after having observed $\mathcal{D_{n - 1}}$ can be computed in closed-form. As we can see, UnSa greedily chooses the next query point for which the information about $f$, given all the previous data we collected, is maximized. Moreover, let $\mathrm{I}(\cdot; \cdot)$ denote the mutual information between two random variables, $x_n = \arg\max_{x \in \mathcal{S}} \mathrm{I}(f_{\mathcal{S}}; y \mid \mathcal{D}_{n - 1})$ can be seen as an information-theoretic generalization of UnSa. In particular, for homoscedastic noise, the information-theoretic decision rule reduces (exactly!) to the classical decision rule of UnSa.

### When is Directedness Crucial?

We can spot two weaknesses of active learning and UnSa for our chess learning problem:

- Learning from every from single book in Amazon Books is very impractical.
- Learning with UnSa is not _directed_ towards learning chess, making it less suitable for choosing chess books.

There is no need to read _all_ the books in Amazon’s library. As mentioned before, some books _are more relevant_ than others. In this case, we would want to choose an “area of interest” $\mathcal{A} \subseteq \mathcal{X}$, that can guide our learning. Note that we still haven’t specified whether $\mathcal{A} \subseteq \mathcal{S}$ or not. While this difference may seem “innocent” at first, it raises some deep questions regarding the learner’s generalization. We’ll start with the easier case, where $\mathcal{A} \subseteq \mathcal{S}$, and address the more challenging case $\mathcal{A} \not\subset \mathcal{S}$ later. In the meantime, can you think why it is more challenging?

We’ll come back to these challenges in the following parts of this blog.

As we saw, UnSa is designed to learn about $f$ globally and therefore does not address the directed case, in which we only care about a specific part of $\mathcal{X}$, thus learning $f$ globally may be “wasteful”. What should we do to focus our learning in $\mathcal{A}$ more effectively? Enter Information-based Transductive Learning (ITL)[^cite paper?]. Compare $\arg\max_{x \in \mathcal{S}} \mathrm{I}(f_{\mathcal{S}}; y \mid \mathcal{D}_{n - 1})$ and $\arg\max_{x \in \mathcal{S}} \mathrm{I} (f_\mathcal{A}; y \mid \mathcal{D}_{n - 1})$. Although the two querying rules seem very similar, careful treatment of them yields very different decision rules.

We can see that ITL takes one step further than UnSa, and computes the _posterior distribution, given that our next query is in_ $\mathcal{A}$. This is in contrast to UnSa, which queries $x_n$ based only on a prior distribution, that does account for our current specific knowledge of $\mathcal{A}$. One important fact about ITL, is that in the undirected case ($\mathcal{S} \subseteq \mathcal{A}$, see figure 1. B), under homoscedastic noise, ITL reduces to UnSa. Notably, in the undirected case, prior and posterior sampling are the same(!) but in the directed case they can be drastically different — allowing the learner to focus only on those books that are related to chess. The plot below showcases how prior and posterior sampling differ in the directed case.

[]()

As we see, posterior sampling is able to cover $\mathcal{A}$ more efficiently

### Extrapolation/Generalization Directed Learning when $\mathcal{A} \not\subset \mathcal{S}$

In the previous section we saw how learners can focus on specific areas of interest _within_ $\mathcal{S}$ to learn more “personalized” tasks. An orthogonal, but possibly equally important challenge, concerns with problems that require learners to generalize and extrapolate outside of their direct training data.

Consider again our chess learning example: since you only order books from Amazon Books, and you don’t speak Russian, you cannot be exposed to novel chess openings that only exist in Russian chess literature. How learning only from English books can still help you with playing against Russian-speaking players? How much should we expect to learn about Russian openings by only reading from English chess literature?

As we saw before, to some extent, classical active learning theory cannot cover cases in which the learner _has to extrapolate outside of its accessible sample space._ Such cases often arise not only due lack of access to data or distributional shifts, but also due to safety restrictions we want to impose on the learner (like “censoring books”). Therefore, we need more general tools to handle the aforementioned problems. As discussed before, the decision rule given by $\arg\max_{x \in \mathcal{S}} \mathrm{I} (f_\mathcal{A}; y \mid \mathcal{D}_{n - 1})$ does not make any specific assumptions on the relationship between $\mathcal{A}$ and $\mathcal{S}$, and thus, it is general enough to tackle cases where generalization outside of $\mathcal{S}$ is required. But how can we quantify generalization outside of $\mathcal{S}$?

Hübotter et al. (2024) derive a novel bound on the uncertainty of points $x \in \mathcal{A}$. In particular, it can be shown that this uncertainty can be decomposed into _irreducible_ and _reducible_ parts, whereby for $x \in \mathcal{A} \setminus \mathcal{S}$, the irreducible uncertainty can be written as $\text{Var}[f(x) \mid f_{\mathcal{S}}]$. As it turns out, even if the learner is given full knowledge of $f$ at every point $x \in \mathcal{S}$, the variance of points outside of $\mathcal{S}$ will typically be non-zero. Importantly, $\text{Var}[f(x) \mid f_{\mathcal{S}}]$ is a _lower bound_ to the total uncertainty one can hope to reduce.

The good news are that learners can still gain information (and reduce uncertainty) by querying the “right” points in $\mathcal{S}$. How do you choose these points? One way is to use ITL, which, under some mild assumptions, guarantees that the reducible uncertainty will converge to an arbitrary $\epsilon > 0$.

### Closing Thoughts

Our chess learning example demonstrates two crucial aspects of intelligent learning: the ability to focus only on what’s important for the task or goal at hand (”no need to read cooking books if you care about chess”) and the ability to generalize outside of the learning domain (”learning Russian chess openings from English books”).

ITL brings a fresh perspective to deal with these challenges by using first principles of information theory to derive a decision rule that works well empirically and has convergence guarantees.

For more details about this work, check out our recent paper, and open-source python library.
