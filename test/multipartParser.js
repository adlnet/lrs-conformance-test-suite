(function (module, S) {
    'use strict';

    var headerParts = [
            {
                field: 'contentType',
                fn: function (part) {
                    var s = S(part.toLowerCase());

                    var match;
                    if (s.startsWith('content-type:')) {
                        var type = part.substring('content-type:'.length).trim();
                        var regExp = new RegExp('\\w+\/[\\w.\\-\\+]+');
                        var matches = regExp.exec(type);
                        if (Array.isArray(matches)) {
                            match = matches[0];
                        }
                    }
                    return match;
                }
            },
            {
                field: 'boundary',
                fn: function (part) {

                    var s = S(part);
                    var match;
                    if (s.contains('boundary=')) {
                        var index = s.toString().indexOf('boundary=');
                        var indexSemicolon = s.toString().indexOf(';', index);
                        var endIndex = (indexSemicolon < 0 ? s.toString().length : indexSemicolon);
                        match = part.substring(index + 'boundary='.length, endIndex);
                        if (match.charAt(0) === '"') {
                            match = match.substring(1, match.length - 1);
                        }
                    }
                    return match;
                }
            },
            {
                field: 'contentTransferEncoding',
                fn: function (part) {
                    var s = S(part.toLowerCase());

                    var match;
                    if (s.startsWith('content-transfer-encoding:')) {
                        match = part.substring('content-transfer-encoding:'.length).trim();
                    }
                    return match;
                }
            },
            {
                field: 'contentDisposition',
                fn: function (part) {
                    var s = S(part.toLowerCase());

                    var match;
                    if (s.startsWith('content-disposition:')) {
                        var type = part.substring('content-disposition:'.length).trim();
                        var regExp = new RegExp('\\w+');
                        var matches = regExp.exec(type);
                        if (Array.isArray(matches)) {
                            match = matches[0];
                        }
                    }
                    return match;
                }
            },
            {
                field: 'filename',
                fn: function (part) {
                    var s = S(part.toLowerCase());

                    var match;
                    if (s.startsWith('content-disposition:') && s.contains('filename="')) {
                        var index = s.toString().indexOf('filename="');
                        var filename = part.substring(index + 'filename="'.length);

                        var regExp = new RegExp('[\\w\\W+\\w+][^"]+');
                        var matches = regExp.exec(filename);
                        if (Array.isArray(matches)) {
                            match = matches[0];
                        }
                    }
                    return match;
                }
            }
        ];

    function findDelimiter(content) {
        var delimiter;  // Delimiter for Windows, Linux, Mac
        if (S(content).startsWith('\r\n')) {
            delimiter = '\r\n';
        } else if (S(content).startsWith('\r')) {
            delimiter = '\r';
        } else if (S(content).startsWith('\n')) {
            delimiter = '\n';
        } else {
            throw new Error('Multipart: unknown delimiter.');
        }
        return delimiter;
    }

    function parsePart(delimiter, content) {
        var parsed = {};
        parsed.header = parseHeader(delimiter, content);

        var index = content.indexOf(delimiter + delimiter);
        parsed.body = content.substring(index + (delimiter.length * 2), content.length - delimiter.length);
        return parsed;
    }

    function parseHeader(delimiter, content) {
        var regExp = new RegExp(delimiter);
        var parts = content.split(regExp);

        var header = {parts: []};
        if (parts.length < 2) {
            throw new Error('Multipart: cannot parse header with invalid length.');
        } else if (!S(parts[0]).isEmpty()) {
            throw new Error('Multipart: cannot parse header with invalid value.');
        } else if (S(parts[0]).isEmpty() && S(parts[1]).isEmpty()) {
            header.parts.push('Content-Type: text/plain');
            header.contentType = 'text/plain';
            return header;
        }

        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            if (S(part).isEmpty()) {
                return header;
            } else {
                parseHeaderParts(header, part);
                header.parts.push(part);
            }
        }
        return header;
    }

    function parseHeaderParts(header, part) {
        headerParts.forEach(function (one) {
            var value = one.fn(part);
            if (value) {
                header[one.field] = value;
            }
        });
    }


    /**
     * Searches in string to find boundary.
     * @param {String} string - String to search
     * @return {String}
     */
    module.exports.getBoundary = function getBoundary(string) {
        var boundary = '';
        for (var i = 0; i < headerParts.length; i++) {
            var header = headerParts[i];

            if (header.field === 'boundary') {
                boundary = header.fn(string);
                break;
            }
        }
        return boundary;
    };

    /**
     * Parses multipart/mixed content (http://www.w3.org/Protocols/rfc1341/7_2_Multipart.html).  This does not parse streams.
     *
     * {
     *  header; {
     *      parts: ['each header line since not all are mapped'],
     *      contentType: 'extracted Content-Type',
     *      contentTransferEncoding: 'extracted Content-Transfer-Encoding',
     *      contentDisposition: 'extracted Content-Disposition',
     *      filename: 'extracted filename'
     *  }
     *  body: 'extracted body from part'
     * }
     *
     * @param {String} boundary - Boundary defined in header
     * @param {String} body - Request body
     */
    module.exports.parseMultipart = function parseMultipart(boundary, body) {
        var dashedBoundary = '--' + boundary;
        var index = body.indexOf(dashedBoundary);
        if (index < 0) {
            throw new Error('Multipart: boundary not found.');
        }

        var delimiter = findDelimiter(body.substring(index + dashedBoundary.length));

        var regExp = new RegExp('--*' + boundary);
        var contents = body.split(regExp);

        var parts = [];
        var lastBoundary = false;
        for (var i = 1; i < contents.length; i++) {
            var content = contents[i];

            if (S(content).startsWith('--' + delimiter) || S(content).startsWith('--')) {
                lastBoundary = true;
            }

            if (!lastBoundary) {
                parts.push(parsePart(delimiter, content));
            }
        }
        return parts;
    };
}(module, require('string')));
