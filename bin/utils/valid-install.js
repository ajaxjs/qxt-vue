import path from 'path';

export default async function () {
    let components = null;
    const cwd = process.cwd();
    try {
        const filePath = new URL('file:///' + path.resolve(cwd, 'components.json').replace(/\\/g, '/'));
        components = (await import(filePath, { with: { type: 'json' } }))?.default;
        // 替换为绝对路径
        Object.keys(components.aliases).forEach(key => {
            components.aliases[key] = path.resolve(components.aliases[key].replace(/^@/, cwd+'/src/'));
        })
    } catch (error) {
        console.error('请先安装shadcn-vue: https://www.shadcn-vue.com/docs/installation/vite.html');
        error.code = 'MISSING_SHADCN_VUE'
        throw error;
    }
    return { shadcnConfig: components };
}