import type { LoginPayloadDto } from "~/types/login-payload";
import type { RegisterPayloadDto } from "~/types/register-payload";

export const useAuth = () => {
  const user = useState('user', () => null);
  const router = useRouter();

  const login = async (credentials: LoginPayloadDto) => {
    try {
      const data = await $fetch('/api/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include'
      });

      user.value = data.token;
      return data;
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  const register = async (payload: RegisterPayloadDto) => {
    try {
      const response = await $fetch(`/api/register`, {
        method: 'POST',
        body: payload,
        credentials: 'include'
      });

      user.value = (response as any).user;
      return response;
    } catch (error) {
      console.log('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await $fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      user.value = null;
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response: any = await useFetch('/api/auth/me', {
        credentials: 'include'
      });
      user.value = response.user;
    } catch (error) {
      user.value = null;
      console.log('[err', error);
    }
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    register,
    login,
    logout,
    fetchUser,
    isAuthenticated
  };
};
