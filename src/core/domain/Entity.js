class Entity {
    constructor(
        createBy,
        createDate,
        createId,
        updateBy,
        updateDate,
        updateId,
        deletedBy,
        deletedDate,
        deleted,
        deletedId,
    ) {
        this.createBy = createBy;
        this.createDate = createDate;
        this.updateBy = updateBy;
        this.updateDate = updateDate;
        this.deletedBy = deletedBy;
        this.deletedDate = deletedDate;
        this.deleted = deleted;
        this.createId = createId;
        this.updateId = updateId;
        this.deletedId = deletedId;
    }

    getCreateBy() {
        return this.createBy;
    }

    getCreateDate() {
        return this.createDate;
    }

    getUpdateBy() {
        return this.updateBy;
    }
}
