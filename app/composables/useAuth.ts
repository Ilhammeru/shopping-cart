import type { LoginPayloadDto } from "~/types/login-payload";
import type { RegisterPayloadDto } from "~/types/register-payload";

export const useAuth = () => {
  const user = useState('user', () => null);
  const router = useRouter();

  const login = async (credentials: LoginPayloadDto) => {
    try {
      const response = await $fetch('/api/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include'
      });

      user.value = response.user;
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (payload: RegisterPayloadDto) => {
    try {
      const response = await $fetch(`api/`)
    } catch (error) {
      
    }
  }

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
      const response: any = await $fetch('/api/auth/me', {
        credentials: 'include'
      });
      user.value = response.user;
    } catch (error) {
      user.value = null;
    }
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    login,
    logout,
    fetchUser,
    isAuthenticated
  };
};
