var expect = require('chai').expect;
var hasMillisecondPrecision = require('../v2_0/util/timestampPrecision').hasMillisecondPrecision;

describe('timestamp precision helper', function () {
    it('accepts millisecond values ending in zero', function () {
        expect(hasMillisecondPrecision('2025-01-17T00:52:14.590+00:00')).to.be.true;
        expect(hasMillisecondPrecision('2008-09-15T15:53:00.600Z')).to.be.true;
    });

    it('accepts fractional seconds longer than milliseconds', function () {
        expect(hasMillisecondPrecision('2025-01-17T00:52:14.5909+00:00')).to.be.true;
    });

    it('rejects timestamps without at least three decimal digits', function () {
        expect(hasMillisecondPrecision('2025-01-17T00:52:14.59+00:00')).to.be.false;
        expect(hasMillisecondPrecision('2025-01-17T00:52:14Z')).to.be.false;
    });
});
