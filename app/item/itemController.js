const item = {
  get: (req, res) => {
    console.log(req.params.id);
    if (req.params.id) {
      res.json({ data: req.params.id });
    } else {
      res.json({ data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
    }
  },
  post: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
  put: (req, res) => {
    res.json({ data: 'test' });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
};
module.exports = item;
