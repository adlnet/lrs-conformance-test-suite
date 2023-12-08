/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements.
 */

const request = require('super-request');
const oldHelpers = equire('./../helper');

if(global.OAUTH)
    request = oldHelpers.OAuthRequest(request);

describe('Alternate Request Syntax Requirements (Communication 1.3)', function () {

    /**
     * Alternate request syntax was removed from the IEEE specification.
     * 
     * This area is a bit vague, but for now we are assuming that this is simply not allowed
     * and will expect that the LRS 
     */
    describe('The LRS does NOT allow Alternate Request Syntax in xAPI 2.0', function () {
        /**  XAPI-00148, Communication 2.1.2 POST Statements
         * An LRS accepts a valid POST request containing a GET request returning 200 OK and the StatementResult Object.
         */
        it('An LRS rejects POST requests containing method query parameters', function (done) {
            request(oldHelpers.getEndpointAndAuth())
            .post(oldHelpers.getEndpointStatements() + "?method=GET")
            .headers(oldHelpers.addAllHeaders({}))
            .form({limit: 1})
            .expect(400, done)/* .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    expect(results).to.have.property('more');
                    done();
                }
            }); */
        });

        it('An LRS rejects an alternate request syntax not issued as a POST', function () {
            var parameters = {method: 'POST'};
            var formBody = oldHelpers.buildFormBody(oldHelpers.buildStatement());
            return oldHelpers.sendRequest('put', oldHelpers.getEndpointStatements(), parameters, formBody, 400);
        });

        it('An LRS REJECTS an alternate request syntax PUT issued as a POST', function () {
            var parameters = {method: 'PUT'};
            var formBody = {
                statementId: oldHelpers.generateUUID(),
                content: oldHelpers.buildStatement()
            }
            return oldHelpers.sendRequest('post', oldHelpers.getEndpointStatements(), parameters, oldHelpers.getUrlEncoding(formBody), 400);
        });

        it('During an alternate request syntax the LRS treats the listed form parameters, \'Authorization\', \'X-Experience-API-Version\', \'Content-Type\', \'Content-Length\', \'If-Match\' and \'If-None-Match\', as header parameters (Communictation 1.3.s3.b7)', function () {
            var parameters = {method: 'PUT'};
            var sID = oldHelpers.generateUUID();
            var query = '?statementId=' + sID;
            var formBody = {
                statementId: sID,
                'X-Experience-API-Version': '0.8',
                content: oldHelpers.buildStatement()
            }
            var stmtTime = Date.now();
            return oldHelpers.sendRequest('post', oldHelpers.getEndpointStatements(), parameters, oldHelpers.getUrlEncoding(formBody), 400);
        });

        it('An LRS will reject an alternate request syntax which contains any extra information with error code 400 Bad Request (Communication 1.3.s3.b4)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = oldHelpers.createFromTemplate(templates);
            var statement = data.statement;
            var sID = oldHelpers.generateUUID();
            var parameters = {
                method: 'PUT',
                statementId: sID
            }
            var body = {
                statementId: sID,
                content: statement,
            }

            return oldHelpers.sendRequest('post', oldHelpers.getEndpointStatements(), parameters, oldHelpers.getUrlEncoding(body), 400);
        });

        describe('An LRS will reject an alternate request syntax sending content which does not have a form parameter with the name of "content" (Communication 1.3.s3.b4)', function () {
            it('will pass PUT with content body which is url encoded', function (done) {
                var headers = oldHelpers.addAllHeaders({});
                var auth = headers['Authorization'];
                var query = oldHelpers.getUrlEncoding({method: 'PUT'});

                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var data = oldHelpers.createFromTemplate(templates).statement;

                var form = {
                    statementId: oldHelpers.generateUUID(),
                    content: JSON.stringify(data),
                    'X-Experience-API-Version': '2.0.0',
                    Authorization: auth
                }

                request(oldHelpers.getEndpointAndAuth())
                .post(oldHelpers.getEndpointStatements() + '?' + query)
                .headers({'content-type': 'application/x-www-form-urlencoded'})
                .form(form)
                .expect(400, done);
            });

            it('will fail PUT with no content body', function () {
                var parameters = {method: 'PUT'};
                return oldHelpers.sendRequest('post', oldHelpers.getEndpointStatements(), parameters, undefined, 400);
            });

            it('will fail PUT with content body which is not url encoded', function (done) {
                var headers = oldHelpers.addAllHeaders({});
                var query = oldHelpers.getUrlEncoding({method: 'PUT'});
                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var data = oldHelpers.createFromTemplate(templates).statement;
                headers['content-type'] = 'application/x-www-form-urlencoded';

                var form = {
                    statementId: oldHelpers.generateUUID(),
                    content: JSON.stringify(data),
                    'X-Experience-API-Version': '2.0.0'
                }

                request(oldHelpers.getEndpointAndAuth())
                .post(oldHelpers.getEndpointStatements() + '?' + query)
                .headers(headers)
                .body(JSON.stringify(form))
                .expect(400, done);
            });
        });
    });

});