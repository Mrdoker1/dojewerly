// PriceRangeDropdown.tsx
import React, { useEffect, useState } from 'react';
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import styles from './RangeSlider.module.css';
import './BaseClass.css';

interface RangeSliderProps {
    minValue: number;
    maxValue: number;
    onChange: (minValue: number, maxValue: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ minValue, maxValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localMinValue, setLocalMinValue] = useState(minValue);
    const [localMaxValue, setLocalMaxValue] = useState(maxValue);

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
                Price: {localMinValue} - {localMaxValue}$
            </div>
            {isOpen && (
                <div className={styles.sliderContainer}>
                    <MultiRangeSlider
                        min={minValue}
                        max={maxValue}
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
                        <span>{`$${localMinValue}`}</span>
                        <span>{`$${localMaxValue}`}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RangeSlider;
