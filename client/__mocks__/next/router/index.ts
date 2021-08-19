export function useRouter() {
  return {
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
  };
}

export default {
  push: jest.fn(),
};
