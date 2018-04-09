# VajehYab 
VajehYab API client written in JS

## Install
```shell
npm install vajehyab --save
```
Usage   
You can get VajehYab API token from [Developer Page](http://api.vajehyab.com/i/developer) ([API Document](http://api.vajehyab.com/api/documentation))
```shell
const VajehYab = require('vajehyab');
const vajehyabToken = process.env.vajehyabToken; // VajehYab API Token
const client = new VajehYab(vajehyabToken, {ip, product, prettyprint, debug});
```
- `params`
  - `token`: VajehYab API token
  - `ip`: The User IP. Default is ` `, (Optional)
  - `product`: The product name. Default is ` `, (Optional)
  - `prettyprint`: The response pretty printed. Default is `true`, (Optional)
  - `debug`: The debug mode. Default is `false`, (Optional)
  
Example
```shell
const VajehYab = require('vajehyab');
const vajehyabToken = process.env.vajehyabToken; // VajehYab API Token
const client = new VajehYab(vajehyabToken, {ip:'222.2.65.3', product: 'Test', prettyprint: true, debug: false});
```

All method using `async`/`await` in Node >= 8

### Search   

This method is used to search for a term or phrase. The meaning of the word is limited and insert "..." at the end.   
```shell
(async () => {
    try {
        const search = await client.search(q, {type, start, rows, filter});
        console.log(search);
    } catch (e) {
        console.log(e);
    }
})();
```
- `params`
  - `q`: The search word
  - `type`: The search type, You can set 'exact','ava','like','text'. Default is `exact`, (Optional)
  - `start`: The start row. Default is `0`, (Optional)
  - `rows`: The response rows. Default is `10`, (Optional)
  - `filter`: The Database names with priority. Default is `dehkhoda,moein,amid,motaradef,farhangestan,sareh,ganjvajeh,wiki,slang,quran,name,thesis,isfahani,bakhtiari,tehrani,dezfuli,gonabadi,mazani,en2fa,ar2fa,fa2en,fa2ar`, (Optional)
  
Example
```shell
(async () => {
    try {
        const search = await client.search('رایانه');
        console.log(search);
    } catch (e) {
        console.log(e);
    }
})();
```
```shell
const search = await client.search('رایانه', {type: 'like', start: 0, rows: 10, filter: 'dehkhoda,moein,amid'});
console.log(search);
```
### Word Detail:

This method is used to get the full meaning of a word. It is possible with HTML tags.
```shell
const word = await client.word(title, db, num);
```
- `params`
  - `title`: The word from search method response
  - `db`: The Database name form search method response
  - `num`: The `num` parameter form search method response
  
Example
```shell
const word = await client.word('ایران', 'dehkhoda', 1);
console.log(word);
```

### Suggest Word:
The proposed list is used for autocomplete.
```shell
const suggest = await client.suggest(q);
```
- `params`
  - `q`: The search word
  
Example
```shell
const suggest = await client.suggest('ایران');
console.log(suggest);
```

### Express Example
```shell
const VajehYab = require('vajehyab');
const vajehyabToken = process.env.vajehyabToken; // VajehYab API Token
const client = new VajehYab(vajehyabToken, {ip:'222.2.65.3', product: 'Test', prettyprint: true, debug: false});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    (async () => {
        try {
            const search = await client.search('رایانه');
            res.send(search);
        } catch (e) {
            res.send(e);
        }
    })();
}).listen(3000);
```