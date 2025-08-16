export default function OpinionListItem({ rate, description, className, productName, children }) {
    return (
        <div className={`${className} flex flex-col ml-2 mt-1`}>
            <div className='flex justify-between mb-2'>
                <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                        <img
                            key={index}
                            src={index < rate ? "/star-icon-full.svg" : "/star-icon-empty.svg"}
                            className='h-[14px] dark:invert'
                            alt="star"
                        />
                    ))}
                </div>
                 <div className="text-[12px] font-medium mr-2">{productName}</div>
            </div>
            <div className="text-[12px] mr-2">{description}</div>
            {children}
        </div>
    );
}