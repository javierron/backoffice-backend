const APIHandler = handlerFn => async (req, res) => {
  const body = req.body || {};
  const params = req.params || {};
  const query = req.query || {};
  const session = req.user;

  try {
    const handlerRes = await handlerFn({
      ...query,
      ...params,
      ...body,
      ...(session && { session })
    });
    const { status, resp } = handlerRes;

    res.status(status).send(resp);
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
};

module.exports = {
  APIHandler
};
