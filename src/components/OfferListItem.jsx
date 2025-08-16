import { useTranslation } from 'react-i18next';

export default function OfferListItem({ name, units, revenue, viewsNumber, image, showViews }) {
    const { t } = useTranslation();
    return (
        <div className='flex h-22'>
            <div className="overflow-hidden">
                <img src={image} className='bg-gray-400 h-20 w-20 mx-3 mt-2' />
            </div>
            <div className='flex flex-col mt-2'>
                <div className='text-lg mb-1 truncate max-w-[250px]'>{name}</div>
                <div>{t('offerItem.units')} {units}</div>
                {showViews ? (
                    <div>{t('offerItem.numberOfViews')} {viewsNumber}</div>
                ) : (
                    <div>{t('offerItem.revenue')} {revenue}</div>
                )}
            </div>
        </div>
    );
}