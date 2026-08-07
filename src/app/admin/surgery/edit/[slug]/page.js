// Dynamic route: /admin/surgery/edit/[slug]
// Re-exports the same edit page component -- the component reads the slug
// from useParams() (path) or useSearchParams() (query) automatically.
export { default } from '../page';