import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import icons from '../../assets/icons/icons';

export interface DropdownProps {
    /** Массив опций для дропдауна */
    options: string[];
    /** Вызывается при изменении значения дропдауна */
    onChange?: (value: string) => void;
    /** Значение дропдауна */
    value?: string;
    /** Дефолтное значение дропдауна */
    placeholder?: string;
    /** Заголовок/лейбл дропдауна */
    label?: string;
    /** Есть ли ошибка в дропдауне */
    hasError?: boolean;
    /** Сообщение, которое будет отображаться под дропдауном */
    message?: string;
    /** Иконка, отображаемая справа от дропдауна */
    iconRight?: keyof typeof icons;
    /** Если `true`, дропдаун будет недоступен для ввода */
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, label, hasError, message, iconRight, placeholder, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);  // <-- Уточняем тип здесь

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {  // <-- Уточняем тип здесь
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {  // <-- Приведение типа для event.target
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const IconRight = isOpen ? icons['arrowUp'] : (iconRight ? icons[iconRight] : icons['arrowDown']);

    const handleDropdownChange = (selectedOption: string) => {
        setSelectedValue(selectedOption);
        setIsOpen(false);
        if (onChange) {
            onChange(selectedOption);
        }
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            {label && <div className={styles.label}>{label}</div>}
            <div className={`${styles.dropdown} ${hasError ? styles.error : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedValue || placeholder}</span>
                {IconRight && <IconRight className={styles.iconRight} />}
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option) => (
                        <div key={option} className={styles.option} onClick={() => handleDropdownChange(option)}>{option}</div>
                    ))}
                </div>
            )}
            <div className={`${styles.message} ${hasError ? styles.errorText : ''}`}>{message}</div>
        </div>
    );
};

export default Dropdown;