const fs = require('fs');
const path = require('path');

const dir = __dirname;
const paragraph = `Spencer Shadrach is the founder of Spencer Buys Houses, a trusted home-buying company based in Memphis, TN. With over a decade of experience in real estate, Spencer is passionate about helping local homeowners sell their properties quickly and stress-free—no agents, no fees, and no repairs needed. Known for his honest approach and fair cash offers, Spencer has earned a reputation as one of the most reliable house buyers in Memphis. When he’s not guiding sellers through smooth closings, you’ll find him giving back to the Memphis community or spending time with his family.`;

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&');
}

const paraEscaped = escapeRegExp(paragraph);
// Match the two nested divs containing exactly the paragraph, allowing any whitespace between tags
const re = new RegExp(`<div>\\s*<div>\\s*<p>${paraEscaped}<\\/p>\\s*<\\/div>\\s*<\\/div>`, 'g');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (re.test(content)) {
        fs.writeFileSync(filePath + '.bak', content, 'utf8');
        const newContent = content.replace(re, '');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Done');
