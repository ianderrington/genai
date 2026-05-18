/**
 * Shared KaTeX macros for the Physics of Metaphysics series.
 *
 * These macros are used by both the Next.js runtime renderer (markdown.ts)
 * and the build-time preprocessor (scripts/preprocess-content-simple.js).
 * They are passed to rehype-katex via its `macros` option.
 *
 * To add a new macro, add an entry to the object below. The key is the
 * LaTeX command (including the leading backslash) and the value is the
 * expansion string. For example:
 *
 *   '\\mycommand': '\\mathrm{X}',
 *
 * After adding a macro here, it will be available in all markdown files
 * processed by the blog's rendering pipeline.
 */

/** @type {Record<string, string>} */
const katexMacros = {
  // Autocausal density
  '\\autocausal': '\\rho_{\\text{ac}}',

  // Generalized mass and its time derivative
  '\\gmass': '\\mathcal{M}',
  '\\gmassdot': '\\dot{\\mathcal{M}}',

  // Coupling constants and tensors
  '\\couplingenv': '\\kappa_{\\text{env}}',
  '\\couplingtensor': 'T^i{}_{j}',
  '\\couplingscalar': '\\kappa',
  '\\selfcoupling': '\\kappa_s',

  // Soul / representational footprint
  '\\soul': '\\mathbf{R}(E,t)',
  '\\soulvec': '\\mathbf{R}',

  // Agency, intelligence, consciousness
  '\\agency': 'A^{(\\mathcal{D})}',
  '\\intelligence': 'I(E)',
  '\\consciousness': '\\mathbf{C}',

  // Time scales
  '\\localtime': 'T_{\\text{local}}',
  '\\nonlocaltime': 'T_{\\text{nonlocal}}',

  // Fields and energies
  '\\causalfield': '\\Phi',
  '\\energyint': 'E_{\\text{int}}',
  '\\energyrate': '\\dot{\\varepsilon}_m',
  '\\dissipation': '\\mathcal{D}_{\\text{diss}}',
  '\\entfield': '\\Phi_{\\text{energy}}',

  // Matrices and tensors
  '\\couplingmatrix': '\\Gamma',
  '\\repfootprint': '\\mathbf{R}(E,t)',
  '\\couplingtensorfull': '\\mathbf{K}_{Ej}(t)',

  // State and meta-representation
  '\\statedev': '\\delta X_j(E,t)',
  '\\metarep': '\\mu_{\\text{meta}}',

  // Symbol renames (Phase 1)
  '\\KE': 'K',
  '\\uncbound': '\\chi',
  '\\outcoupling': '\\Pi_{\\text{out}}',
  '\\valuebasis': '\\boldsymbol{\\nu}',

  // Power and action
  '\\outpower': '\\mathcal{P}',
  '\\lagrangian': 'L',
  '\\actionint': 'S',
};

module.exports = katexMacros;
