const APIHandler = handlerFn => async (req, res) => {
  const body = req.body || {};
  const params = req.params || {};
  const query = req.query || {};

  try {
    const handlerRes = await handlerFn({
      ...query,
      ...params,
      ...body
    });
    const { status, resp } = handlerRes;

    res.status(status).send(resp);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  APIHandler
};
