import { useTranslation } from "react-i18next";
import OutlineButton from "../OutlineButton";

export default function Table({ columns, data }) {
  const { t } = useTranslation();

  return (
    <table className="min-w-full text-xs border rounded">
      <thead>
        <tr className="text-center divide-x divide-y">
          {columns.map((column, index) => (
            <th key={index} className="px-6 py-3 tracking-wider">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="text-center divide-x divide-y">
            {Object.values(item).map((value, i) => (
              <td key={i} className="px-6 py-2 whitespace-nowrap">
                {value}
              </td>
            ))}
            <td className="px-6 py-2 whitespace-nowrap border">
              <OutlineButton className="text-purple">
                {t("details")}
              </OutlineButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
