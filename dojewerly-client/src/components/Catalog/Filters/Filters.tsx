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
import { useLocation, useNavigate } from 'react-router-dom';
import { initialState } from '../../../app/reducers/catalogSlice';
import RangeSlider from '../../RangeSlider/RangeSlider';

const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const criteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const filters = useSelector((state: RootState) => state.catalog);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (!criteria) return;
        searchParams.forEach((value, key) => {
          if (key in initialState) {
            switch (key) {
              case 'materials':
                if (criteria.materials.includes(value) || value === 'Any material') {
                  dispatch(setFilter({ name: key as keyof CatalogState, value }));
                }
                break;
              case 'gender':
                if (criteria.genders.includes(value) || value === 'Any gender') {
                  dispatch(setFilter({ name: key as keyof CatalogState, value }));
                }
                break;
              case 'type':
                if (criteria.types.includes(value) || value === 'Any type') {
                  dispatch(setFilter({ name: key as keyof CatalogState, value }));
                }
                break;
              default:
                dispatch(setFilter({ name: key as keyof CatalogState, value }));
            }
          }
        });
    }, [dispatch, location.search, criteria]);

    useEffect(() => {
        if (!criteria) {
            dispatch(fetchCatalogCriteria());
        }
    }, [criteria, dispatch]);

    const handleFilterChange = (name: keyof CatalogState, value: string | undefined) => {
        console.log("Filter changed:", name, value);
        if (value === 'Any material' || value === 'Any gender' || value === 'Any type') {
            value = undefined; 
        }
        dispatch(setFilter({ name: name as string, value }));
    
        const newSearchParams = new URLSearchParams(location.search);
        if (value) {
            newSearchParams.set(String(name), value.toString());
        } else {
            newSearchParams.delete(String(name));
        }
        navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        navigate(location.pathname, { replace: true }); // Это сбросит query параметры в URL
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
                    onChange={(value) => handleFilterChange('material', value)}
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
                <RangeSlider 
                    minValue={filters.minPrice || 0}
                    maxValue={filters.maxPrice || 1000}
                    onChange={(minValue, maxValue) => {
                        handleFilterChange('minPrice', minValue.toString());
                        handleFilterChange('maxPrice', maxValue.toString());
                    }}
                />
                {Object.values(filters).some(filter => filter) && (
                    <div>
                        <Button text="Clear" variant='secondary' size='small' onClick={handleResetFilters} />
                    </div>
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
