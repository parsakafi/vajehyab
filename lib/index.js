const request = require('request');
const querystring = require('querystring');
const baseUrl = 'http://api.vajehyab.com/';
const Filter = 'dehkhoda,moein,amid,motaradef,farhangestan,sareh,ganjvajeh,wiki,slang,quran,name,thesis,isfahani,bakhtiari,tehrani,dezfuli,gonabadi,mazani,en2fa,ar2fa,fa2en,fa2ar';

class VajehYab {
    constructor(token, {ip, product, prettyprint, debug} = {}) {
        this.qs = {
            token: token,
            ip: ip || '',
            product: product || '',
            prettyprint: prettyprint || true,
            debug: debug || false
        };
    }

    search(q, {type, start, rows, filter} = {}) {
        let qs = {q: q, type: type || 'exact', start: start || 0, rows: rows || 10, filter: filter || Filter};
        return this.getRequest('search', qs);
    }

    word(title, db, num) {
        return this.getRequest('word', {title: title, db: db, num: num});
    }

    suggest(q) {
        return this.getRequest('suggest', {q: q});
    }

    getRequest(method, qs) {
        Object.assign(qs, this.qs);
        const URL = `${baseUrl}v3/${method}?` + querystring.stringify(qs);
        let options = {
            url: URL,
            hostname: 'api.vajehyab.com',
            port: '80',
            encoding: 'utf8',
            method: 'GET',
            headers: {
                'User-Agent': 'node ' + process.version
            }
        };
        return new Promise(function (resolve, reject) {
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            })
        });
    }
}

module.exports = VajehYab;