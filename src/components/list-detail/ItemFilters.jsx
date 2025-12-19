import Button from '../common/Button';
import { useTranslation } from 'react-i18next';

export default function ItemFilters({ filter, setFilter }) {
  const { t } = useTranslation();
  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
      <Button variant={filter === 'all' ? 'primary' : ''} onClick={() => setFilter('all')}>
        {t('all')}
      </Button>
      <Button variant={filter === 'buy' ? 'primary' : ''} onClick={() => setFilter('buy')}>
        {t('buy')}
      </Button>
      <Button variant={filter === 'resolved' ? 'primary' : ''} onClick={() => setFilter('resolved')}>
        {t('resolved')}
      </Button>
    </div>
  );
}