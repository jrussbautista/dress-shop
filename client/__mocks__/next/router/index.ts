export function useRouter() {
  return {
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
  };
}

const router = () => {
  return {
    push: jest.fn(),
  };
};

export default router;
