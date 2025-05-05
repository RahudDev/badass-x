"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./GameSpinner.css");
var react_confetti_1 = require("react-confetti");
var lucide_react_1 = require("lucide-react");
var GameSpinner = function (_a) {
    var onSpinComplete = _a.onSpinComplete;
    var _b = react_1.useState(false), isSpinning = _b[0], setIsSpinning = _b[1];
    var _c = react_1.useState(0), rotationDegree = _c[0], setRotationDegree = _c[1];
    var _d = react_1.useState(''), prize = _d[0], setPrize = _d[1];
    var _e = react_1.useState(''), expectedPrize = _e[0], setExpectedPrize = _e[1];
    var _f = react_1.useState(false), showConfetti = _f[0], setShowConfetti = _f[1];
    var _g = react_1.useState(false), arrowBounce = _g[0], setArrowBounce = _g[1];
    var prizes = ['0', '5', '10', '30', '50', '1000'];
    react_1.useEffect(function () {
        var bounceInterval = setInterval(function () {
            setArrowBounce(function (prev) { return !prev; });
        }, 1000);
        return function () { return clearInterval(bounceInterval); };
    }, []);
    var spinWheel = function () {
        if (!isSpinning) {
            setIsSpinning(true);
            var newRotation_1 = rotationDegree + Math.floor(Math.random() * 5000) + 2000;
            setRotationDegree(newRotation_1);
            var prizeIndex = Math.floor((newRotation_1 % 360) / (360 / prizes.length));
            setExpectedPrize(prizes[prizeIndex]);
            setTimeout(function () {
                var finalPrizeIndex = Math.floor((newRotation_1 % 360) / (360 / prizes.length));
                var wonPrize = prizes[finalPrizeIndex];
                setPrize(wonPrize);
                setIsSpinning(false);
                if (wonPrize !== '0') {
                    setShowConfetti(true);
                    setTimeout(function () { return setShowConfetti(false); }, 5000);
                }
                if (onSpinComplete) {
                    onSpinComplete(wonPrize);
                }
            }, 3000);
        }
    };
    return (react_1["default"].createElement("div", { className: "spinner-container" },
        showConfetti && react_1["default"].createElement(react_confetti_1["default"], { width: window.innerWidth, height: window.innerHeight }),
        react_1["default"].createElement("div", { className: "pointer-indicator " + (arrowBounce ? 'bounce' : '') },
            react_1["default"].createElement(lucide_react_1.ArrowDown, { size: 48, color: "#FF6B6B", strokeWidth: 3 })),
        react_1["default"].createElement("div", { className: "expected-prize" },
            "Expected Prize: ",
            expectedPrize),
        react_1["default"].createElement("div", { className: "spinner", style: {
                transform: "rotate(" + rotationDegree + "deg)",
                transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
            } },
            react_1["default"].createElement("div", { className: "spinner-segments" }, prizes.map(function (prizeValue, index) { return (react_1["default"].createElement("div", { key: index, className: "segment segment-" + index }, prizeValue)); }))),
        react_1["default"].createElement("button", { className: "spin-button " + (isSpinning ? 'spinning' : ''), onClick: spinWheel, disabled: isSpinning }, isSpinning ? 'Spinning...' : 'Spin the Wheel'),
        prize && !isSpinning && (react_1["default"].createElement("div", { className: "prize-result animate-fade-in" },
            "You won: ",
            prize,
            " points!"))));
};
exports["default"] = GameSpinner;
