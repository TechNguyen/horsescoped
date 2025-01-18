class Pagination {
    constructor(
        pageIndex = 1,
        pageSize = 10,
        totalItems = 0,
        totalPages = 0,
        items = [],
    ) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalItems = 0;
        this.totalPages = 0;
        this.items = [];
    }
    getSkip() {
        return (this.pageIndex - 1) * this.pageSize;
    }
    getLimit() {
        return this.pageSize;
    }
    getPage() {
        return this.pageIndex;
    }
    getTotalItems() {
        return this.totalItems;
    }
    getTotalPages() {
        return Math.ceil(this.totalItems / this.pageSize);
    }
    setTotalItems(totalItems) {
        this.totalItems = totalItems;
    }
    getItems() {
        return this.items;
    }
    setItems(items) {
        this.items = items;
    }
}

module.exports = Pagination;
