export default function SplitedWidgetContainer({ title, className, children }) {
  return (
    <section className={`${className} shadow-md p-2 rounded-md dark:bg-dark-panel bg-white dark:text-white grid grid-cols-2 grid-rows-3 grid-flow-col relative`}>
      <div className="flex flex-col">
        <div className="w-[calc(100%-10px)] px-2 border-b-[0.5px] border-gray-300">
          <h2 className="text-xl">{title}</h2>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 w-[1px] mt-[5px] h-[calc(100%-10px)] bg-gray-300"></div>
      {children}
    </section>
  );
}
