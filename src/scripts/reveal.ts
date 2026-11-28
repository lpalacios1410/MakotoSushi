/**
 * Marca los elementos `[data-reveal]` con `.is-revealed` la primera vez que
 * entran en el viewport y dispara el evento `revealed` en ellos. Los hermanos
 * se revelan uno tras otro según su índice `--stagger`.
 *
 * La clase `js` del `<html>` protege los estados ocultos: sin JavaScript la
 * página se ve completa.
 */
export function revealOnScroll(root: ParentNode = document): void {
  if (typeof IntersectionObserver === 'undefined') {
    for (const node of root.querySelectorAll('[data-reveal]')) {
      node.classList.add('is-revealed');
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        entry.target.dispatchEvent(new Event('revealed'));
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  const seen = new Map<ParentNode, number>();
  for (const node of root.querySelectorAll('[data-reveal]')) {
    const parent: ParentNode = node.parentElement ?? root;
    const index = seen.get(parent) ?? 0;
    seen.set(parent, index + 1);
    (node as HTMLElement).style.setProperty('--stagger', String(Math.min(index, 6)));
    observer.observe(node);
  }
}

/** Fuente aleatoria determinista, para que los adornos caigan igual en cada render. */
export function seeded(seed: number): () => number {
  let state = seed % 2147483647 || 1;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}
