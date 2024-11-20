const fs = require('fs'),
    convert = require('xml-js'),
    fetch = require('node-fetch'),
    moment = require('moment'),
    baseURL = 'https://www.flexospaces.com',
    getListURL = `http://localhost:3009/api/v1/getsitemap`,
    untrackedUrlsList = [],
    options = { compact: true, ignoreComment: true, spaces: 4 };

const fetchList = () => {
    fetch(getListURL)
        .then(res => res.json())
        .then(dataJSON => {
            if (dataJSON) {
                dataJSON.forEach(element => {
                    const modifiedURL = element.replace(/ /g,"-").toLowerCase();
                    untrackedUrlsList.push(`${baseURL}/${modifiedURL}`);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const filterUniqueURLs = () => {
    fs.readFile('src/demo.sitemap.xml', (err, data) => {
        if (data) {
            const existingSitemapList = JSON.parse(convert.xml2json(data, options));
            let existingSitemapURLStringList = [];
            if (existingSitemapList.urlset && existingSitemapList.urlset.url && existingSitemapList.urlset.url.length) {
                existingSitemapURLStringList = existingSitemapList.urlset.url.map(ele => ele.loc._text);
            }

            untrackedUrlsList.forEach(ele => {
                if (existingSitemapURLStringList.indexOf(ele) == -1) {
                    existingSitemapList.urlset.url.push({
                        loc: {
                            _text: ele,
                        },
                        priority: {
                            _text: 0.8
                        },
                        lastmod: {
                            _text: moment(new Date()).format('YYYY-MM-DD')
                        }
                    });
                }
            });
            createSitemapFile(existingSitemapList);
        }
    });
}

const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options); 
    saveNewSitemap(finalXML);
}

const saveNewSitemap = (xmltext) => {
    fs.writeFile('src/sitemap.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("Sitemap updated!");
    });
}

fetchList();
