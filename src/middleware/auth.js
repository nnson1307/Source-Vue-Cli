export default function auth({ next, router }) {
  if (!$cookies.get('user')) {
    return router.push({ name: 'login' })
  }

  return next()
}
