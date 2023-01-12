// Response Handler For Get Response In Any File...
global.sendRes = function (res, msg, status, statusCode, data, token) {
    const meta = { msg, status };
    if (!data) {
      return res.status(statusCode).json({ meta });
    }
    return res.status(statusCode).json({ meta, data, token });
  };