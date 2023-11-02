import { useTypedSelector } from '@/hooks/useTypedSelecotor';

export const useAuth = () => useTypedSelector(state => state.user);
