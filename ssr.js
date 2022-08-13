import fs from "fs";

const ssr = {
    directory: '',

    loadFile: function(file) {
        // ./public/ - Hvis app.js rykkes ind i Server mappen igen
        return fs.readFileSync(this.directory + file).toString();
    },

    replace: function(page, replacements) {
        for(let i in replacements){
            let replacement = replacements[i];
            if(replacement){
                if(replacement[0] === '/'){
                    replacement = this.loadFile(replacement);
                }
                page = page.replace('%%' + i.toUpperCase() + '%%', replacement);
            } else {
                page = page.replace('%%' + i.toUpperCase() + '%%', "");
            }
        }
        return page;
    }
};

ssr.directory = './Client/Public/Components';
const navbar = ssr.loadFile("/navbar.html")
const footer = ssr.loadFile("/footer.html")


ssr.directory = './Client/Public/Pages';
const template_page_template = ssr.loadFile('/template_page.html')
const template_page = ssr.replace(template_page_template, { navbar, footer })



const home_page = ssr.replace(template_page, {
    title: 'ACHJ.com',
    styles: '',
    content: '/index.html'
});


const cv_page = ssr.replace(template_page, {
    title: "Alex' CV",
    styles: '',
    content: '/cv_page.html'
});


const about_page = ssr.replace(template_page, {
    title: 'Who is Alex?',
    styles: '',
    content: '/about_page.html'
});

const contact_page = ssr.replace(template_page, {
    title: 'Contact me today!',
    styles: '',
    content: '/contact_page.html'
});


export default {
    home_page,
    cv_page,
    about_page,
    contact_page
}

