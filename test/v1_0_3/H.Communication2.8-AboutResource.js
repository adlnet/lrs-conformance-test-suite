/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('About Resource Requirements (Communication 2.8)', () => {

    it('An LRS has an About API with endpoint "base IRI"+"/about" (Communication 2.8)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200);
    });

    it('An LRS\'s About API accepts GET requests (Communication 2.8)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200);
    });

    it('An LRS\'s About API upon processing a successful GET request returns a version property and code 200 OK (multiplicity, Communication 2.8.s4)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version');
            });
    });

    it('An LRS\'s About API\'s version property is an array of strings (format, Communication 2.8.s4.table1.row1)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');
            });
    });

    //moving this over for now, string value will need updated
    it('An LRS\'s About API\'s version property contains at least one string of "1.0.1" (Communication 2.8.s5.b1.b1)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');

                var foundVersion = false
                about.version.forEach(function (item) {
                    if (item === '1.0.1') {
                        foundVersion = true;
                    }
                })
                expect(foundVersion).to.be.true;
            });
    });

    it('An LRS\'s About API\'s version property can only have values of "0.9", "0.95", "1.0.0", or ""1.0." + X" with (Communication 2.8.s5.b1.b1)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');
                var validVersions = ['0.9', '0.95', '1.0.0', '1.0.1', '1.0.2', '1.0.3'];
                about.version.forEach(function (item) {
                    expect(validVersions).to.include(item);
                })
            });
    });

// This is a bad test.  Extensions property is option in the spec.
//     it('An LRS\'s About API upon processing a successful GET request can return an Extension with code 200 OK (multiplicity, Communication 2.8.s4.table1.row2)', function () {
//         return helper.sendRequest('get', helper.getEndpointAbout(), undefined, undefined, 200)
//             .then(function (res) {
//                 var about = res.body;
//                 expect(about).to.have.property('extensions');
//             });
//     });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
