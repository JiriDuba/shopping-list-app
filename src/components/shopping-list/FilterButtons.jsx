import { useTranslation } from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FilterButtons({ filter, setFilter }) {
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={(e, next) => next && setFilter(next)}
      sx={{ mb: 3 }}
    >
      <ToggleButton value="all">{t('filter_all')}</ToggleButton>
      <ToggleButton value="active">{t('filter_active')}</ToggleButton>
      <ToggleButton value="archived">{t('filter_archived')}</ToggleButton>
    </ToggleButtonGroup>
  );
}