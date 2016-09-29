/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, helper, multipartParser, redirect, validator) {
    // "use strict";

    var genDelay = helper.genDelay;

    var comb = require('comb');
    var expect = chai.expect;

    if(global.OAUTH)
        request = helper.OAuthRequest(request);

    describe('A "more" property is an IRL (Format, 4.2.table1.row2.a)', function () {
        it('should return "more" property as an IRL', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json([statement, statement])
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?limit=1')
                .wait(genDelay(stmtTime, '?limit=1', undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more');
                        expect(validator.isURL(result.more, {
                            protocols: [],
                            require_tld: false,
                            require_protocol: false,
                            require_host: false,
                            require_valid_protocol: false,
                            allow_underscores: true,
                            host_whitelist: false,
                            host_blacklist: false,
                            allow_trailing_dot: false,
                            allow_protocol_relative_urls: true })).to.be.truthy;
                        done();
                    }
                });
        });
    });

    describe('The "more" property is an empty string if the entire results of the original GET request have been returned (4.2.table1.row2.b)', function () {
        it('should return empty "more" property when all statements returned', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent/344588672021038'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more').to.be.truthy;
                        expect(result.more).to.equal('')
                        done();
                    }
                });
        });
    });

    describe('If not empty, the "more" property\'s IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (4.2.table1.row1.b)', function () {
        it('should return "more" which refers to next page of results', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?limit=1')
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more');
                        expect(validator.isURL(result.more, {
                            protocols: [],
                            require_tld: false,
                            require_protocol: false,
                            require_host: false,
                            require_valid_protocol: false,
                            allow_underscores: true,
                            host_whitelist: false,
                            host_blacklist: false,
                            allow_trailing_dot: false,
                            allow_protocol_relative_urls: true })).to.be.truthy;
                        done();
                    }
                });
        });
    });

    describe('A "statements" property is an Array of Statements (Type, 4.2.table1.row1.a)', function () {
        var statement, substatement, stmtTime;
        this.timeout(0);

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.category}}'},
                {instructor: {
                    "objectType": "Agent",
                    "name": "xAPI mbox",
                    "mbox": "mailto:pri@adlnet.gov"
                }}
            ];
            var data = createFromTemplate(templates);
            statement = data.statement;
            statement.context.contextActivities.category.id = 'http://www.example.com/test/array/statements/pri';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(statement)
                .expect(200, done);
        });

        before('persist substatement', function (done) {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.category}}'},
                {instructor: {
                    "objectType": "Agent",
                    "name": "xAPI mbox",
                    "mbox": "mailto:sub@adlnet.gov"
                }}
            ];
            var data = createFromTemplate(templates);
            substatement = data.statement;
            substatement.object.context.contextActivities.category.id = 'http://www.example.com/test/array/statements/sub';
            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(substatement)
                .expect(200, done);
        });

        it('should return StatementResult with statements as array using GET without "statementId" or "voidedStatementId"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements())
                .wait(genDelay(stmtTime, undefined, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: statement.verb.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: statement.object.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: statement.context.registration});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "related_activities"', function (done) {
            var query = helper.getUrlEncoding({
                activity: statement.context.contextActivities.category.id,
                related_activities: true
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "related_agents"', function (done) {
            var query = helper.getUrlEncoding({
                agent: statement.context.instructor,
                related_agents: true
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "attachments"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});
            var query = helper.getUrlEncoding({attachments: true});
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var boundary = multipartParser.getBoundary(res.headers['content-type']);
                        expect(boundary).to.be.ok;
                        var parsed = multipartParser.parseMultipart(boundary, res.body);
                        expect(parsed).to.be.ok;
                        var results = parse(parsed[0].body, done);
                        expect(results).to.have.property('statements');
                        done();
                    }
                });
        });
    });

    describe('Miscellaneous Requirements', function () {

        it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {

          this.timeout(0);
          var verbTemplate = 'http://adlnet.gov/expapi/test/more/target/';
          var id1 = helper.generateUUID();
          var id2 = helper.generateUUID();
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement1 = createFromTemplate(statementTemplates);
          statement1 = statement1.statement;
          statement1.verb.id = verbTemplate + "one";
          statement1.id = id1;

          var statement2 = createFromTemplate(statementTemplates);
          statement2 = statement2.statement;
          statement2.verb.id = verbTemplate + "two";
          statement2.id = id2;
          var query = helper.getUrlEncoding(
            {limit:1}
          );
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json([statement1, statement2])
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, null))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                      request('')
                          .get(liburl.resolve(res.request.href, results.more))
                          .headers(helper.addAllHeaders({}))
                          .expect(200)
                          .end(function (err, res) {
                              if (err) {
                                  done(err);
                              }
                              else {
                                  var results2 = parse(res.body, done);
                                  expect(results2.statements && results2.more).to.exist;
                                  done();
                              }
                          });
                  }
              });
        });

        it('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (7.2.4.b)', function (done){
          //tests most of the filtering criteria, can add additional tests for missing criteria if necessary
          var statementTemplates = [
              {statement: '{{statements.default}}'},
              {context: '{{contexts.default}}'}
          ];
          var id = helper.generateUUID();
          var statement = createFromTemplate(statementTemplates);
          statement = statement.statement;
          statement.id = id;

          var data = {
              limit: 1,
              agent: statement.actor,
              verb: statement.verb.id,
              activity: statement.object.id,
              registration: statement.context.registration,
              related_activities: true,
              since: '2012-06-01T19:09:13.245Z',
              format: 'ids',
              attachments: false
          };

          var query = helper.getUrlEncoding(data);
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(statement)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, null))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                      expect(results.statements[0].id).to.equal(id);
                      done();
                  }
              });
        });

        it('A "statements" property which is too large for a single page will create a container for each additional page (4.2.table1.row1.b)', function (done){
            this.timeout(0);
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement1 = createFromTemplate(statementTemplates);
          statement1 = statement1.statement;

          var statement2 = createFromTemplate(statementTemplates);
          statement2 = statement2.statement;

          var query = helper.getUrlEncoding(
            {limit:1}
          );
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json([statement1, statement2])
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, null))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                      expect(results.statements).to.exist;
                      expect(results.more).to.exist;
                      done();
                  }
              });
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

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('validator')));
