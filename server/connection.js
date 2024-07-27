const sql = require("mssql/msnodesqlv8");

const config = {
  driver: "msnodesqlv8",
  connectionString:
    process.env.DB_CONNECTION_STRING,
};

const executeQuery = (query) => {
  if (query) {
    return sql
      .connect(config)
      .then(() => {
        console.log("Connected to SQL Server");
        return new sql.Request().query(query);
      })
      .then((recordset) => {
        console.log("Query executed successfully");
        return recordset;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
};

module.exports = executeQuery;
