// ==UserScript==
// @name         Google Search Site Filter
// @namespace    https://github.com/huixuphys
// @version      0.1
// @description  Filter google search results by sites
// @author       huixuphys
// @match        https://www.google.com/search?q=*
// @grant        none
// ==/UserScript==

let sites = {
    'StackExchange': 'stackoverflow.com OR site:stackexchange.com OR site:superuser.com',
    'Wikipedia': 'wikipedia.org',
    'HackerNews': 'ycombinator.com',
    'Reddit': 'reddit.com',
    'Youtube': 'youtube.com',
    'GitHub': 'github.com',
    'ArchWiki': 'wiki.archlinux.org',
    'V2EX': 'v2ex.com',
    'MSD': 'msdmanuals.com'
};

function search(site) {
    clear();
    let queryOrig = document.getElementsByName("q")[0].value;
    let queryNow = queryOrig + " site:" + site;
    document.getElementsByName("q")[0].value = queryNow;
    document.querySelector('button[aria-label="Search"]').click();
}

function clear() {
    let queryOrig = document.getElementsByName("q")[0].value;
    let queryNow = queryOrig.replace(/ OR site:[^ ]*/g, '').replace(/ site:[^ ]*/g, '');
    document.getElementsByName("q")[0].value = queryNow;
}

let btn_clear = document.createElement('button');
btn_clear.id = 'clear';
btn_clear.innerHTML = 'Clear';
btn_clear.style.cssText = 'background-color: #d35856; height: 25px; font-size: 12px;'

let container = document.createElement('div');
container.innerHTML = `
    <div style="display: flex; align-items: center; gap: 20px;">
    <span style="margin-left: 5px; font-size: 20px;">Filter By Site</span>
` 
    + btn_clear.outerHTML 
    + '</div>'
    + '<hr style="margin: 5px 0 8px 0;">';
let mainNode = document.querySelector('#rhs');
if (mainNode == null) {
    container.style['max-width'] = 'calc(100% - 15px - var(--center-width) - var(--center-abs-margin))';
    container.style['margin-left'] = '15px';
    mainNode = document.querySelector('#rcnt');
    mainNode.appendChild(container);
} else {
    mainNode.prepend(container);
}

for (const site in sites) {
    let btn = document.createElement('button');
    btn.style.cssText = 'margin: 0 0 5px 5px; font-size: 12px;'
    btn.innerHTML = site;
    container.appendChild(btn);
    btn.addEventListener('click', () => search(sites[site]));
}

let hr = document.createElement('hr');
hr.style.margin = '5px 0';
container.appendChild(hr);

document.querySelector('button#clear').addEventListener("click", () => {
    clear();
    document.querySelector('button[aria-label="Search"]').click();
});
