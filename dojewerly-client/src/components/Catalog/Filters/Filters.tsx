import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button/Button';
import { fetchCatalogCriteria } from '../../../app/reducers/catalogCriteriaSlice';
import { setFilter, resetFilters } from '../../../app/reducers/catalogSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { CatalogState } from '../../../app/reducers/catalogSlice';
import styles from './Filters.module.css'
import SearchInput from '../../Input/SearchInput/SearchInput';
import FilterDropdown from '../../Dropdown/FilterDropdown/FilterDropdown';


const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const criteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const filters = useSelector((state: RootState) => state.catalog);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!criteria) {
            dispatch(fetchCatalogCriteria());
        }
    }, [criteria, dispatch]);

    const handleFilterChange = (name: keyof CatalogState, value: string | undefined) => {
        if (value === 'Any material' || value === 'Any gender' || value === 'Any type') {
            value = undefined; // установите значение в пустую строку, если это одна из опций по умолчанию
        }
        dispatch(setFilter({ name: name as string, value }));
    }; 

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    if (!criteria) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <FilterDropdown 
                    options={[
                    { label: 'Any material', value: 'Any material' },
                    ...criteria.materials.map((material: string) => ({ label: material, value: material }))
                    ]}
                    value={filters.material || 'Any material'}
                    onChange={(value) => handleFilterChange('materials', value)}
                />
                <FilterDropdown 
                    options={[
                    { label: 'Any gender', value: 'Any gender' },
                    ...criteria.genders.map((gender: string) => ({ label: gender, value: gender }))
                    ]}
                    value={filters.gender || 'Any gender'}
                    onChange={(value) => handleFilterChange('gender', value)}
                />
                <FilterDropdown 
                    options={[
                    { label: 'Any type', value: 'Any type' },
                    ...criteria.types.map((type: string) => ({ label: type, value: type }))
                    ]}
                    value={filters.type || 'Any type'}
                    onChange={(value) => handleFilterChange('type', value)}
                />
                <div className="price-range">
                    <input 
                        type="number" 
                        placeholder="Min Price"
                        value={filters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <span> - </span>
                    <input 
                        type="number" 
                        placeholder="Max Price"
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                </div>
                {Object.values(filters).some(filter => filter) && (
                    <Button text="Reset" variant='secondary' size='small' onClick={handleResetFilters} />
                )}
            </div>
            <SearchInput
                ref={inputRef}
                value={filters.q || ''}
                iconRightClick={() => handleFilterChange('q', inputRef.current?.value || '')}
            />
        </div>
    );
                
};

export default Filters;
