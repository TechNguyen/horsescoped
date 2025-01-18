class ApiFeatures {
    constructor(query, querystring) {
        this.query = query;
        this.querystring = querystring;
    }
    sort() {
        if (this.querystring.sort) {
            const sortBy = this.querystring.sort.split(",");
            this.query = this.query.sort(sortBy);
        }
        return this;
    }
    paginate() {
        const pagination = new Pagination(
            this.querystring.page,
            this.querystring.limit,
        );
        this.query = this.query
            .skip(pagination.getSkip())
            .limit(pagination.getLimit());
        return this;
    }
    limitedFields() {
        if (this.querystring.fields) {
            const fields = this.querystring.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }
        return this;
    }
}
