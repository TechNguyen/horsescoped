const { default: mongoose } = require("mongoose");

const DetailCrawl = mongoose.Schema(
    {
        ho_ten: {
            type: String,
            require: true,
        },
        gioi_tinh: {
            type: Number,
            required: true,
        },
        ngay_sinh: {
            type: String,
            required: true,
        },
        gio_sinh: {
            type: Number,
            required: true,
        },
        phut_sinh: {
            type: Number,
            required: true,
        },
        phut_sinh: {
            type: Number,
            required: true,
        },
        bat_tu: {
            type: String,
            required: true,
        },
        tuoi: {
            type: String,
            required: true,
        },
        ngay_sinh_am_lich: {
            type: String,
            required: true,
        },
        ban_menh: {
            type: String,
            required: true,
        },
        cuc: {
            type: String,
            required: true,
        },
        la_so: {
            type: String,
            required: true,
        },
        menh: {
            type: String,
            required: true,
        },
        phu_mau: {
            type: String,
            required: true,
        },
        phuc_duc: {
            type: String,
            required: true,
        },
        dien_trach: {
            type: String,
            required: true,
        },
        quan_loc: {
            type: String,
            required: true,
        },
        no_boc: {
            type: String,
            required: true,
        },
        thien_di: {
            type: String,
            required: true,
        },
        tat_ach: {
            type: String,
            required: true,
        },
        tai_bach: {
            type: String,
            required: true,
        },
        tu_tuc: {
            type: String,
            required: true,
        },
        phu_the: {
            type: String,
            required: true,
        },
        huynh_de: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("DetailCrawler", DetailCrawl);
