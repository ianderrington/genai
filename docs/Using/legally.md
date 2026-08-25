# Legal Considerations for Using GenAI

## Copyright and AI-Generated Output

In the US, the Copyright Office and federal courts require human authorship for a work to be copyrightable. A work created entirely by an AI system, with no meaningful human creative input, is not eligible for copyright registration — the Supreme Court declined to disturb this position in March 2026, leaving the human-authorship requirement in place. Mixed works (human-written text alongside AI-generated images, for example) can still be registered, but only the human-authored elements, and the specific human vs. AI-generated portions, need to be disclosed in the application.

Practical implication: if copyright protection over your output matters to your use case, document and preserve evidence of your own creative contribution, editing, and selection, since that's what protection actually attaches to.

## API Terms of Service

Output ownership and liability terms vary by provider and change over time, so check the current terms for whichever model you're actually using rather than assuming parity across providers:

- Major providers generally assign output rights to the user via a contractual grant (not a copyright claim, since the provider doesn't hold copyright in AI output either).
- Indemnification against third-party IP infringement claims over model output varies by provider and by tier — some offer it as standard, others only to enterprise customers, and terms change frequently enough that the provider's current published terms are the only reliable source.
- Data-training opt-outs also vary: check whether your inputs are used for future model training by default, or only with explicit opt-in.

## Adjacent: The Legal Status of AI Systems Themselves

Separate from the practical concerns above, there's an active legal-theory debate about whether AI systems should hold legal rights (to contract, hold property, bring claims) as a mechanism for promoting long-run human safety, by the same logic that extending certain rights to corporations enables mutually-beneficial economic interdependence rather than zero-sum conflict. This is a research/policy question, not current law anywhere, but worth knowing as the frontier of where this space may be heading.

!!! note "[AI Rights for Human Safety](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4913167)"
    "This Article begins to lay those new legal foundations. It is the first to think systematically about the dynamics of strategic competition between humans and misaligned AGI. The Article begins by showing, using formal game-theoretic models, that, by default, humans and AIs will be trapped in a prisoner's dilemma. Both parties' dominant strategy will be to permanently disempower or destroy the other, even though the costs of such conflict would be high.

    The Article then argues that a surprising legal intervention could transform the game theoretic equilibrium and avoid conflict: AI rights. Not just any AI rights would promote human safety. Granting AIs the right not to be needlessly harmed—as humans have granted to certain non-human animals—would, for example, have little effect. Instead, to promote human safety, AIs should be given those basic private law rights—to make contracts, hold property, and bring tort claims—that law already extends to non-human corporations. Granting AIs these economic rights would enable long-run, small-scale, mutually-beneficial transactions between humans and AIs. This would, we show, facilitate a peaceful strategic equilibrium between humans and AIs for the same reasons economic interdependence tends to promote peace in international relations."
