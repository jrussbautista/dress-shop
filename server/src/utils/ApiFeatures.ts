class APIFeatures {
  query: any;
  queryString: any;
  total: number;
  model: any;

  constructor(query: any, model: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
    this.total = 0;
    this.model = model;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // keyword
    if (this.queryString.keyword) {
      queryObj = { ...queryObj, $text: { $search: this.queryString.keyword } };
    }

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    this.model = this.model.find(JSON.parse(queryStr));

    return this;
  }

  count() {
    this.total = this.model.countDocuments();
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
