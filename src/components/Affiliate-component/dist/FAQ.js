"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./FAQ.css");
var faqs = [
    {
        q: "How do I join the Optimisticash affiliate program?",
        a: "It's easy! Just sign up on our affiliate page and get instant access to your unique referral link."
    },
    {
        q: "How and when do I get paid?",
        a: "We send out payments every week via PayPal, Bitcoin, or other crypto wallets of your choice."
    },
    {
        q: "Is there a minimum payout threshold?",
        a: "Yes, once you reach just $1 in earnings, you can request a payout anytime."
    },
    {
        q: "How can I track my referrals and earnings?",
        a: "You’ll get a personalized affiliate dashboard with real-time tracking, clicks, sign-ups, and commission updates."
    },
    {
        q: "What types of users convert best?",
        a: "Users interested in earning from surveys, playing games, and watching videos are our top converters. Focus on online hustle communities!"
    },
];
var FAQ = function () {
    var _a = react_1.useState(null), openIndex = _a[0], setOpenIndex = _a[1];
    return (react_1["default"].createElement("section", { className: "py-5 " },
        react_1["default"].createElement("div", { className: "container " },
            react_1["default"].createElement("h2", { className: "fw-bold section-aff-h2 text-center mb-4" }, "Frequently Asked Questions"),
            react_1["default"].createElement("div", { className: "accordion", id: "faqAccordion" }, faqs.map(function (faq, index) { return (react_1["default"].createElement("div", { key: index, className: "accordion-item  mb-2 rounded" },
                react_1["default"].createElement("h2", { className: "accordion-header" },
                    react_1["default"].createElement("button", { className: "accordion-button bg-secondary text-white " + (openIndex === index ? '' : 'collapsed'), type: "button", onClick: function () { return setOpenIndex(openIndex === index ? null : index); } }, faq.q)),
                react_1["default"].createElement("div", { className: "accordion-collapse collapse bg-secondary text-white " + (openIndex === index ? 'show' : '') },
                    react_1["default"].createElement("div", { className: "accordion-body  " }, faq.a)))); })))));
};
exports["default"] = FAQ;
