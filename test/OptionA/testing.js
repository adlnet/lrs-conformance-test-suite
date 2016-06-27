/* Testing if I can make a quick set of dummy tests to explore the possibility o fadding test profiles.  This is copied and pasted from the non_templating file. */

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

    describe('Welcome to Option A.  An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c)', function () {
        it('should populate authority', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement).to.have.property('authority');
                        done();
                    }
                });
        });
    });

    // describe('A Voiding Statement cannot Target another Voiding Statement (4.3)', function () {
    //     var voidedId;
    //
    //     before('persist voided statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.default}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(200).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     voidedId = res.body[0];
    //                     done();
    //                 }
    //             });
    //     });
    //
    //     before('persist voiding statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.object_statementref}}'},
    //             {verb: '{{verbs.voided}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         data.object.id = voidedId;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(200).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     done();
    //                 }
    //             });
    //     });
    //
    //     it('should fail when "StatementRef" points to a voiding statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.object_statementref}}'},
    //             {verb: '{{verbs.voided}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         data.object.id = voidedId;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(400).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     done();
    //                 }
    //             });
    //     });
    // });

    // describe('An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)', function () {
    //     var types = ['parent', 'grouping', 'category', 'other'];
    //
    //     types.forEach(function (type) {
    //         it('should return array for statement context "' + type + '"  when single ContextActivity is passed', function (done) {
    //             var templates = [
    //                 {statement: '{{statements.context}}'},
    //                 {context: '{{contexts.' + type + '}}'}
    //             ];
    //             var data = createFromTemplate(templates);
    //             data = data.statement;
    //             data.id = helper.generateUUID();
    //
    //             request(helper.getEndpoint())
    //                 .post(helper.getEndpointStatements())
    //                 .headers(helper.addAllHeaders({}))
    //                 .json(data)
    //                 .expect(200)
    //                 .end()
    //                 .get(helper.getEndpointStatements() + '?statementId=' + data.id)
    //                 .headers(helper.addAllHeaders({}))
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) {
    //                         done(err);
    //                     } else {
    //                         var statement = parse(res.body, done);
    //                         expect(statement).to.have.property('context').to.have.property('contextActivities');
    //                         expect(statement.context.contextActivities).to.have.property(type);
    //                         expect(statement.context.contextActivities[type]).to.be.an('array');
    //                         done();
    //                     }
    //                 });
    //         });
    //     });
    //
    //     types.forEach(function (type) {
    //         it('should return array for statement substatement context "' + type + '"  when single ContextActivity is passed', function (done) {
    //             var templates = [
    //                 {statement: '{{statements.object_substatement}}'},
    //                 {object: '{{substatements.context}}'},
    //                 {context: '{{contexts.' + type + '}}'}
    //             ];
    //             var data = createFromTemplate(templates);
    //             data = data.statement;
    //             data.id = helper.generateUUID();
    //
    //             request(helper.getEndpoint())
    //                 .post(helper.getEndpointStatements())
    //                 .headers(helper.addAllHeaders({}))
    //                 .json(data)
    //                 .expect(200)
    //                 .end()
    //                 .get(helper.getEndpointStatements() + '?statementId=' + data.id)
    //                 .headers(helper.addAllHeaders({}))
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) {
    //                         done(err);
    //                     } else {
    //                         var statement = parse(res.body, done);
    //                         expect(statement).to.have.property('object').to.have.property('context').to.have.property('contextActivities');
    //                         expect(statement.object.context.contextActivities).to.have.property(type);
    //                         expect(statement.object.context.contextActivities[type]).to.be.an('array');
    //                         done();
    //                     }
    //                 });
    //         });
    //     });
    // });

    describe('Will these three tests now show up??', function () {

        it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, 4.2.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
            // Using requirement: An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**
            done();
        });
    });


    function createFromTemplate(templates) {
        // convert template mapping to JSON objects
        var converted = helper.convertTemplate(templates);
        // this handles if no override
        var mockObject = helper.createTestObject(converted);
        return mockObject;
    }

    function parse(string, done) {
        var parsed;
        try {
            parsed = JSON.parse(string);
        } catch (error) {
            done(error);
        }
        return parsed;
    }

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
