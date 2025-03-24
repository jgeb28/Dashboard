export default function WidgetContainer({ title, className, children }) {
  return (
    <section
      className={`${className} shadow-md p-2 rounded-md dark:bg-dark-panel bg-white dark:text-white`}
    >
      <div
        className={`px-2 ${title ? "border-b-[0.5px] border-gray-300" : ""} `}
      >
        <h2 className="text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
