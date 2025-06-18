import type { JokeType } from '~/types/joke';

export function useJokeUtils() {
  const getChipVariant = (
    type: JokeType
  ): 'default' | 'primary' | 'success' | 'danger' | 'attention' => {
    switch (type) {
      case 'programming':
        return 'primary';
      case 'knock-knock':
        return 'attention';
      case 'general':
      default:
        return 'default';
    }
  };

  return {
    getChipVariant,
  };
}
