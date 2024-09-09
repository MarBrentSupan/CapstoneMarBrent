export default function TableComponents({
    columns = [], 
    data = [], 
    renderActions,  // No default value here
}) {
    const hasActions = typeof renderActions === 'function'; // Check if renderActions is a function

    return (
        <table className="min-w-full table-auto border-gray-800 text-left text-gray-700 text-xs">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-4 py-2 border-b">
                            {column.header}
                        </th>
                    ))}
                    {hasActions && (
                        <th className="px-4 py-2 border-b">Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="px-4 py-2 border-b">
                                {column.render
                                    ? column.render(rowData)
                                    : rowData[column.key]}
                            </td>
                        ))}
                        {hasActions && (
                            <td className="px-4 py-2 border-b text-xs">
                                {renderActions(rowData)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}