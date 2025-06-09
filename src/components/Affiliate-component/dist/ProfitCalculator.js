"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./ProfitCalculator.css");
var ProfitCalculator = function () {
    var _a = react_1.useState('10'), value = _a[0], setValue = _a[1]; // default number of offers completed
    var offers = parseFloat(value);
    var profit20 = isNaN(offers) ? 0 : offers * 0.20;
    return (react_1["default"].createElement("section", { className: "py-5 text-center" },
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("h2", { className: "fw-bold mb-4 section-aff-calculate " }, "Calculate Your Potential Earnings"),
            react_1["default"].createElement("p", { className: "lead mb-4" }, "See how much you can earn when users complete offers like surveys, games, and more on Optimisticash."),
            react_1["default"].createElement("div", { className: "mx-auto", style: { maxWidth: 400 } },
                react_1["default"].createElement("label", { htmlFor: "offers", className: "form-label fw-semibold" }, "Number of Offers Completed by Your Referrals"),
                react_1["default"].createElement("div", { className: "input-group mb-3 shadow-sm" },
                    react_1["default"].createElement("span", { className: "input-group-text bg-primary text-white fw-semibold" }, "#"),
                    react_1["default"].createElement("input", { id: "offers", type: "text", className: "form-control", value: value, onChange: function (e) {
                            var val = e.target.value;
                            if (/^\d*\.?\d{0,2}$/.test(val) || val === '') {
                                setValue(val);
                            }
                        }, placeholder: "e.g. 25" })),
                react_1["default"].createElement("div", { className: "mt-4" },
                    react_1["default"].createElement("p", { className: "fs-5" },
                        react_1["default"].createElement("span", { className: "fw-semibold text-dark" }, "At 20% commission:"),
                        ' ',
                        react_1["default"].createElement("span", { className: "fw-bold text-success" },
                            "$",
                            profit20.toFixed(2))))))));
};
exports["default"] = ProfitCalculator;
