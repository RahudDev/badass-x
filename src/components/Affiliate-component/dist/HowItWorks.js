"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
require("./HowItWorks.css");
var UserPlus = fa_1.FaUserPlus;
var LinkSign = fa_1.FaLink;
var DollarSign = fa_1.FaDollarSign;
var steps = [
    {
        title: "Create Your Free Account",
        icon: react_1["default"].createElement(UserPlus, { className: "text-primary mb-3 icon-size" }),
        text: "Sign up to Optimisticash in under 60 seconds — no fees, no hassle."
    },
    {
        title: "Share & Refer",
        icon: react_1["default"].createElement(LinkSign, { className: "text-primary mb-3 icon-size" }),
        text: "Get your custom referral link and share it with friends, followers, or anyone online."
    },
    {
        title: "Earn Every Time",
        icon: react_1["default"].createElement(DollarSign, { className: "text-primary mb-3 icon-size" }),
        text: "Earn 20% commission when your referrals complete offers like surveys, games, and more."
    },
];
var HowItWorks = function () { return (react_1["default"].createElement("section", { className: "py-5 text-center" },
    react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("h2", { className: "fw-bold mb-5 section-aff-how" }, "How It Works"),
        react_1["default"].createElement("div", { className: "row g-4" }, steps.map(function (step, i) { return (react_1["default"].createElement("div", { key: i, className: "col-md-4" },
            react_1["default"].createElement("div", { className: "p-4 border rounded-4 shadow-sm h-100" },
                step.icon,
                react_1["default"].createElement("h5", { className: "fw-semibold mb-2 section-aff-how" }, step.title),
                react_1["default"].createElement("p", { className: "text-success" }, step.text)))); }))),
    react_1["default"].createElement("style", null, "\n      .icon-size {\n        font-size: 3rem;\n      }\n    "))); };
exports["default"] = HowItWorks;
