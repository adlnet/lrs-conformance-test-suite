module.exports = function(genDelay,comb,expect,module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect)
{

	describe('An LRSs Statement API not return attachment data and only return application/json if the "attachment" parameter set to "false" a123123123 (Type, 4.2.table1.row1.a)', function () {
		
		var statementId = null;
		var stmtTime = null;
		before("store statement",function(done){
			var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});
            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(200,function(err,res)
                {
                	if(err)
                		done(err)
                	else
                	{
                		var body = JSON.parse(res.body);

                		statementId = body[0];
                		console.log("Statement ID is", statementId)
                		done();
                	}
                });
		})	        
        it('should NOT return the attachment if "attachments" is false', function (done) {
        	
        	var query = '?statementId=' + statementId + "&attachments=false";
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {

            
                	expect(res.headers["content-type"]).to.equal('application/json');
                	done();
                }
            });
    	});
    	it('should NOT return the attachment if "attachments" is missing', function (done) {
        	
        	var query = '?statementId=' + statementId;
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {

                	
                	expect(res.headers["content-type"]).to.equal('application/json');
                	done();
                }
            });
    	});
    	it('should return the attachment when "attachment" is true', function (done) {
        	
        	var query = '?statementId=' + statementId + "&attachments=true";
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {

                	
                	//how delicate is this parsing? There is a newline as body[1], the statement as body[0]. Should we search all
                	//parts of the body? 
                	var ContentType = res.headers["content-type"];
                	var type = ContentType.split(";")[0];
                	expect(type).to.equal("multipart/mixed");
                	var boundary = ContentType.split(";")[1].replace(" boundary=","");

                	var body = res.body.split("--"+boundary);
                	expect(body[2].indexOf("here is a simple attachment")).to.not.eql(-1);
                	done();
                }
            });


    	});

	});
}