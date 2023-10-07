// PriceRangeDropdown.tsx
import React, { useEffect, useState } from 'react';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import styles from './RangeSlider.module.css';
import './BaseClass.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';

interface RangeSliderProps {
    minValue: number;
    maxValue: number;
    onChange: (minValue: number, maxValue: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ minValue, maxValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localMinValue, setLocalMinValue] = useState(minValue);
    const [localMaxValue, setLocalMaxValue] = useState(maxValue);
    const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
    const { t } = useTranslation();

    useEffect(() => {
        setLocalMinValue(minValue);
        setLocalMaxValue(maxValue);
    }, [minValue, maxValue]);

    const handleSliderChange = (e: ChangeResult) => {
        setLocalMinValue(e.minValue);
        setLocalMaxValue(e.maxValue);
    };

    const handleSliderRelease = (e: ChangeResult) => {
        onChange(e.minValue, e.maxValue);
        setIsOpen(false);  // Закрыть слайдер после выбора
    };

    return (
        <div className={styles.container}>
            <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
                {`${t('Price')}: ${localMinValue} - ${localMaxValue} ${currentCurrency}`}
            </div>
            {isOpen && (
                <div className={styles.sliderContainer}>
                    <MultiRangeSlider
                        min={0}
                        max={1000}
                        step={5}
                        minValue={localMinValue}
                        maxValue={localMaxValue}
                        onInput={handleSliderChange}
                        onChange={handleSliderRelease}
                        ruler={false} // Убираем деления
                        label={false} // Убираем метки
                        subSteps={false} // Убираем мелкие деления
                    />
                    <div className={styles.priceDisplay}>
                        <span>{`${localMinValue} ${currentCurrency}`}</span>
                        <span>{`${localMaxValue} ${currentCurrency}`}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RangeSlider;
