import { useTranslation } from 'react-i18next';

export default function DropDownMenu({ options, value, onChange}) {
  const { t } = useTranslation();
    return (
      <div className="mb-2">
        <select 
          value={value} 
          onChange={onChange} 
          className="w-40 px-4 py-2 bg-white dark:text-white dark:bg-dark-panel mr-5 text-xs"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </select>
      </div>
    );
  }
