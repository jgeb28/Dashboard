export default function OpinionListItem({ rate, description, className, children }) {
    return (
        <div className={`${className} flex flex-col ml-2 mt-1`}>
            <div className='flex mb-2'>
                {Array.from({ length: 5 }, (_, index) => (
                    <img
                        key={index}
                        src={index < rate ? "/star-icon-full.svg" : "/star-icon-empty.svg"}
                        className='h-[14px] dark:invert'
                        alt="star"
                    />
                ))}
            </div>
            <div className="text-[12px]">{description}</div>
            {children}
        </div>
    );
}