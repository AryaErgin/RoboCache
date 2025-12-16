import styles from './FilterBar.module.css';
import FormInput from './FormInput';
import Button from './Button';
import type { CacheFilters } from '../utils/types';

interface FilterBarProps {
  filters: CacheFilters;
  onChange: (next: CacheFilters) => void;
  onReset: () => void;
}

function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  const update = (key: keyof CacheFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={styles.bar}>
      <FormInput label="Location" value={filters.location} placeholder="City or coordinates" onChange={(e) => update('location', e.target.value)} />
      <FormInput label="Category" value={filters.category} placeholder="Electronics, mechanical..." onChange={(e) => update('category', e.target.value)} />
      <div className={styles.actions}>
        <Button variant="secondary" type="button">Search</Button>
        <Button variant="ghost" type="button" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}

export default FilterBar;
