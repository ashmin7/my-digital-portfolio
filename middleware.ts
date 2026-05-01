// Root middleware intentionally left as a no-op.
// This prevents edge runtime issues on the public portfolio site.
export default function middleware() {
  return;
}

export const config = {
  matcher: [],
};
