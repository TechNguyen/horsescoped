const { default: mongoose } = require("mongoose");

const DetailCrawl = mongoose.Schema(
    {
        ho_ten: {
            type: String,
        },
        gioi_tinh: {
            type: Number,
        },
        ngay_sinh: {
            type: String,
        },
        gio_sinh: {
            type: Number,
        },
        phut_sinh: {
            type: Number,
        },
        phut_sinh: {
            type: Number,
        },
        bat_tu: {
            type: String,
        },
        tuoi: {
            type: String,
        },
        ngay_sinh_am_lich: {
            type: String,
        },
        ban_menh: {
            type: String,
        },
        cuc: {
            type: String,
        },
        la_so: {
            type: String,
        },
        menh: {
            type: String,
        },
        phu_mau: {
            type: String,
        },
        phuc_duc: {
            type: String,
        },
        dien_trach: {
            type: String,
        },
        quan_loc: {
            type: String,
        },
        no_boc: {
            type: String,
        },
        thien_di: {
            type: String,
        },
        tat_ach: {
            type: String,
        },
        tai_bach: {
            type: String,
        },
        tu_tuc: {
            type: String,
        },
        phu_the: {
            type: String,
        },
        huynh_de: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("DetailCrawler", DetailCrawl);
