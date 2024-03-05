const { text } = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify") // converts id in the url to title. makes url pretty
const anchorImages = require("./anchorImages");

const sermonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true
        },

        series: {
            type: String
        },

        image: {
            url: String,
            filename: String
        },
        reading: {
            type: String
        },
        date: {
            type: String
        },
        preacher: {
            type: String
        },
        sermon: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        slug: {
            type: String,
            unique: true
        }
        // Putting slug in the db so that we dont have 
        // to calculate the process every single time an article is being accessed
        // we calculate once save in the db and don't have to worry about it again
    });

// function is going to run right before validation of article is done (pre) every time CRUD is done
sermonSchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

// for search
sermonSchema.index({ title: 'text', preacher: "text", theme: 'text' });

module.exports = mongoose.model("sermon", sermonSchema);