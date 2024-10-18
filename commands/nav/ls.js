import path from 'path';
import fs from 'fs/promises';

export const ls = async () => {
    const directoryPath = process.cwd();

    try {
        const directoryContent = await fs.readdir(directoryPath);
        let files = [];
        let folders = [];

        const statsPromises = directoryContent.map(async item => {
            const itemPath = path.join(directoryPath, item);
            const stats = await fs.stat(itemPath);
            stats.isDirectory() ? folders.push(item) : files.push(item);
        });

        await Promise.all(statsPromises);

        files.sort();
        folders.sort();

        console.log('Folders:');
        folders.forEach(folder => console.log(`Name: ${folder}, Type: Folder`));
        console.log('\nFiles:');
        files.forEach(file => console.log(`Name: ${file}, Type: File`));

    } catch (error) {
        console.error('An error occurred:', error);
    }
};
