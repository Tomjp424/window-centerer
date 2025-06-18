import { windowManager } from 'node-window-manager';
import inquirer from 'inquirer';

async function main() {
    const windows = windowManager.getWindows().filter(window => window.isVisible() && window.getTitle());
    const windowList = windows.map((window, index) => ({
        name: `${window.getTitle()}`,
        value: window
    }));

   const { selectedWindow } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedWindow',
            message: 'Pick a window to center',
            choices: windowList
        }
    ])

    const screenBounds = windowManager.getPrimaryMonitor().getBounds();
    const screenWidth = screenBounds.width;
    const screenHeight = screenBounds.height;
    const windowBounds = selectedWindow.getBounds();
    const newX = Math.floor((screenWidth - windowBounds.width) / 2);
    const newY = Math.floor((screenHeight - windowBounds.height) / 2);

    selectedWindow.setBounds({
        x: newX,
        y: newY,
        width: windowBounds.width,
        height: windowBounds.height
    });

    console.log('Done')
};

main();