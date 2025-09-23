import path from 'path';
export default async function importComponent(filename, options = {}) {
    const ext = path.extname(filename);
    if (ext === '.json') {
        options.with = { type: 'json' };
    }
    const url = new URL('file:///' + path.resolve(filename).replace(/\\/g, '/'));
    const res = await import(url.href, options);
    if (ext === '.json') {
        return res.default;
    }
    return res;
}