const getInfoLog = (req) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[INFO] ${timestamp} - ${method} ${url}`);
};

const getErrorLog = (error) => {
  const timestamp = new Date().toISOString();
  console.error(`[ERROR] ${timestamp} - ${error.name}: ${error.message}`);
};

const getProcessLog = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[PROCESS] ${timestamp} - ${message}`);
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};
