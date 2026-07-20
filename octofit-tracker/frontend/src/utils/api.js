export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}
