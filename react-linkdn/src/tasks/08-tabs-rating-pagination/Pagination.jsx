import getPageRange from './getPageRange';

export default function Pagination({ page, totalPages, onPageChange, siblingCount = 1, ...rest }) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages, siblingCount);

  return (
    <nav className="pager" aria-label="Pagination" {...rest}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={'dots' + i} className="pager-dots">…</span>
        ) : (
          <button
            key={p}
            className={p === page ? 'current' : ''}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </nav>
  );
}
