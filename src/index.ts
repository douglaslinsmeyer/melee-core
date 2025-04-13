import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING as string, {
    dialect: 'sqlite', // Choose your dialect here (e.g., 'mysql', 'postgres', 'sqlite', etc.)
    storage: './database.sqlite', // SQLite specific option
    logging: false, // Disable logging; default: console.log
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/api/bots/:id', (req: Request, res: Response) => {
    const botId = req.params.id;

    res.send(`Bot details for ID: ${botId}`);
});



async function startServer() {
    try {
        await sequelize.sync({ force: true }); // This will recreate tables on each start
        console.log('Database synced');

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();