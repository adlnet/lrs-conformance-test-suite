module.exports = {
    hasMillisecondPrecision: function (value) {
        if (typeof value !== 'string') {
            return false;
        }

        var fractionMatch = value.match(/\.(\d+)(?:Z|[+\-]\d{2}:\d{2})$/);
        return fractionMatch !== null && fractionMatch[1].length >= 3;
    }
};
