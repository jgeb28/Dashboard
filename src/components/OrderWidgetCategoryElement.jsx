export default function OrderWidgetCategoryElement ({name, value}) {
    return (
        <div className='w-[30%] h-[80px] rounded-[15px] drop-shadow-lg bg-purple-800 flex flex-col items-center justify-center'>
            <div className="text-white text-lg">{name}</div>
            <div className="text-white text-2xl">{value}</div>
        </div>
    );
}