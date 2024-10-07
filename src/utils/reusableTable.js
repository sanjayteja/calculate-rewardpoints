export const ResuableTable = ({ columns, data, keyField }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row[keyField]}>
            {columns.map((column) => (
              <td key={column.key} style={column.style || {}}>
                {column.render
                  ? column.render(row[column.key], row, index)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
